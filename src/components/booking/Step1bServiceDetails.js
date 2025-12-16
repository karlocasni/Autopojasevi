import { state } from '../../utils/state.js';

export function Step1bServiceDetails({ serviceId, onNext, onBack }) {
  const container = document.createElement('div');
  container.className = 'booking-step step-service-details';

  const service = state.services.find(s => s.id === serviceId) || state.bundles?.find(b => b.id === serviceId);

  if (!service) {
    container.innerHTML = '<p>Service not found</p>';
    return container;
  }

  let priceText = '';
  const formatPrice = (p) => Number.isInteger(p) ? p : p.toFixed(2);

  if (service.id === 'zvjezdano-nebo') {
    priceText = 'od 595 € do 1190 €';
  } else if (service.is_request_price) {
    priceText = 'Na upit';
  } else if (service.price) {
    const p1 = formatPrice(service.price);
    if (service.is_from) {
      priceText = `od ${p1} €${service.price_to ? ' do ' + formatPrice(service.price_to) + ' €' : ''}`;
    } else {
      priceText = `${p1} €`;
    }
  }

  container.innerHTML = `
    <div class="service-details-grid">
      <div class="service-details-left">
        <div class="service-header">
          <div class="service-icon-large">${service.icon}</div>
          <h2 class="service-title-large">${service.name}</h2>
        </div>
        
        <p class="service-description-full">${service.description}</p>
        
        <div class="service-selling-points">
          ${service.sellingPoints.map(point => `
            <div class="selling-point">
              <svg class="icon text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span>${point}</span>
            </div>
          `).join('')}
        </div>

        ${priceText ? `
            <div class="service-price-display" style="font-size: 1.25rem; font-weight: bold; color: var(--color-accent); margin-bottom: var(--spacing-sm);">
                ${priceText}
            </div>
        ` : ''}
        
        <button class="btn btn-cta" id="continue-btn">
          Nastavi
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <div class="service-details-right">
        ${service.images && service.images[0] ? `
        <div class="service-image-container glass">
          <img src="${service.images[0]}" alt="${service.name} 1" class="service-image" />
        </div>
        ` : `
        <div class="service-image-placeholder glass">
          <div class="placeholder-icon">${service.icon}</div>
          <p>Slika nije dostupna</p>
        </div>
        `}
        ${service.images && service.images[1] ? `
        <div class="service-image-container glass">
           <img src="${service.images[1]}" alt="${service.name} 2" class="service-image" />
        </div>
        ` : ''}
      </div>
    </div>
  `;

  container.querySelector('#continue-btn').addEventListener('click', () => {
    onNext({ serviceId });
  });

  return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .service-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: start;
  }

  .service-details-left {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .service-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
  }

  .service-title-large {
    font-size: 2rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .service-description-full {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text-muted);
  }

  .service-selling-points {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
  }

  .selling-point {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: 1rem;
  }

  .service-details-right {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .service-image-container {
    aspect-ratio: 16/9;
    width: 100%;
    overflow: hidden;
    padding: 0;
  }

  .service-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }
  
  .service-image:hover {
    transform: scale(1.03);
  }

  .service-image-placeholder {
    aspect-ratio: 16/9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    padding: var(--spacing-xl);
  }

  .placeholder-icon {
    font-size: 4rem;
    opacity: 0.3;
  }

  @media (max-width: 1024px) {
    .service-details-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
    
    .service-image-placeholder {
        padding: var(--spacing-lg);
        aspect-ratio: 21/9; /* Much shorter on mobile */
    }
    
    .placeholder-icon {
        font-size: 2.5rem;
    }
    
    .service-title-large {
        font-size: 1.5rem;
    }
  }
`;
document.head.appendChild(style);
