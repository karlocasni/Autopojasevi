export function ContactSection() {
  const section = document.createElement('section');
  section.className = 'section contact-section';
  section.id = 'contact-section';

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title text-center mb-xl">
        <span class="heading-top">KONTAKT</span>
        <span class="heading-bottom">Dođite Nam U Posjet</span>
      </h2>
      
      <div class="contact-grid">
        <div class="contact-info glass">
          <div class="contact-item">
            <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <div class="contact-details">
              <h4>Email</h4>
              <a href="mailto:info@autopojasevi.hr">info@autopojasevi.hr</a>
            </div>
          </div>

          <div class="contact-item">
            <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <div class="contact-details">
              <h4>Telefon</h4>
              <a href="tel:+385123456789">+385 12 345 6789</a>
            </div>
          </div>

          <div class="contact-item">
            <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div class="contact-details">
              <h4>Adresa</h4>
              <p>Vranplaninska ulica 1<br>10000 Zagreb, Hrvatska</p>
            </div>
          </div>

          <div class="contact-item">
            <svg class="icon icon-lg text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <div class="contact-details">
              <h4>Radno vrijeme</h4>
              <p>Ponedjeljak - Petak<br>09:00 - 17:00</p>
            </div>
          </div>
        </div>

        <div class="contact-map glass">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.6786656789!2d16.0395!3d45.8205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d7a6b6a6a6a6%3A0x6a6a6a6a6a6a6a6!2sVranplaninska%20ul.%201%2C%2010000%2C%20Zagreb!5e0!3m2!1sen!2shr!4v1234567890123!5m2!1sen!2shr&maptype=roadmap&style=feature:all|element:all|saturation:-100|lightness:-20&style=feature:poi|element:all|visibility:off"
            width="100%"
            height="100%"
            style="border:0; filter: grayscale(100%) invert(90%) contrast(120%);"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  `;

  return section;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .contact-section {
    background: var(--color-secondary);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    padding: var(--spacing-2xl);
  }

  .contact-item {
    display: flex;
    gap: var(--spacing-lg);
    align-items: flex-start;
  }

  .contact-details {
    flex: 1;
  }

  .contact-details h4 {
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: var(--spacing-xs);
    color: var(--color-text);
  }

  .contact-details p,
  .contact-details a {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-muted);
  }

  .contact-details a {
    transition: color var(--transition-fast);
  }

  .contact-details a:hover {
    color: var(--color-accent);
  }

  .contact-map {
    min-height: 500px;
    overflow: hidden;
    padding: 0;
  }

  .contact-map iframe {
    display: block;
  }

  @media (max-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }

    .contact-map {
      min-height: 400px;
    }
  }
`;
document.head.appendChild(style);
