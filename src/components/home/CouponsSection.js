
import { state } from '../../utils/state.js';

export function CouponsSection() {
    const section = document.createElement('section');
    section.className = 'section coupons-section';
    section.id = 'coupons';

    section.innerHTML = `
        <div class="container">
            <h2 class="section-title mb-lg">
                <span class="heading-top">POKLON BONOVI</span>
                <span class="heading-bottom" style="font-size: 2.5rem;">USREĆI FRENDA/ICU</span>
            </h2>

            <div class="coupons-grid">
                ${[50, 100, 200, 300].map(amount => `
                    <div class="coupon-card glass" data-amount="${amount}">
                        <div class="coupon-content">
                            <div class="coupon-amount">${amount}€</div>
                            <div class="coupon-label">Poklon Bon</div>
                        </div>
                        <button class="btn btn-primary coupon-btn">Kupi</button>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Coupon Modal -->
        <div id="coupon-modal" class="glass coupon-modal" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
                <h3 id="coupon-modal-title">Kupi Poklon Bon</h3>
                <button id="close-coupon-modal" class="close-modal-btn">✕</button>
            </div>
            
            <form id="coupon-form">
                <input type="hidden" name="amount" id="coupon-amount-input">
                
                <h4 style="color: var(--color-accent); margin-bottom: 10px;">Vaši Podaci</h4>
                <div class="form-group mb-sm">
                    <label class="form-label">Vaše ime i prezime</label>
                    <input type="text" class="input" name="purchaserName" required>
                </div>
                <div class="form-group mb-sm">
                    <label class="form-label">Vaš email (za potvrdu)</label>
                    <input type="email" class="input" name="purchaserEmail" required>
                </div>
                <div class="form-group mb-md">
                    <label class="form-label">Vaš telefon</label>
                    <input type="tel" class="input" name="purchaserPhone" required>
                </div>

                <h4 style="color: var(--color-accent); margin-bottom: 10px;">Podaci Primatelja</h4>
                <div class="form-group mb-sm">
                    <label class="form-label">Ime i prezime primatelja</label>
                    <input type="text" class="input" name="recipientName" required>
                </div>
                <div class="form-group mb-sm">
                    <label class="form-label">Email primatelja (za slanje bona)</label>
                    <input type="email" class="input" name="recipientEmail" required>
                </div>
                <div class="form-group mb-md">
                    <label class="form-label">Poruka (opcionalno)</label>
                    <textarea class="input" name="message" rows="3"></textarea>
                </div>

                <button type="submit" class="btn btn-cta w-full" id="coupon-submit-btn">Naruči</button>
            </form>

            <!-- Success Message View -->
            <div id="coupon-success-view" style="display: none; text-align: center; padding: var(--spacing-lg) 0;">
                <div style="margin-bottom: var(--spacing-lg);">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 60px; height: 60px; color: var(--color-success); margin: 0 auto;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 style="font-size: 1.5rem; margin-bottom: var(--spacing-md);">Hvala na narudžbi!</h3>
                <p style="color: var(--color-text-muted); margin-bottom: var(--spacing-lg);">
                    Poklon bon je uspješno naručen.<br>
                    Uskoro ćemo Vam na mail poslati račun.
                </p>
                <button class="btn btn-primary w-full" id="close-success-btn">Zatvori</button>
            </div>
        </div>
        <div id="coupon-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 999;"></div>
    `;

    // Modal Logic
    const modal = section.querySelector('#coupon-modal');
    const overlay = section.querySelector('#coupon-overlay');
    const form = section.querySelector('#coupon-form');
    const successView = section.querySelector('#coupon-success-view');
    const amountInput = section.querySelector('#coupon-amount-input');
    const title = section.querySelector('#coupon-modal-title');
    const closeBtn = section.querySelector('#close-coupon-modal');
    const closeSuccessBtn = section.querySelector('#close-success-btn');

    const openModal = (amount) => {
        amountInput.value = amount;
        title.innerHTML = `Kupi Poklon Bon <span style="color: var(--color-accent);">${amount}€</span>`;
        // Reset view
        form.style.display = 'block';
        successView.style.display = 'none';
        form.reset();

        modal.classList.remove('modal-exit');
        modal.classList.add('modal-enter');
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('modal-enter');
        modal.classList.add('modal-exit');
        overlay.style.display = 'none';
        document.body.style.overflow = '';

        // Wait for animation
        setTimeout(() => {
            modal.style.display = 'none';
            form.reset();
            form.style.display = 'block';
            successView.style.display = 'none';
        }, 300);
    };

    closeBtn.onclick = closeModal;
    overlay.onclick = closeModal;
    closeSuccessBtn.onclick = closeModal;

    section.querySelectorAll('.coupon-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.amount);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = section.querySelector('#coupon-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Obrađivanje...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            await state.buyCoupon(data);
            // Show Success View
            form.style.display = 'none';
            successView.style.display = 'block';
        } catch (error) {
            console.error(error);
            alert('Greška prilikom narudžbe: ' + (error.message || 'Molimo pokušajte ponovno.'));
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    return section;
}

// Styles
const style = document.createElement('style');
style.textContent = `
    .coupons-section {
        padding: var(--spacing-3xl) 0;
        background: linear-gradient(to bottom, var(--color-background), var(--color-primary));
    }

    .coupons-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--spacing-lg);
        margin-top: var(--spacing-xl);
    }

    .coupon-card {
        padding: var(--spacing-xl);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-lg);
        transition: transform 0.3s ease, border-color 0.3s ease;
        cursor: pointer;
        background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%);
        border: 1px solid rgba(255,255,255,0.1);
    }

    .coupon-card:hover {
        transform: translateY(-5px);
        border-color: var(--color-accent);
        box-shadow: 0 10px 30px rgba(0, 152, 255, 0.1);
    }

    .coupon-amount {
        font-size: 3rem;
        font-weight: 900;
        color: var(--color-accent);
        line-height: 1;
        text-shadow: 0 0 20px rgba(0, 152, 255, 0.3);
    }

    .coupon-label {
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-top: var(--spacing-xs);
    }

    @media (max-width: 1024px) {
        .coupons-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .coupons-grid {
            grid-template-columns: 1fr;
        }
        
        .heading-bottom {
            font-size: 1.8rem !important; /* Force smaller size on mobile */
        }
    }
    
    .mb-sm { margin-bottom: var(--spacing-sm); }
    .mb-md { margin-bottom: var(--spacing-md); }
    .w-full { width: 100%; }

    /* Modal Styles */
    .coupon-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 500px;
        padding: var(--spacing-xl);
        z-index: 1000;
        max-height: 90vh;
        overflow-y: auto;
    }

    .close-modal-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 2rem;
        line-height: 1;
        padding: 5px;
        transition: color 0.2s;
    }
    .close-modal-btn:hover {
        color: var(--color-accent);
    }

    /* Animations */
    @keyframes fadeInModal {
        from { opacity: 0; transform: translate(-50%, -45%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }

    @keyframes fadeOutModal {
        from { opacity: 1; transform: translate(-50%, -50%); }
        to { opacity: 0; transform: translate(-50%, -45%); }
    }

    .modal-enter {
        animation: fadeInModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .modal-exit {
        animation: fadeOutModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
`;
document.head.appendChild(style);
