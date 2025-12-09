import { supabase } from './supabase.js';

/**
 * Authentication utilities for admin panel
 */
export const auth = {
    /**
     * Sign in admin user
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     * @returns {Promise<{user, session, error}>}
     */
    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // Check if user has admin role
            const isAdmin = data.user?.user_metadata?.role === 'admin';
            if (!isAdmin) {
                await this.logout();
                throw new Error('Unauthorized: Admin access required');
            }

            return { user: data.user, session: data.session, error: null };
        } catch (error) {
            console.error('Login error:', error);
            return { user: null, session: null, error };
        }
    },

    /**
     * Sign out current user
     * @returns {Promise<{error}>}
     */
    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { error: null };
        } catch (error) {
            console.error('Logout error:', error);
            return { error };
        }
    },

    /**
     * Send password reset email
     * @param {string} email - User email
     * @returns {Promise<{error}>}
     */
    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/reset-password`
            });
            if (error) throw error;
            return { error: null };
        } catch (error) {
            console.error('Password reset error:', error);
            return { error };
        }
    },

    /**
     * Update user password (after reset or in settings)
     * @param {string} newPassword - New password
     * @returns {Promise<{error}>}
     */
    async updatePassword(newPassword) {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });
            if (error) throw error;
            return { error: null };
        } catch (error) {
            console.error('Update password error:', error);
            return { error };
        }
    },

    /**
     * Get current authenticated user
     * @returns {Promise<{user, error}>}
     */
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            return { user, error: null };
        } catch (error) {
            console.error('Get user error:', error);
            return { user: null, error };
        }
    },

    /**
     * Check if user is authenticated and is admin
     * @returns {Promise<boolean>}
     */
    async isAuthenticated() {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return false;

            const { user } = await this.getCurrentUser();
            return user?.user_metadata?.role === 'admin';
        } catch (error) {
            console.error('Auth check error:', error);
            return false;
        }
    },

    /**
     * Create new admin user (admin only)
     * @param {string} email - New admin email
     * @param {string} password - Temporary password
     * @returns {Promise<{user, error}>}
     */
    async createAdmin(email, password) {
        try {
            // Call the secure RPC function
            const { data, error } = await supabase.rpc('create_admin_user', {
                new_email: email,
                new_password: password
            });

            if (error) throw error;
            return { user: data, error: null };
        } catch (error) {
            console.error('Create admin error:', error);
            return { user: null, error };
        }
    },

    /**
     * List all admin users
     * @returns {Promise<{admins: Array, error}>}
     */
    async listAdmins() {
        try {
            const { data, error } = await supabase.rpc('get_admins');
            if (error) throw error;
            return { admins: data, error: null };
        } catch (error) {
            console.error('List admins error:', error);
            return { admins: [], error };
        }
    },

    /**
     * Delete an admin user
     * @param {string} userId - ID of user to delete
     * @returns {Promise<{success: boolean, error}>}
     */
    async deleteAdmin(userId) {
        try {
            const { error } = await supabase.rpc('delete_admin_user', {
                target_user_id: userId
            });
            if (error) throw error;
            return { success: true, error: null };
        } catch (error) {
            console.error('Delete admin error:', error);
            return { success: false, error };
        }
    },

    /**
     * Listen for auth state changes
     * @param {Function} callback 
     * @returns {Object} Subscription object
     */
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
};
