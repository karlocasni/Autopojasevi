export function HowItWorks() {
  const section = document.createElement('section');
  section.className = 'section how-it-works';

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">PROCES</span>
        <span class="heading-bottom">Kako Funkcionira</span>
      </h2>
      
      <div class="grid grid-3">
        <div class="card step-card">
          <div class="step-icon">
            <svg class="icon icon-xl" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"/>
              <path d="M9.5 11h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0V10h-2.5a.5.5 0 0 0 0 1z"/>
            </svg>
          </div>
          <h3 class="step-title">Odaberi Uslugu</h3>
            Pogledaj našu ponudu i odaberi uslugu koja ti treba - od ugradnje pojaseva do kodiranja vozila.
          </p>
        </div>

        <div class="card step-card">
          <div class="step-icon">
            <svg class="icon icon-xl" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
            </svg>
          </div>
          <h3 class="step-title">Odaberi Datum</h3>
          <p class="step-description">
            Rezerviraj termin koji ti odgovara. Naš kalendar pokazuje dostupnost u realnom vremenu.
          </p>
        </div>

        <div class="card step-card">
          <div class="step-icon">
            <svg class="icon icon-xl" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <h3 class="step-title">Dovezi Auto</h3>
          <p class="step-description">
            Dovezi auto u dogovoreno vrijeme na našu adresu. Naš tim će se pobrinuti za sve ostalo.
          </p>
        </div>
      </div>
    </div>
  `;

  return section;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .how-it-works {
    background: var(--color-primary);
  }

  .section-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .step-card {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }

  .step-icon {
    width: 80px;
    height: 80px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent);
    transition: all var(--transition-base);
  }

  .step-card:hover .step-icon {
    background: rgba(254, 0, 2, 0.1);
    border-color: var(--color-accent);
    transform: scale(1.1);
  }

  .step-title {
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .step-card {
        gap: var(--spacing-lg);
        padding: var(--spacing-lg) 0;
    }
    
    .step-icon {
        width: 60px;
        height: 60px;
    }
    
    .icon-xl {
        width: 32px;
        height: 32px;
    }

    .step-title {
        font-size: 1.2rem;
    }
  }
`;
document.head.appendChild(style);
