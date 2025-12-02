export function AboutSection() {
  const section = document.createElement('section');
  section.className = 'section about-section';
  section.id = 'about-section';

  section.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="about-text">
          <h2 class="section-title mb-lg">
            <span class="heading-top">O NAMA</span>
            <span class="heading-bottom">Naša Priča</span>
          </h2>
          
          <div class="about-content">
            <p>
              <strong>Autopojasevi.hr</strong> je brend koji spaja stručnost, sigurnost i stil. 
              Osnivač i vlasnik <strong>Ismael Hadžić</strong>, poznat content creator, 
              prepoznao je potrebu za profesionalnom i pouzdanom uslugom u automobilskoj industriji.
            </p>
            
            <p>
              Naša misija je pružiti vrhunsku uslugu svakom klijentu, bez obzira radi li se o 
              ugradnji sigurnosnih pojaseva, luksuznom zvjezdanom nebu ili profesionalnom mapiranju vozila.
            </p>
            
            <p>
              <strong>Povjerenje je temelj našeg poslovanja.</strong> Kod nas su bili poznati influenceri 
              i veliki klijenti koji nam vjeruju jer znaju da ćemo posao obaviti precizno, 
              sigurno i profesionalno.
            </p>
            
            <div class="about-values">
              <div class="value-item">
                <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span>Sigurnost</span>
              </div>
              <div class="value-item">
                <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                <span>Preciznost</span>
              </div>
              <div class="value-item">
                <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Povjerenje</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-image-wrapper">
          <div class="about-image-container" id="parallax-car">
            <img src="/images/about-car.png" alt="Luxury Car" class="about-car-image">
          </div>
        </div>
      </div>
    </div>
  `;

  // Parallax effect
  let ticking = false;
  const parallaxElement = section.querySelector('#parallax-car');

  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    // Check if section is in viewport
    if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
      const offset = (scrolled - sectionTop) * -0.3; // Negative for opposite direction
      parallaxElement.style.transform = `translateY(${offset}px)`;
    }

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick);

  return section;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .about-section {
    background: var(--color-primary);
    overflow: hidden;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: center;
  }

  .about-text {
    display: flex;
    flex-direction: column;
  }

  .about-content p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--color-text);
    margin-bottom: var(--spacing-lg);
  }

  .about-content strong {
    color: var(--color-accent);
  }

  .about-values {
    display: flex;
    justify-content: center;
    gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-xl);
    border-top: 1px solid var(--glass-border);
  }

  .value-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.9rem;
  }

  .about-image-wrapper {
    position: relative;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.1s ease-out;
  }

  .about-car-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
  }

  @media (max-width: 1024px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }

    .about-image-wrapper {
      height: 400px;
    }

    .about-values {
      justify-content: space-around;
    }
  }

  @media (max-width: 640px) {
    .about-values {
      flex-direction: column;
      gap: var(--spacing-md);
    }
  }
`;
document.head.appendChild(style);
