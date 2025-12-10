import { router } from '../../utils/router.js';

export function CTABanner() {
  const section = document.createElement('section');
  section.className = 'cta-banner';

  section.innerHTML = `
    <div class="cta-content glass">
      <h2 class="cta-title">Rezerviraj termin u 3 jednostavna koraka.</h2>
      <button class="btn btn-cta" id="cta-button">
        Započni Rezervaciju
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;

  section.querySelector('#cta-button').addEventListener('click', () => {
    router.navigate('/booking');
  });

  return section;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .cta-banner {
    background: var(--color-secondary);
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  .cta-content {
    position: relative;
    z-index: 2;
    padding: var(--spacing-3xl) 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
    text-align: center;
    background: linear-gradient(135deg, rgba(254, 0, 2, 0.1) 0%, rgba(254, 0, 2, 0.05) 100%);
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: 900;
    text-transform: uppercase;
    max-width: 800px;
  }

  @media (max-width: 768px) {
    .cta-title {
      font-size: 1.4rem;
    }
  }
`;
document.head.appendChild(style);
