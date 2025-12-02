import { state } from '../../utils/state.js';

export function Step1bServiceDetails({ serviceId, onNext, onBack }) {
    const container = document.createElement('div');
    container.className = 'booking-step step-service-details';

    const service = state.services.find(s => s.id === serviceId);

    if (!service) {
        container.innerHTML = '<p>Service not found</p>';
        return container;
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
        
        <button class="btn btn-cta" id="continue-btn">
          Nastavi
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <div class="service-details-right">
        <div class="service-image-placeholder glass">
          <div class="placeholder-icon">${service.icon}</div>
          <p>Slika usluge 1</p>
        </div>
        <div class="service-image-placeholder glass">
          <div class="placeholder-icon">${service.icon}</div>
          <p>Slika usluge 2</p>
        </div>
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
    }
  }
`;
document.head.appendChild(style);
