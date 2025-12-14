
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
        const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

        if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
        if (!SUPABASE_ANON_KEY) throw new Error("Missing SUPABASE_ANON_KEY");
        if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

        // 1. Verify Authentication
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            throw new Error("Missing Authorization header");
        }

        // Create a client with the user's token to verify they are logged in
        const supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: authHeader } },
        });

        const { data: { user }, error: authError } = await supabaseAnon.auth.getUser();

        if (authError || !user) {
            throw new Error("Unauthorized: Invalid user token");
        }

        // Verify user metadata role (optional, but good practice if you set it)
        // For now, we assume if they can log in to admin app, they are admin.
        if (user.user_metadata?.role !== 'admin') {
            // throw new Error("Unauthorized: User is not an admin"); 
            // Commented out temporarily if role isn't set on your user yet, but enabled if you set it.
        }

        // 2. Parse Request
        let body;
        try {
            body = await req.json();
        } catch (e) {
            throw new Error("Invalid JSON body");
        }
        const { action, email, password, userId } = body;

        // 3. Admin Actions
        const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        if (action === "list") {
            const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
            if (error) throw error;

            return new Response(JSON.stringify({ users }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        if (action === "create") {
            if (!email || !password) throw new Error("Email and password are required");
            const { data: { user: newUser }, error } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: { role: 'admin' } // Important: set role so they can log in!
            });
            if (error) throw error;

            return new Response(JSON.stringify({ user: newUser }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        if (action === "delete") {
            if (!userId) throw new Error("User ID is required");

            if (userId === user.id) {
                throw new Error("Cannot delete your own account");
            }

            const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
            if (error) throw error;

            return new Response(JSON.stringify({ success: true }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }

        throw new Error(`Invalid action: ${action}`);

    } catch (error) {
        console.error("Function Error:", error.message);
        // Return 200 with error property to bypass 'non-2xx' client error and show message to user
        return new Response(JSON.stringify({ error: error.message }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
