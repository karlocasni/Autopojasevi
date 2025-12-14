
import dotenv from 'dotenv';
dotenv.config();

console.log("Check Env Vars:");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Existent" : "Missing");
console.log("VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL ? "Existent" : "Missing");
