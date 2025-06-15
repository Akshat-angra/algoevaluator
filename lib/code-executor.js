// lib/code-executor.js
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

/**
 * Executes code in a sandboxed environment
 * 
 * @param {string} code - Source code to execute
 * @param {string} language - Programming language
 * @returns {Promise<object>} - Execution result
 */
export async function executeCode(code, language) {
    // Create a unique ID for this execution
    const executionId = uuidv4();
    const startTime = Date.now();

    // Create temporary directory for execution
    const tempDir = path.join(os.tmpdir(), 'ai-compiler', executionId);
    await fs.mkdir(tempDir, { recursive: true });

    try {
        // Prepare execution based on language
        const { filePath, command } = await prepareExecution(code, language, tempDir);

        // Execute the code
        const result = await runCommand(command, tempDir);

        // Calculate execution time
        const executionTime = Date.now() - startTime;

        return {
            output: result.stdout,
            error: result.stderr,
            executionTime,
            memoryUsage: result.memoryUsage || null,
        };
    } catch (error) {
        return {
            output: '',
            error: `Execution error: ${error.message}`,
            executionTime: Date.now() - startTime,
            memoryUsage: null,
        };
    } finally {
        // Clean up temp files (in a real production system)
        try {
            await fs.rm(tempDir, { recursive: true, force: true });
        } catch (cleanupError) {
            console.error('Error cleaning up temp files:', cleanupError);
        }
    }
}

/**
 * Prepares the execution environment for a specific language
 */
async function prepareExecution(code, language, tempDir) {
    let filePath;
    let command;

    switch (language.toLowerCase()) {
        case 'javascript':
            filePath = path.join(tempDir, 'script.js');
            await fs.writeFile(filePath, code);
            command = `node ${filePath}`;
            break;

        case 'python':
            filePath = path.join(tempDir, 'script.py');
            await fs.writeFile(filePath, code);
            command = `python ${filePath}`;
            break;

        case 'java':
            // For Java, we need to extract the class name
            const className = extractJavaClassName(code) || 'Main';
            filePath = path.join(tempDir, `${className}.java`);
            await fs.writeFile(filePath, code);
            command = `cd ${tempDir} && javac ${className}.java && java ${className}`;
            break;

        case 'cpp':
            filePath = path.join(tempDir, 'program.cpp');
            const outputPath = path.join(tempDir, 'program');
            await fs.writeFile(filePath, code);
            command = `g++ ${filePath} -o ${outputPath} && ${outputPath}`;
            break;

        case 'ruby':
            filePath = path.join(tempDir, 'script.rb');
            await fs.writeFile(filePath, code);
            command = `ruby ${filePath}`;
            break;

        case 'go':
            filePath = path.join(tempDir, 'program.go');
            await fs.writeFile(filePath, code);
            command = `cd ${tempDir} && go run program.go`;
            break;

        default:
            throw new Error(`Unsupported language: ${language}`);
    }

    return { filePath, command };
}

/**
 * Extracts class name from Java code
 */
function extractJavaClassName(code) {
    const classMatch = code.match(/public\s+class\s+(\w+)/);
    return classMatch ? classMatch[1] : null;
}

/**
 * Runs a shell command with timeout and resource limits
 */
function runCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        // Set a timeout to prevent infinite loops or long-running code
        const timeout = 10000; // 10 seconds

        exec(command, {
            cwd,
            timeout,
            // Set resource limits (not fully supported in all environments)
            maxBuffer: 1024 * 1024, // 1MB output limit
        }, (error, stdout, stderr) => {
            if (error && error.killed) {
                // Process was killed due to timeout
                resolve({
                    stdout: '',
                    stderr: 'Execution timed out (limit: 10 seconds)',
                    memoryUsage: null
                });
            } else {
                // Normal execution result
                resolve({
                    stdout: stdout.toString(),
                    stderr: error ? stderr.toString() : '',
                    memoryUsage: null // In a real system, you'd capture actual memory usage
                });
            }
        });
    });
}