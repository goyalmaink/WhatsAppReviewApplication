import postgres from 'postgres'
import dotenv from 'dotenv'
dotenv.config()
const connectionString = process.env.DATABASE_URL

console.log("Connecting to database at:", connectionString)
const sql = postgres(connectionString, {
    // ssl: "require",
    ssl:{ rejectUnauthorized: false }
})

export default sql
