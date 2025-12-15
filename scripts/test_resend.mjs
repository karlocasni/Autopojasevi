import { createClient } from '@supabase/supabase-js';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
    console.error("ERROR: RESEND_API_KEY is missing from .env file.");
    process.exit(1);
}

console.log("Testing Resend API with key starting with:", RESEND_API_KEY.substring(0, 5) + "...");

async function runtrace() {
    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev',
                to: ['info@autopojasevi.hr'], // Sending to your verified email
                subject: 'Test Email from Local Script',
                html: '<h1>It Works!</h1><p>If you see this, Resend API Key is valid.</p>'
            })
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("FAILED to send email.");
            console.error("Status:", res.status);
            console.error("Response:", JSON.stringify(data, null, 2));
        } else {
            console.log("SUCCESS! Email sent.");
            console.log("ID:", data.id);
            console.log("Check your inbox info@autopojasevi.hr");
        }
    } catch (e) {
        console.error("Network or script error:", e);
    }
}

runtrace();
