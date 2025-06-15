// // // lib/ai-service.js
// // import { Configuration, OpenAIApi } from 'openai';

// // // Initialize OpenAI client (you would use your own API key in a real app)
// // const configuration = new Configuration({
// //     apiKey: process.env.OPENAI_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);

// // /**
// //  * Analyzes code using AI to provide suggestions and improvements
// //  * 
// //  * @param {string} code - The source code to analyze
// //  * @param {string} language - The programming language
// //  * @param {object} executionResult - Results from code execution
// //  * @returns {Promise<object>} - AI analysis results
// //  */
// // export async function runAICodeAnalysis(code, language, executionResult) {
// //     try {
// //         // Skip AI analysis if OpenAI API key is not configured
// //         if (!process.env.OPENAI_API_KEY) {
// //             console.warn('OpenAI API key not configured. Skipping AI analysis.');
// //             return { suggestions: [] };
// //         }

// //         // Determine if there was an error in execution
// //         const hasError = !!executionResult.error;

// //         // Create prompt based on code and execution results
// //         let prompt = `Analyze this ${language} code:\n\n${code}\n\n`;

// //         if (hasError) {
// //             prompt += `The code produced this error: ${executionResult.error}\n`;
// //             prompt += "Please suggest fixes and improvements to resolve the error.\n";
// //         } else {
// //             prompt += "The code executed successfully.\n";
// //             prompt += "Please suggest improvements for code quality, performance, and best practices.\n";
// //         }

// //         // Make API call to OpenAI
// //         const response = await openai.createCompletion({
// //             model: "gpt-3.5-turbo-instruct", // Use appropriate model
// //             prompt: prompt,
// //             max_tokens: 500,
// //             temperature: 0.7,
// //         });

// //         // Process the AI response
// //         const aiResponse = response.data.choices[0].text.trim();

// //         // Parse AI suggestions into a structured format
// //         const suggestions = parseAISuggestions(aiResponse, hasError);

// //         return { suggestions };
// //     } catch (error) {
// //         console.error('AI analysis error:', error);
// //         return { suggestions: [] };
// //     }
// // }

// // /**
// //  * Parses the AI response into structured suggestions
// //  */
// // function parseAISuggestions(aiResponse, hasError) {
// //     // This is a simplified parser. In a real app, you might want to use a more sophisticated approach
// //     // or have the AI return structured data directly.

// //     // Split the response into sections based on newlines
// //     const sections = aiResponse.split('\n\n').filter(Boolean);

// //     // Create structured suggestions
// //     const suggestions = [];

// //     if (hasError) {
// //         // Add error fix suggestion
// //         suggestions.push({
// //             title: "Fix Error",
// //             description: sections[0] || "Suggestion to fix the error in your code.",
// //             type: "error",
// //             code: extractCodeSuggestion(aiResponse),
// //         });
// //     }

// //     // Add improvements
// //     if (sections.length > 1) {
// //         suggestions.push({
// //             title: "Code Improvement",
// //             description: "Suggested improvements for better code quality.",
// //             type: "improvement",
// //             code: extractCodeSuggestion(aiResponse, 1),
// //         });
// //     }

// //     // Add optimization if available
// //     if (sections.length > 2) {
// //         suggestions.push({
// //             title: "Optimization",
// //             description: "Suggestion to optimize performance.",
// //             type: "optimization",
// //             code: extractCodeSuggestion(aiResponse, 2),
// //         });
// //     }

// //     return suggestions;
// // }

// // /**
// //  * Extracts code snippets from AI response
// //  */
// // function extractCodeSuggestion(aiResponse, sectionIndex = 0) {
// //     // Try to find code blocks (between ``` markers)
// //     const codeBlockRegex = /```(?:\w+)?\n([\s\S]+?)\n```/g;
// //     const matches = [...aiResponse.matchAll(codeBlockRegex)];

// //     if (matches.length > sectionIndex) {
// //         return matches[sectionIndex][1];
// //     }

// //     // If no code block found, return null
// //     return null;
// // }


// // lib/ai-service.js
// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Initialize Google Generative AI client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * Analyzes code using Gemini AI to provide suggestions and improvements
//  * 
//  * @param {string} code - The source code to analyze
//  * @param {string} language - The programming language
//  * @param {object} executionResult - Results from code execution
//  * @returns {Promise<object>} - AI analysis results
//  */
// export async function runAICodeAnalysis(code, language, executionResult) {
//     try {
//         // Skip AI analysis if Gemini API key is not configured
//         if (!process.env.GEMINI_API_KEY) {
//             console.warn('Google Gemini API key not configured. Skipping AI analysis.');
//             return { suggestions: [] };
//         }

//         // Determine if there was an error in execution
//         const hasError = !!executionResult.error;

//         // Create prompt based on code and execution results
//         let prompt = `Analyze this ${language} code:\n\n${code}\n\n`;

//         if (hasError) {
//             prompt += `The code produced this error: ${executionResult.error}\n`;
//             prompt += "Please suggest fixes and improvements to resolve the error.\n";
//         } else {
//             prompt += "The code executed successfully.\n";
//             prompt += "Please suggest improvements for code quality, performance, and best practices.\n";
//         }

//         // Get the Gemini Pro model
//         const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

//         // Make API call to Gemini
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const aiResponse = response.text();

//         // Parse AI suggestions into a structured format
//         const suggestions = parseAISuggestions(aiResponse, hasError);

//         return { suggestions };
//     } catch (error) {
//         console.error('AI analysis error:', error);
//         return { suggestions: [] };
//     }
// }

// /**
//  * Parses the AI response into structured suggestions
//  */
// function parseAISuggestions(aiResponse, hasError) {
//     // This is a simplified parser. In a real app, you might want to use a more sophisticated approach
//     // or have the AI return structured data directly.

//     // Split the response into sections based on newlines
//     const sections = aiResponse.split('\n\n').filter(Boolean);

//     // Create structured suggestions
//     const suggestions = [];

//     if (hasError) {
//         // Add error fix suggestion
//         suggestions.push({
//             title: "Fix Error",
//             description: sections[0] || "Suggestion to fix the error in your code.",
//             type: "error",
//             code: extractCodeSuggestion(aiResponse),
//         });
//     }

//     // Add improvements
//     if (sections.length > 1) {
//         suggestions.push({
//             title: "Code Improvement",
//             description: "Suggested improvements for better code quality.",
//             type: "improvement",
//             code: extractCodeSuggestion(aiResponse, 1),
//         });
//     }

//     // Add optimization if available
//     if (sections.length > 2) {
//         suggestions.push({
//             title: "Optimization",
//             description: "Suggestion to optimize performance.",
//             type: "optimization",
//             code: extractCodeSuggestion(aiResponse, 2),
//         });
//     }

//     return suggestions;
// }

// /**
//  * Extracts code snippets from AI response
//  */
// function extractCodeSuggestion(aiResponse, sectionIndex = 0) {
//     // Try to find code blocks (between ``` markers)
//     const codeBlockRegex = /```(?:\w+)?\n([\s\S]+?)\n```/g;
//     const matches = [...aiResponse.matchAll(codeBlockRegex)];

//     if (matches.length > sectionIndex) {
//         return matches[sectionIndex][1];
//     }

//     // If no code block found, return null
//     return null;
// }


// lib/ai-service.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI client with singleton pattern
let genAIInstance = null;

/**
 * Get or create the Generative AI instance (singleton pattern)
 * @returns {GoogleGenerativeAI} The singleton genAI instance
 */
function getGenAI() {
  if (!genAIInstance && process.env.GEMINI_API_KEY) {
    genAIInstance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAIInstance;
}

/**
 * Configuration options for AI analysis
 */
const CONFIG = {
  DEFAULT_MODEL: 'gemini-1.5-pro',
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
  TEMPERATURE: 0.7,
  MAX_OUTPUT_TOKENS: 1024,
};

/**
 * Analyzes code using Gemini AI to provide suggestions and improvements
 * 
 * @param {string} code - The source code to analyze
 * @param {string} language - The programming language
 * @param {object} executionResult - Results from code execution
 * @param {object} options - Optional configuration settings
 * @returns {Promise<object>} - AI analysis results
 */
export async function runAICodeAnalysis(code, language, executionResult, options = {}) {
  try {
    const genAI = getGenAI();
    
    // Skip AI analysis if Gemini API key is not configured
    if (!genAI) {
      console.warn('Google Gemini API key not configured. Skipping AI analysis.');
      return { suggestions: [] };
    }

    // Determine execution status
    const hasError = !!executionResult?.error;
    
    // Build the prompt with structured format for better parsing
    const prompt = buildAnalysisPrompt(code, language, executionResult, hasError);
    
    // Configure model parameters with defaults and overrides
    const modelConfig = {
      model: options.model || CONFIG.DEFAULT_MODEL,
      temperature: options.temperature || CONFIG.TEMPERATURE,
      maxOutputTokens: options.maxOutputTokens || CONFIG.MAX_OUTPUT_TOKENS,
    };

    // Get analysis with retry logic for API resilience
    const aiResponse = await getAIResponseWithRetry(
      genAI, 
      prompt, 
      modelConfig, 
      options.retryAttempts || CONFIG.MAX_RETRY_ATTEMPTS
    );

    // Parse AI suggestions into a structured format with more categories
    const suggestions = parseAISuggestions(aiResponse, hasError);

    return { 
      suggestions,
      raw: options.includeRawResponse ? aiResponse : undefined 
    };
  } catch (error) {
    console.error('[AI Service] Analysis error:', error);
    return { 
      suggestions: [],
      error: { message: error.message, code: error.code || 'UNKNOWN_ERROR' }
    };
  }
}

/**
 * Builds a structured prompt for the AI to analyze code
 */
function buildAnalysisPrompt(code, language, executionResult, hasError) {
  let prompt = `
# Code Analysis Task

## Source Code (${language})
\`\`\`${language}
${code}
\`\`\`

## Execution Result
${hasError ? 'Error: ' + executionResult.error : 'Status: Successful execution'}

## Analysis Instructions
Please analyze this code and provide structured feedback in the following categories:

${hasError ? '1. Error Resolution: Explain the error and provide a solution.\n' : ''}
2. Code Quality: Identify any code quality issues or anti-patterns.
3. Performance Optimization: Suggest performance improvements.
4. Security Considerations: Identify any security concerns.
5. Best Practices: Recommend industry standard practices for this code.

For each suggestion, include:
- A clear explanation
- A code example (wrapped in markdown code blocks)
`;

  return prompt;
}

/**
 * Gets AI response with retry logic for resilience
 */
async function getAIResponseWithRetry(genAI, prompt, modelConfig, maxRetries) {
  let lastError = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Get the Gemini model with specified configuration
      const model = genAI.getGenerativeModel({ 
        model: modelConfig.model,
        generationConfig: {
          temperature: modelConfig.temperature,
          maxOutputTokens: modelConfig.maxOutputTokens,
        }
      });

      // Make API call to Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.warn(`[AI Service] Attempt ${attempt + 1} failed:`, error.message);
      lastError = error;
      
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries - 1) {
        const delay = CONFIG.RETRY_DELAY_MS * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // If we get here, all retries failed
  throw lastError || new Error('Failed to get AI response after multiple attempts');
}

/**
 * Parses the AI response into structured suggestions
 */
function parseAISuggestions(aiResponse, hasError) {
  // Enhanced parser to extract structured information
  const suggestions = [];
  
  // Map of suggestion types to identify from the response
  const suggestionTypes = {
    error: {
      patterns: ['error resolution', 'fix error', 'error fix', 'solution'],
      title: "Fix Error",
      priority: 1
    },
    quality: {
      patterns: ['code quality', 'readability', 'maintainability'],
      title: "Code Quality",
      priority: 2
    },
    performance: {
      patterns: ['performance', 'optimization', 'efficient'],
      title: "Performance Optimization",
      priority: 3
    },
    security: {
      patterns: ['security', 'vulnerability', 'secure'],
      title: "Security Enhancement",
      priority: 4
    },
    bestPractice: {
      patterns: ['best practice', 'standard', 'convention'],
      title: "Best Practice",
      priority: 5
    }
  };
  
  // If there was an error, ensure we always have an error fix suggestion
  if (hasError) {
    const errorDescription = extractSectionContent(aiResponse, 'Error Resolution') || 
                            "Suggestion to fix the error in your code.";
    
    suggestions.push({
      title: "Fix Error",
      description: errorDescription,
      type: "error",
      code: extractCodeSuggestion(aiResponse, 'Error Resolution'),
      priority: 1
    });
  }
  
  // Extract other suggestion types
  Object.entries(suggestionTypes).forEach(([type, config]) => {
    if (type === 'error' && hasError) return; // Skip if we already added error suggestion
    
    // Look for sections that match this suggestion type
    for (const pattern of config.patterns) {
      const sectionContent = extractSectionContent(aiResponse, pattern, true);
      
      if (sectionContent) {
        suggestions.push({
          title: config.title,
          description: sectionContent,
          type: type,
          code: extractCodeSuggestion(aiResponse, pattern, true),
          priority: config.priority
        });
        break; // Found a match for this type, don't add duplicates
      }
    }
  });
  
  // Sort suggestions by priority
  suggestions.sort((a, b) => a.priority - b.priority);
  
  return suggestions;
}

/**
 * Extracts content from a specific section of the AI response
 */
function extractSectionContent(aiResponse, sectionName, caseInsensitive = false) {
  const flags = caseInsensitive ? 'i' : '';
  
  // Try to find section headers (e.g., "## Error Resolution" or "Error Resolution:")
  const headerRegex = new RegExp(`(?:#{1,3}\\s*${sectionName}|${sectionName}:)([\\s\\S]*?)(?:(?:#{1,3}|\\d+\\.\\s*\\w)|$)`, flags);
  const match = aiResponse.match(headerRegex);
  
  if (match && match[1]) {
    return match[1].trim();
  }
  
  return null;
}

/**
 * Extracts code snippets from AI response for a specific section
 */
function extractCodeSuggestion(aiResponse, sectionName = null, caseInsensitive = false) {
  // If section name provided, first extract that section
  let textToSearch = aiResponse;
  
  if (sectionName) {
    const sectionContent = extractSectionContent(aiResponse, sectionName, caseInsensitive);
    if (sectionContent) {
      textToSearch = sectionContent;
    }
  }
  
  // Try to find code blocks (between ``` markers)
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]+?)\n```/g;
  const matches = [...textToSearch.matchAll(codeBlockRegex)];
  
  if (matches.length > 0) {
    return matches[0][1];
  }
  
  // If no code block found, return null
  return null;
}