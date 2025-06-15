// lib/models/index.js
import mongoose from 'mongoose';

// Schema for code snippets
const CodeSnippetSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        index: true,
    },
    title: {
        type: String,
        default: 'Untitled Snippet',
    },
    description: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        default: 'anonymous',
        index: true,
    },
    tags: {
        type: [String],
        default: [],
        index: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
        index: true,
    },
});

// Schema for compilation logs
const CompilationLogSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        index: true,
    },
    output: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    executionTime: {
        type: Number,
        default: 0,
    },
    memoryUsage: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true,
    },
    userId: {
        type: String,
        default: 'anonymous',
        index: true,
    },
    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {},
    },
});

// Schema for AI analysis logs
const AIAnalysisSchema = new mongoose.Schema({
    compilationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompilationLog',
        index: true,
    },
    suggestions: [{
        title: String,
        description: String,
        type: String,
        code: String,
    }],
    aiModel: {
        type: String,
        default: 'gpt-3.5-turbo',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        default: 'anonymous',
    },
});

// Create models if they don't exist
// Use mongoose.models to prevent model recompilation error in development
export const CodeSnippet = mongoose.models.CodeSnippet || mongoose.model('CodeSnippet', CodeSnippetSchema);
export const CompilationLog = mongoose.models.CompilationLog || mongoose.model('CompilationLog', CompilationLogSchema);
export const AIAnalysis = mongoose.models.AIAnalysis || mongoose.model('AIAnalysis', AIAnalysisSchema);