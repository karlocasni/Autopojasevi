import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !RESEND_API_KEY) {
    console.error("Missing required environment variables.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function sendEmail(to, subject, html) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
            from: 'Autopojasevi <info@autopojasevi.hr>', // Replace with verified domain
            to: [to],
            subject,
            html
        })
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Email failed: ${txt}`);
    }
}

async function run() {
    console.log("Starting reminder check...");

    // Calculate "Tomorrow"
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateStr = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
    console.log(`Checking for bookings on: ${dateStr}`);

    const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('appointment_date', dateStr)
        .eq('reminder_sent', false)
        .neq('status', 'cancelled');

    if (error) {
        console.error("Error fetching bookings:", error);
        process.exit(1);
    }

    console.log(`Found ${bookings.length} bookings to remind.`);

    for (const booking of bookings) {
        try {
            console.log(`Sending reminder to ${booking.email}...`);

            const html = `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <div style="background-color: #141414; padding: 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0;">Podsjetnik na termin</h1>
                </div>
                <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
                  <p>Poštovani/a <strong>${booking.ime} ${booking.prezime}</strong>,</p>
                  <p>Podsjećamo vas na vaš termin sutra:</p>
                  <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #0098FF;">
                    <p style="margin: 5px 0;"><strong>Usluga:</strong> ${booking.service_name}</p>
                    <p style="margin: 5px 0;"><strong>Datum:</strong> ${booking.appointment_date}</p>
                    <p style="margin: 5px 0;"><strong>Vrijeme:</strong> ${booking.appointment_time}</p>
                    <p style="margin: 5px 0;"><strong>Lokacija:</strong> Vranplaninska ulica 1, Zagreb</p>
                  </div>
                  <p>Veselimo se vašem dolasku!</p>
                  <br>
                  <p>Tim Autopojasevi.hr</p>
                </div>
              </div>
            `;

            // 1. Send Email
            await sendEmail(booking.email, "Podsjetnik na termin - Autopojasevi", html);

            // 2. Update Booking (mark sent & set SMS tag)
            await supabase
                .from('bookings')
                .update({
                    reminder_sent: true,
                    sms_tag: 'REMINDER_READY'
                })
                .eq('id', booking.id);

            console.log(`Reminder sent for booking ${booking.id}`);

        } catch (err) {
            console.error(`Failed to process booking ${booking.id}:`, err);
        }
    }

    console.log("Done.");
}

run();
