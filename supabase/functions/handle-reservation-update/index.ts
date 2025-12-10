import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const payload = await req.json();
        console.log("Webhook payload:", JSON.stringify(payload));

        // Expected payload from Database Webhook:
        // { type: 'UPDATE', table: 'bookings', record: { ... }, old_record: { ... }, schema: 'public' }
        const { record, old_record, type } = payload;

        if (type !== "UPDATE") {
            return new Response("Not an UPDATE event", { headers: corsHeaders });
        }

        // Check if status changed to 'completed'
        if (record.status === "completed" && old_record.status !== "completed") {
            console.log(`Booking ${record.id} completed. Sending notifications...`);

            // 1. Send Client Email (Confirmation)
            const clientRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "Autopojasevi <info@autopojasevi.hr>", // User needs to verify this domain
                    to: [record.email],
                    subject: "Hvala na povjerenju - Autopojasevi.hr",
                    html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <div style="background-color: #141414; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0;">Autopojasevi.hr</h1>
              </div>
              <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
                <h2>Hvala na vašem povjerenju!</h2>
                <p>Poštovani/a <strong>${record.ime} ${record.prezime}</strong>,</p>
                <p>Vaša rezervacija za uslugu <strong>${record.service_name}</strong> je uspješno završena.</p>
                <p>Nadamo se da ste zadovoljni našom uslugom. Ako imate trenutak, cijenili bismo vašu recenziju na našoj web stranici.</p>
                <br>
                <p>Srdačan pozdrav,</p>
                <p>Tim Autopojasevi.hr</p>
              </div>
            </div>
          `,
                }),
            });

            // 2. Send Admin Alert
            if (ADMIN_EMAIL) {
                await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "Autopojasevi System <system@autopojasevi.hr>",
                        to: [ADMIN_EMAIL],
                        subject: "Alert: Rezervacija završena",
                        html: `
              <p>Rezervacija #${record.id} je označena kao završena.</p>
              <p>Klijent: ${record.ime} ${record.prezime}</p>
            `,
                    }),
                });
            }

            // 3. Update SMS Tag in Database
            const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

            const { error } = await supabase
                .from("bookings")
                .update({ sms_tag: "CONFIRMATION_READY" })
                .eq("id", record.id);

            if (error) {
                console.error("Error updating SMS tag:", error);
            }

            return new Response(JSON.stringify({ success: true }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "No action needed" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error processing webhook:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
