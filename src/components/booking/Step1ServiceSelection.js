import { state } from '../../utils/state.js';

export function Step1ServiceSelection({ onNext, selectedServiceId }) {
  const container = document.createElement('div');
  container.className = 'booking-step step-service-selection';

  let selected = selectedServiceId || null;

  // Determine initial view: if selected ID is a standard service, show services. Otherwise (bundle or null) show bundles.
  let showBundles = true;
  if (selected && state.services.find(s => s.id === selected)) {
    showBundles = false;
  }

  const render = () => {
    const items = showBundles ? state.bundles : state.services;
    const titleText = showBundles ? 'ODABERI PAKET' : 'ODABERI USLUGU';

    const itemsHTML = items.map(item => {
      const hasDiscount = item.original_price && item.price && item.original_price > item.price;
      const isBestDeal = item.id === 'best-deal';

      return `
        <div class="service-selection-card card ${item.id === selected ? 'selected' : ''} ${isBestDeal ? 'best-deal-card' : ''}" data-id="${item.id}">
        ${isBestDeal ? '<div class="best-deal-badge">NAJBOLJA PONUDA</div>' : ''}
        <div class="service-icon-large">${item.icon}</div>
        <h3 class="service-name">${item.name}</h3>
        ${item.is_request_price ? '<div style="font-weight: bold; color: var(--color-accent); margin-top: 5px;">Cijena na upit</div>' : (item.price ? `<div style="font-weight: bold; color: var(--color-accent); margin-top: 5px; display: flex; flex-direction: column; align-items: center;">
             ${hasDiscount ? `<span style="text-decoration: line-through; color: var(--text-secondary); font-size: 0.9em;">${item.original_price} EUR</span>` : ''}
             <span>${item.is_from ? '<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">od</span> ' : ''}${item.price.toFixed(2)} ${item.is_from && item.price_to ? `<span style="font-size: 0.9em; opacity: 0.8; font-weight: normal;">do</span> ${item.price_to.toFixed(2)}` : ''} EUR</span>
        </div>` : '')}
        </div>
    `}).join('');

    container.innerHTML = `
        <h2 class="step-title">
        <span class="heading-top">KORAK 1</span>
        <span class="heading-bottom">${titleText}</span>
        </h2>
        
        <div style="text-align: center; margin-bottom: var(--spacing-xl);">
            <button type="button" class="btn btn-white" id="toggle-view-btn">
                ${showBundles ? 'KLIKNI ZA POJEDINAČNE USLUGE' : 'KLIKNI ZA PAKETE'}
            </button>
        </div>
        
        <div class="service-selection-grid">
        ${itemsHTML}
        </div>
        
        <div class="step-actions" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <button class="btn btn-cta" id="next-btn" ${!selected ? 'disabled' : ''}>
                Nastavi
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    `;

    // Handle selection
    const cards = container.querySelectorAll('.service-selection-card');
    const nextBtn = container.querySelector('#next-btn');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const selectedId = card.dataset.id;
        selected = selectedId;

        // Update UI
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        nextBtn.disabled = false;
      });
    });

    // Toggle View
    container.querySelector('#toggle-view-btn').addEventListener('click', () => {
      showBundles = !showBundles;
      render();
    });

    nextBtn.addEventListener('click', () => {
      if (selected) {
        onNext({ serviceId: selected });
      }
    });
  };

  render();

  state.loadServices().then(() => {
    if (!showBundles) render();
  });

  return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .booking-step {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .step-title {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .service-selection-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-lg);
  }
  
  .service-selection-card {
      width: calc(33.333% - var(--spacing-lg));
  }

  @media (max-width: 1024px) {
    .service-selection-card {
      width: calc(50% - var(--spacing-lg));
    }
  }

  @media (max-width: 640px) {
    .service-selection-card {
      width: 100%;
    }
  }

  .service-selection-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    cursor: pointer;
    text-align: center;
    transition: all var(--transition-base);
  }

  .service-selection-card:hover {
    transform: translateY(-4px);
  }

  .service-selection-card.selected {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-glow-red);
    background: rgba(254, 0, 2, 0.05);
  }
  
  .best-deal-card {
      border: 1px solid #eab308 !important; /* Yellow border */
      box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);
      position: relative;
  }
  
  .best-deal-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #eab308;
      color: black;
      font-weight: bold;
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 12px;
      white-space: nowrap;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  .service-icon-large {
    width: 80px;
    height: 80px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    margin-bottom: var(--spacing-sm);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
  }
    
  .service-selection-card:hover .service-icon-large,
  .service-selection-card.selected .service-icon-large {
    background: rgba(254, 0, 2, 0.1);
    border-color: var(--color-accent);
    transform: scale(1.1);
  }

  .service-icon-large svg {
    width: 40px;
    height: 40px;
    stroke-width: 1.5;
  }

  .service-name {
    font-size: 1rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .service-selection-card {
        padding: var(--spacing-lg);
    }
    
    .service-icon-large {
        width: 60px;
        height: 60px;
    }

    .service-icon-large svg {
        width: 30px;
        height: 30px;
    }
    
    .service-name {
        font-size: 1rem;
    }
    
    .step-actions {
        width: 100%;
        flex-direction: column;
    }
    
    .step-actions .btn {
        width: 100%;
        justify-content: center;
    }
  }
`;
document.head.appendChild(style);
