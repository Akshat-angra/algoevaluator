// lib/db-service.js
import { connectToDB } from './mongodb';
import { CodeSnippet, CompilationLog, AIAnalysis } from './models';

/**
 * Save code snippet to database
 * 
 * @param {object} snippetData - Code snippet data
 * @returns {Promise<object>} - Saved snippet document
 */
export async function saveCodeSnippet(snippetData) {
    try {
        await connectToDB();

        const snippet = new CodeSnippet(snippetData);
        await snippet.save();

        return snippet;
    } catch (error) {
        console.error('Error saving code snippet:', error);
        throw error;
    }
}

/**
 * Create compilation log entry
 * 
 * @param {object} logData - Compilation log data
 * @returns {Promise<object>} - Created log document
 */
export async function createCompilationLog(logData) {
    try {
        await connectToDB();

        const log = new CompilationLog(logData);
        await log.save();

        return log;
    } catch (error) {
        console.error('Error creating compilation log:', error);
        throw error;
    }
}

/**
 * Log AI analysis result
 * 
 * @param {object} analysisData - AI analysis data
 * @returns {Promise<object>} - Created analysis document
 */
export async function logAIAnalysis(analysisData) {
    try {
        await connectToDB();

        const analysis = new AIAnalysis(analysisData);
        await analysis.save();

        return analysis;
    } catch (error) {
        console.error('Error logging AI analysis:', error);
        throw error;
    }
}

/**
 * Get code snippet by ID
 * 
 * @param {string} snippetId - Snippet ID
 * @returns {Promise<object>} - Code snippet document
 */
export async function getCodeSnippetById(snippetId) {
    try {
        await connectToDatabase();

        const snippet = await CodeSnippet.findById(snippetId);
        return snippet;
    } catch (error) {
        console.error('Error getting code snippet:', error);
        throw error;
    }
}

/**
 * Get recent code snippets
 * 
 * @param {string} userId - User ID (optional)
 * @param {number} limit - Maximum number of results
 * @returns {Promise<Array>} - Array of code snippets
 */
export async function getRecentSnippets(userId = null, limit = 10) {
    try {
        await connectToDB();

        const query = userId ? { userId } : {};

        const snippets = await CodeSnippet.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        return snippets;
    } catch (error) {
        console.error('Error getting recent snippets:', error);
        throw error;
    }
}

/**
 * Search code snippets
 * 
 * @param {object} query - Search query parameters
 * @returns {Promise<Array>} - Array of code snippets
 */
export async function searchCodeSnippets(query) {
    try {
        await connectToDB();

        const { language, tag, search, page = 1, limit = 10 } = query;

        const dbQuery = {};

        if (language) {
            dbQuery.language = language;
        }

        if (tag) {
            dbQuery.tags = tag;
        }

        if (search) {
            dbQuery.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
            ];
        }

        const skip = (page - 1) * limit;

        const snippets = await CodeSnippet.find(dbQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await CodeSnippet.countDocuments(dbQuery);

        return {
            snippets,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    } catch (error) {
        console.error('Error searching code snippets:', error);
        throw error;
    }
}

/**
 * Get usage statistics
 * 
 * @param {string} userId - User ID (optional)
 * @param {Date} startDate - Start date for stats
 * @param {Date} endDate - End date for stats
 * @returns {Promise<object>} - Usage statistics
 */
export async function getUsageStatistics(userId = null, startDate = null, endDate = null) {
    try {
        await connectToDB();

        const query = {};

        if (userId) {
            query.userId = userId;
        }

        if (startDate || endDate) {
            query.timestamp = {};

            if (startDate) {
                query.timestamp.$gte = startDate;
            }

            if (endDate) {
                query.timestamp.$lte = endDate;
            }
        }

        // Get compilation stats
        const compilationCount = await CompilationLog.countDocuments(query);

        // Get language distribution
        const languageStats = await CompilationLog.aggregate([
            { $match: query },
            { $group: { _id: '$language', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // Get error rate
        const errorCount = await CompilationLog.countDocuments({
            ...query,
            error: { $ne: '' },
        });

        return {
            compilationCount,
            languageStats,
            errorRate: compilationCount > 0 ? errorCount / compilationCount : 0,
        };
    } catch (error) {
        console.error('Error getting usage statistics:', error);
        throw error;
    }
}