
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials not found in environment.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyColumns() {
    console.log("Checking columns in 'bookings' table...");

    // Try to insert a row with the new columns. We'll use a fake ID or just try to insert and rollback or delete.
    // Actually, even easier, let's just inspect the structure by selecting.

    const { data, error } = await supabase
        .from('bookings')
        .select('vin, software_version_image_url')
        .limit(1);

    if (error) {
        console.error("Error selecting columns:", error.message);
        if (error.code === 'PGRST204') { // Column not found usually
            console.log("Columns likely missing.");
        }
    } else {
        console.log("Columns 'vin' and 'software_version_image_url' exist and are selectable.");
    }
}

verifyColumns();
