import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to evaluate code using Gemini
export async function evaluateCode(code, language, question) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const prompt = `
    You are an expert coding interview evaluator. Please evaluate the following code solution:
    
    Question: ${question.title}
    ${question.description}
    
    Language: ${language}
    
    Code:
    \`\`\`${language}
    ${code}
    \`\`\`
    
    Please provide a detailed evaluation covering:
    1. Time complexity (Big O notation)
    2. Space complexity (Big O notation)
    3. Code correctness
    4. Code efficiency (score out of 100)
    5. Code quality and readability (score out of 100)
    6. Overall score (out of 100)
    7. Specific improvements that could be made
    8. General feedback
    
    Format your response as JSON with the following structure:
    {
      "timecomplexity": "O(...)",
      "spacecomplexity": "O(...)",
      "correctness": 85,
      "efficiency": 80,
      "codeQuality": 75,
      "overallScore": 80,
      "improvements": ["improvement 1", "improvement 2"],
      "feedback": "Detailed feedback here"
    }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        throw new Error("Failed to parse AI evaluation");
    } catch (error) {
        console.error("AI evaluation error:", error);
        return {
            timecomplexity: "Unknown",
            spacecomplexity: "Unknown",
            correctness: 0,
            efficiency: 0,
            codeQuality: 0,
            overallScore: 0,
            improvements: ["Unable to evaluate due to an error"],
            feedback: "An error occurred during evaluation: " + error.message
        };
    }
}

// Utility to run code against test cases
export async function runCodeAgainstTestCases(code, language, testCases) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const testCasesStr = testCases.map((tc, idx) =>
            `Test Case ${idx + 1}:\nInput: ${tc.input}\nExpected Output: ${tc.output}`
        ).join('\n\n');

        const prompt = `
    You are an expert code executor. Please execute the following ${language} code against the provided test cases:
    
    Code:
    \`\`\`${language}
    ${code}
    \`\`\`
    
    Test Cases:
    ${testCasesStr}
    
    For each test case, determine if the code produces the expected output.
    Format your response as JSON with the following structure:
    {
      "results": [
        {
          "testCaseId": 1,
          "passed": true/false,
          "input": "test input",
          "expectedOutput": "expected output",
          "actualOutput": "actual output",
          "executionTime": 10 (in milliseconds)
        },
        ...
      ],
      "successRate": 75 (percentage),
      "error": null (or error message if execution failed)
    }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        throw new Error("Failed to parse test execution results");
    } catch (error) {
        console.error("Code execution error:", error);
        return {
            results: [],
            successRate: 0,
            error: error.message
        };
    }
}

// Helper function to get AI-generated hints for a problem
export async function getHints(question, language) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const prompt = `
    You are an expert coding mentor. I'm working on the following coding problem:
    
    ${question.title}
    ${question.description}
    
    I want to solve this in ${language}.
    
    Please provide 3 helpful hints that will guide me towards the solution without giving away the complete answer.
    Format your response as JSON with the following structure:
    {
      "hints": [
        "First hint here",
        "Second hint here",
        "Third hint here"
      ]
    }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]).hints;
        }

        throw new Error("Failed to parse hints");
    } catch (error) {
        console.error("Hints generation error:", error);
        return ["Unable to generate hints at the moment."];
    }
}