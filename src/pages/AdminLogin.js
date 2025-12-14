import { auth } from '../utils/auth.js';
import { router } from '../utils/router.js';

export function AdminLogin() {
    const page = document.createElement('div');
    page.className = 'page-admin-login';

    // State
    let email = '';
    let password = '';
    let loading = false;
    let error = '';
    let resetSent = false;
    let showResetForm = false;

    const render = () => {
        page.innerHTML = `
            <div class="login-container">
                <div class="login-card glass">
                    <div class="login-header">
                        <a href="/" id="home-link" style="display: inline-block; margin-bottom: 1rem;">
                      <div class="login-logo-container">
      <img src="/images/logo.png" alt="Admin" class="login-logo" style="cursor: pointer; width: 120px; height: auto;">
    </div>                    </a>
                        <p class="login-subtitle">Prijavite se za pristup</p>
                    </div>

                    ${error ? `
                        <div class="alert alert-error">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            <span>${error}</span>
                        </div>
                    ` : ''}

                    ${resetSent ? `
                        <div class="alert alert-success">
                            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span>Email za resetiranje lozinke je poslan. Provjerite svoj inbox.</span>
                        </div>
                    ` : ''}

                    ${showResetForm ? `
                        <form class="login-form" id="reset-form">
                            <div class="form-group">
                                <label for="reset-email" class="form-label">Email</label>
                                <input 
                                    type="email" 
                                    id="reset-email" 
                                    class="input" 
                                    placeholder="admin@autopojasevi.hr"
                                    required
                                    value="${email}"
                                />
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary" ${loading ? 'disabled' : ''}>
                                    ${loading ? 'Šaljem...' : 'Pošalji Link'}
                                </button>
                                <button type="button" class="btn btn-secondary" id="back-to-login">
                                    Natrag na prijavu
                                </button>
                            </div>
                        </form>
                    ` : `
                        <form class="login-form" id="login-form">
                            <div class="form-group">
                                <label for="email" class="form-label">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    class="input" 
                                    placeholder="admin@autopojasevi.hr"
                                    required
                                    value="${email}"
                                />
                            </div>

                            <div class="form-group">
                                <label for="password" class="form-label">Lozinka</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    class="input" 
                                    placeholder="••••••••"
                                    required
                                    value="${password}"
                                />
                            </div>

                            <button 
                                type="button" 
                                class="forgot-password-link" 
                                id="forgot-password"
                            >
                                Zaboravili ste lozinku?
                            </button>

                            <button type="submit" class="btn btn-primary btn-block" ${loading ? 'disabled' : ''}>
                                ${loading ? 'Prijava...' : 'Prijavi se'}
                            </button>
                        </form>
                    `}
                </div>
            </div>
        `;

        attachEventListeners();
    };

    const attachEventListeners = () => {
        const loginForm = page.querySelector('#login-form');
        const resetForm = page.querySelector('#reset-form');
        const forgotPasswordBtn = page.querySelector('#forgot-password');
        const backToLoginBtn = page.querySelector('#back-to-login');
        const homeLink = page.querySelector('#home-link');

        homeLink?.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate('/');
        });

        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);

            const emailInput = page.querySelector('#email');
            const passwordInput = page.querySelector('#password');

            emailInput?.addEventListener('input', (e) => {
                email = e.target.value;
            });

            passwordInput?.addEventListener('input', (e) => {
                password = e.target.value;
            });
        }

        if (resetForm) {
            resetForm.addEventListener('submit', handlePasswordReset);

            const resetEmailInput = page.querySelector('#reset-email');
            resetEmailInput?.addEventListener('input', (e) => {
                email = e.target.value;
            });
        }

        forgotPasswordBtn?.addEventListener('click', () => {
            showResetForm = true;
            error = '';
            resetSent = false;
            render();
        });

        backToLoginBtn?.addEventListener('click', () => {
            showResetForm = false;
            error = '';
            resetSent = false;
            render();
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            error = 'Molimo unesite email i lozinku';
            render();
            return;
        }

        loading = true;
        error = '';
        render();

        const { user, session, error: loginError } = await auth.login(email, password);

        if (loginError) {
            loading = false;
            error = loginError.message === 'Unauthorized: Admin access required'
                ? 'Nemate admin pristup'
                : 'Neispravni podaci za prijavu';
            render();
            return;
        }

        // Successful login - redirect to admin panel
        router.navigate('/admin');
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (!email) {
            error = 'Molimo unesite email';
            render();
            return;
        }

        loading = true;
        error = '';
        render();

        const { error: resetError } = await auth.resetPassword(email);

        loading = false;

        if (resetError) {
            error = 'Greška pri slanju emaila. Pokušajte ponovno.';
            render();
            return;
        }

        resetSent = true;
        error = '';
        render();
    };

    render();
    return page;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
    .page-admin-login {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
        padding: var(--spacing-lg);
    }

    .login-container {
        width: 100%;
        max-width: 450px;
    }

    .login-card {
        padding: var(--spacing-2xl);
        border-radius: var(--radius-lg);
    }

    .login-header {
        text-align: center;
        margin-bottom: var(--spacing-2xl);
    }

    .login-title {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
    }

    .login-subtitle {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .form-label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--color-text);
    }

    .forgot-password-link {
        background: none;
        border: none;
        color: var(--color-accent);
        font-size: var(--font-size-sm);
        text-align: right;
        cursor: pointer;
        padding: 0;
        margin-top: calc(var(--spacing-sm) * -1);
        transition: opacity var(--transition-base);
    }

    .forgot-password-link:hover {
        opacity: 0.8;
        text-decoration: underline;
    }

    .btn-block {
        width: 100%;
    }

    .form-actions {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .alert {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-lg);
        font-size: var(--font-size-sm);
    }

    .alert .icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    .alert-error {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .alert-success {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
        border: 1px solid rgba(34, 197, 94, 0.2);
    }

    @media (max-width: 768px) {
        .login-card {
            padding: var(--spacing-xl);
        }

        .login-title {
            font-size: var(--font-size-2xl);
        }
    }
`;
document.head.appendChild(style);
