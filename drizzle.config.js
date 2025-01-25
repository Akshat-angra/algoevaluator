/** @type {import ("drizzle-kit").Config} */
export default {
    // ... your config here
    schema: './configs/schema.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://insightdb_owner:dJ5Ms0CfGPAT@ep-orange-snowflake-a5f4l3on.us-east-2.aws.neon.tech/AlgoHiredb?sslmode=require'
    }
};