export function Step4CustomerInfo({ onNext, onBack, initialData = {} }) {
  const container = document.createElement('div');
  container.className = 'booking-step step-customer-info';

  container.innerHTML = `
    <h2 class="step-title">
      <span class="heading-top">KORAK 4</span>
      <span class="heading-bottom">Vaši Podaci</span>
    </h2>
    
    <form class="customer-form glass" id="customer-form">
      <div class="form-group">
        <label class="form-label">Ime i prezime</label>
        <input type="text" class="input" name="imePrezime" required value="${initialData.imePrezime || ''}">
      </div>

      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="input" name="email" required value="${initialData.email || ''}">
      </div>

      <div class="form-group">
        <label class="form-label">Telefon</label>
        <input type="tel" class="input" name="telefon" required placeholder="+385 91 123 4567" pattern="^\\+[0-9\\s]{9,}$" title="Unesite broj u formatu +385..." value="${initialData.telefon || ''}">
      </div>

      <div class="form-group">
        <label class="form-label">Registracija vozila</label>
        <input type="text" class="input" name="registracija" required placeholder="ZG-1234-AB" value="${initialData.registracija || ''}">
      </div>

      <div class="step-actions">
        <button type="button" class="btn btn-secondary" id="back-btn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Natrag
        </button>
        <button type="submit" class="btn btn-cta">
          Nastavi
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </form>
  `;

  const form = container.querySelector('#customer-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Clean phone number (remove spaces)
    data.telefon = data.telefon.replace(/\s/g, '');

    if (!data.telefon.startsWith('+')) {
      alert('Molimo unesite broj telefona s pozivnim brojem (npr. +385...)');
      return;
    }

    // Default to true as we send reminders no matter what
    data.whatsappPodsjetnik = true;
    data.emailPodsjetnik = true;
    onNext(data);
  });

  container.querySelector('#back-btn').addEventListener('click', onBack);

  return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .customer-form {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .form-checkboxes {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--glass-border);
  }
`;
document.head.appendChild(style);
