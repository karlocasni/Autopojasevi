import { state } from '../../utils/state.js';

export function StepUpsell({ currentServiceId, onUpgrade, onSkip }) {
    const container = document.createElement('div');
    container.className = 'booking-step step-upsell';

    // Find upgrades
    // Filter bundles that include the current service ID
    const upgrades = state.bundles?.filter(b => b.includes && b.includes.includes(currentServiceId)) || [];

    // Sort by price ascending to show next logical step first? Or "Best Deal"?
    // Let's show all applicable upgrades.

    if (upgrades.length === 0) {
        // Should not happen if we checked before rendering, but safe fallback
        setTimeout(onSkip, 0);
        return container;
    }

    const upgradesHtml = upgrades.map(bundle => {
        const savings = (bundle.original_price && bundle.price) ? (bundle.original_price - bundle.price) : 0;

        return `
        <div class="upsell-card glass" data-id="${bundle.id}">
            <div class="upsell-header">
                <div class="upsell-icon">${bundle.icon}</div>
                <div class="upsell-info">
                    <h3 class="upsell-title">${bundle.name}</h3>
                    <div class="upsell-price">
                        ${bundle.original_price ? `<span class="original-price">${bundle.original_price} €</span>` : ''}
                        <span class="current-price">${bundle.price} €</span>
                    </div>
                    ${savings > 0 ? `<div class="upsell-savings">Ušteda: ${savings} €</div>` : ''}
                </div>
            </div>
            <div class="upsell-description">
                ${bundle.description}
            </div>
            <button class="btn btn-cta btn-upgrade" data-id="${bundle.id}">
                Nadogradi
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
        `;
    }).join('');

    container.innerHTML = `
        <h2 class="step-title">
            <span class="heading-top">PRIJE NEGO ZAVRŠIMO</span>
            <span class="heading-bottom">Iskoristi Priliku!</span>
        </h2>
        
        <div class="upsell-container">
            <p class="upsell-intro">Dodajte još usluga uz vaš odabir i ostvarite značajne uštede uz naše pakete.</p>
            
            <div style="text-align: center;">
                <button class="btn btn-white" id="skip-btn">
                    Ne želim paket, nastavi s rezervacijom
                </button>
            </div>
            
            <div class="upsell-grid">
                ${upgradesHtml}
            </div>
        </div>
    `;

    // Handlers
    container.querySelectorAll('.btn-upgrade').forEach(btn => {
        btn.addEventListener('click', () => {
            const bundleId = btn.dataset.id;
            onUpgrade(bundleId);
        });
    });

    container.querySelector('#skip-btn').addEventListener('click', onSkip);

    return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
    .step-upsell {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }

    .upsell-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
        padding: var(--spacing-xl) 0;
    }

    .upsell-intro {
        font-size: 1.1rem;
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
    }

    .upsell-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--spacing-lg);
        justify-items: center;
    }

    .upsell-card {
        padding: var(--spacing-lg);
        width: 100%;
        max-width: 350px;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        border: 1px solid var(--glass-border);
        transition: transform 0.3s ease;
        text-align: left;
    }

    .upsell-card:hover {
        transform: translateY(-5px);
        border-color: var(--accent);
    }

    .upsell-header {
        display: flex;
        gap: var(--spacing-md);
        align-items: center;
    }

    .upsell-icon {
        color: var(--accent);
        width: 50px;
        height: 50px;
        flex-shrink: 0;
    }
    
    .upsell-icon svg {
        width: 100%;
        height: 100%;
    }

    .upsell-info {
        display: flex;
        flex-direction: column;
    }

    .upsell-title {
        font-size: 1.1rem;
        font-weight: bold;
        text-transform: uppercase;
    }

    .upsell-price {
        display: flex;
        gap: 8px;
        align-items: baseline;
    }

    .original-price {
        text-decoration: line-through;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .current-price {
        color: var(--accent);
        font-weight: bold;
        font-size: 1.2rem;
    }

    .upsell-savings {
        color: #22c55e;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .upsell-description {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.5;
        flex-grow: 1;
    }

    .btn-skip {
        margin-top: var(--spacing-md);
        color: var(--text-secondary);
        opacity: 0.7;
        font-size: 0.9rem;
        background: none;
        border: none;
        cursor: pointer;
        text-decoration: underline;
    }
    
    .btn-skip:hover {
        opacity: 1;
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);
