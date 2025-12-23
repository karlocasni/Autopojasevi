import { state } from '../../utils/state.js';

export function Step5Review({ bookingData, onNext, onBack }) {
  const container = document.createElement('div');
  container.className = 'booking-step step-review';

  const service = state.services.find(s => s.id === bookingData.serviceId) || state.bundles?.find(b => b.id === bookingData.serviceId);
  // Calculate Price
  let calculatedPrice = null;
  if (service.id === 'pojasevi' && bookingData.brojPojaseva) {
    // Default prices: Standard 69, Disassembled 39. Prioritize service config if available.
    const priceStandard = service.price || 69;
    const priceDisassembled = service.price_disassembled || 39;
    const perBelt = bookingData.vlastitiPojasevi ? priceDisassembled : priceStandard;
    calculatedPrice = parseInt(bookingData.brojPojaseva) * perBelt;
  } else if (service.id === 'zvjezdano-nebo' && bookingData.brojZvjezdica) {
    const stars = parseInt(bookingData.brojZvjezdica);
    if (stars === 500) {
      calculatedPrice = service.price_500_stars || 595;
    } else if (stars === 750) {
      calculatedPrice = service.price_750_stars || 750;
    } else {
      // Default 1.19 per star
      const pricePerStar = service.price_per_star || 1.19;
      calculatedPrice = stars * pricePerStar;
    }
  } else if (service.price) {
    calculatedPrice = service.price;
  }

  // Check for Cabrio/Targa
  const modelName = (bookingData.model || '').toLowerCase();
  const isCabrio = modelName.includes('cabrio') ||
    modelName.includes('targa') ||
    modelName.includes('convertible') ||
    modelName.includes('spider') ||
    modelName.includes('roadster');

  if (isCabrio) {
    calculatedPrice = null; // Forces "na upit"
  }

  // Save for Step 6
  bookingData.totalPrice = calculatedPrice;

  const dateObj = new Date(bookingData.date);
  const formattedDate = dateObj.toLocaleDateString('hr-HR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Determine period
  const hour = parseInt(bookingData.time.split(':')[0]);
  const period = hour < 13 ? 'Jutro' : 'Popodne';

  container.innerHTML = `
    <h2 class="step-title">
      <span class="heading-top">KORAK 5</span>
      <span class="heading-bottom">Pregled Rezervacije</span>
    </h2>
    
    <div class="review-container glass">
      <div class="review-section">
        <h3 class="review-section-title">Usluga</h3>
        <div class="review-item">
          <span class="review-icon">${service.icon}</span>
          <span class="review-value">${service.name}</span>
        </div>
        <div class="review-item" style="margin-top: 10px;">
          <span class="review-label">Cijena:</span>
          <span class="review-value" style="font-size: 1.2rem; font-weight: bold; color: var(--color-accent);">
            ${calculatedPrice !== null ? calculatedPrice.toFixed(2) + ' €' : 'Na upit'}
          </span>
        </div>
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Vozilo</h3>
        <div class="review-item">
          <span class="review-label">Vozilo:</span>
          <span class="review-value">${bookingData.marka} ${bookingData.model} (${bookingData.godina})</span>
        </div>
        <div class="review-item">
          <span class="review-label">Registracija:</span>
          <span class="review-value">${bookingData.registracija}</span>
        </div>
        ${bookingData.brojPojaseva ? `
          <div class="review-item">
            <span class="review-label">Broj pojaseva:</span>
            <span class="review-value">${bookingData.brojPojaseva}</span>
          </div>
        ` : ''}
        ${bookingData.brojZvjezdica ? `
          <div class="review-item">
            <span class="review-label">Broj zvjezdica:</span>
            <span class="review-value">${bookingData.brojZvjezdica}</span>
          </div>
        ` : ''}
        ${bookingData.vlastitiPojasevi ? `
          <div class="review-item">
            <span class="review-value text-accent">✓ Vlastiti pojasevi</span>
          </div>
        ` : ''}
        ${bookingData.napomena ? `
          <div class="review-item">
            <span class="review-label">Napomena:</span>
            <span class="review-value">${bookingData.napomena}</span>
          </div>
        ` : ''}
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Termin</h3>
        <div class="review-item">
          <span class="review-label">Datum:</span>
          <span class="review-value">${formattedDate}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Vrijeme:</span>
          <span class="review-value">${bookingData.time}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Period:</span>
          <span class="review-value">${period}</span>
        </div>
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Kontakt</h3>
        <div class="review-item">
          <span class="review-label">Ime:</span>
          <span class="review-value">${bookingData.imePrezime}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Email:</span>
          <span class="review-value">${bookingData.email}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Telefon:</span>
          <span class="review-value">${bookingData.telefon}</span>
        </div>
        ${bookingData.whatsappPodsjetnik || bookingData.emailPodsjetnik ? `
          <div class="review-item">
            <span class="review-label">Podsjetnici:</span>
            <span class="review-value">
              ${bookingData.whatsappPodsjetnik ? 'SMS' : ''}
              ${bookingData.whatsappPodsjetnik && bookingData.emailPodsjetnik ? ', ' : ''}
              ${bookingData.emailPodsjetnik ? 'Email' : ''}
            </span>
          </div>
        ` : ''}
      </div>

      <div class="review-section">
        <h3 class="review-section-title">Lokacija</h3>
        <div class="review-item">
          <span class="review-value">Vranplaninska ulica 1, 10000 Zagreb</span>
        </div>
      </div>

      <div class="review-terms-wrapper" style="text-align: center; margin-bottom: var(--spacing-lg);">
        <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; color: var(--color-text-muted);">
            <input type="checkbox" id="terms-check" style="width: 18px; height: 18px; accent-color: var(--color-accent);">
            <span>
                Slanjem potvrđuješ <button type="button" id="terms-open-btn" style="background: none; border: none; padding: 0; color: var(--color-accent); text-decoration: underline; cursor: pointer; font-size: inherit; font-family: inherit;">uvjete usluge</button>.
            </span>
        </label>
      </div>

      <div class="step-actions">
        <button type="button" class="btn btn-secondary" id="back-btn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Natrag
        </button>
        <button type="button" class="btn btn-cta" id="confirm-btn">
          Potvrdi Rezervaciju
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // === MODAL LOGIC ===
  const modalId = 'terms-modal';
  let modal = document.getElementById(modalId);
  const termsContentHTML = `
    <div style="font-family: var(--font-body); color: var(--color-text); line-height: 1.6;">
        <h3 style="color: var(--color-accent); margin-bottom: 1rem; text-align:center;">UVJETI POSLOVANJA</h3>
        <p><strong>Autopojasevi.hr</strong></p>
        <p>Korištenjem web stranice autopojasevi.hr i slanjem zahtjeva za rezervaciju termina, korisnik (u daljnjem tekstu: Klijent) u potpunosti prihvaća dolje navedene uvjete poslovanja, pravila o prikupljanju podataka i politiku otkazivanja.</p>

        <h4 style="color:var(--color-text); margin-top:1.5rem; margin-bottom:0.5rem;">I. POLITIKA PRIVATNOSTI I ZAŠTITA PODATAKA</h4>
        <p><strong>1. Kontakt i pitanja</strong><br>Poštujemo vašu privatnost. Za sva pitanja vezana uz obradu vaših podataka ili ove uvjete, možete nas kontaktirati na e-mail adresu: info@autopojasevi.hr.</p>
        <p><strong>2. Prikupljanje podataka</strong><br>Prilikom rezervacije termina za usluge auto detailinga, prikupljamo sljedeće osobne podatke: ime i prezime, adresu e-pošte, broj telefona te podatke o vozilu.</p>
        <p><strong>3. Svrha obrade</strong><br>Vaši podaci nužni su za: dogovaranje i realizaciju termina, izdavanje računa za usluge ili naknadu štete, te zakonske obveze.</p>

        <h4 style="color:var(--color-text); margin-top:1.5rem; margin-bottom:0.5rem;">II. UVJETI REZERVACIJE, OTKAZIVANJA I NAPLATE (Obavezno pročitati)</h4>
        <p><strong>1. Obvezujuća rezervacija</strong><br>Rezervacija termina putem sustava autopojasevi.hr smatra se sklapanjem obvezujućeg ugovora o pružanju usluge.</p>
        <p><strong>2. Politika nedolaska i otkazivanja (No-Show Policy)</strong><br>Slanjem rezervacije Klijent pristaje na sljedeće stroge uvjete otkazivanja:</p>
        <ul style="padding-left:20px; list-style:disc; margin-bottom:1rem;">
            <li><strong>Bezuvjetna naplata:</strong> U slučaju da Klijent ne dođe na dogovoreni termin ili otkaže termin unutar 5 dana prije rezerviranog datuma, Klijent je dužan platiti naknadu.</li>
            <li><strong>Iznos naknade:</strong> Naknada za otkazivanje ili nedolazak iznosi 50% ukupne cijene rezervirane usluge.</li>
        </ul>
        <p><strong>3. Izdavanje računa i rok plaćanja</strong><br>U slučaju otkazivanja ili nedolaska, Klijentu će biti poslan račun na iznos od 50% vrijednosti usluge koji je dužan podmiriti u roku od 3 radna dana.</p>
        <p><strong>4. Prisilna naplata</strong><br>Ukoliko se račun ne podmiri, pokreće se postupak prisilne naplate, a Klijent snosi sve troškove postupka.</p>
        <p><strong>5. Izjava o prihvaćanju</strong><br>Zaključenjem procesa rezervacije Klijent potvrđuje da je pročitao i razumio ove Uvjete.</p>
    </div>
  `;

  if (!modal) {
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'glass modal-overlay';
    // Reuse existing modal styles or inline logic
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;';

    const content = document.createElement('div');
    content.className = 'glass modal-content';
    content.style.cssText = 'background: #1a1a1a; border: 1px solid var(--glass-border); padding: 30px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative; border-radius: 12px;';

    content.innerHTML = `
          <button class="close-modal-btn" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
          ${termsContentHTML}
      `;
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Close logic
    const close = () => { modal.style.display = 'none'; };
    modal.querySelector('.close-modal-btn').onclick = close;
    modal.onclick = (e) => { if (e.target === modal) close(); };
  }

  container.querySelector('#terms-open-btn').addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex'; // Use flex to center
  });

  container.querySelector('#back-btn').addEventListener('click', onBack);
  const termsCheck = container.querySelector('#terms-check');
  container.querySelector('#confirm-btn').addEventListener('click', () => {
    if (!termsCheck.checked) {
      alert('Molimo potvrdite uvjete usluge prije nastavka.');
      return;
    }
    onNext();
  });

  return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .review-container {
    max-width: 700px;
    margin: 0 auto;
    padding: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .review-section {
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--glass-border);
  }

  .review-section:last-of-type {
    border-bottom: none;
  }

  .review-section-title {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: var(--spacing-md);
    color: var(--color-accent);
  }

  .review-item {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    align-items: center;
  }

  .review-icon {
    font-size: 2rem;
  }

  .review-label {
    font-weight: 700;
    color: var(--color-text-muted);
    min-width: 120px;
  }

  .review-value {
    color: var(--color-text);
    font-size: 1.05rem;
  }

  .review-terms {
    text-align: center;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    font-style: italic;
  @media (max-width: 768px) {
    .review-container {
      padding: var(--spacing-lg);
      gap: var(--spacing-lg);
    }
    
    .review-section-title {
        font-size: 1rem;
    }
    
    .review-value, .review-label {
        font-size: 0.95rem;
    }
    
    .review-icon {
        font-size: 1.5rem;
    }
    
    .review-item {
        flex-wrap: wrap; 
        gap: 4px;
        align-items: flex-start;
        margin-bottom: var(--spacing-sm);
    }
    
    .review-label {
        font-size: 0.85rem;
        min-width: 80px;
        flex-shrink: 0;
    }

    .review-value {
        font-size: 0.9rem;
        word-break: break-word; /* Ensure long emails wrap */
        flex: 1;
    }

    .review-section {
        padding-bottom: var(--spacing-sm);
    }
  }
`;
document.head.appendChild(style);
