export function Step2VehicleInfo({ serviceId, onNext, onBack, initialData = {} }) {
    const container = document.createElement('div');
    container.className = 'booking-step step-vehicle-info';

    const isPojasevi = serviceId === 'pojasevi';
    const isZvjezdano = serviceId === 'zvjezdano-nebo';

    container.innerHTML = `
    <h2 class="step-title">
      <span class="heading-top">KORAK 2</span>
      <span class="heading-bottom">Podaci o Vozilu</span>
    </h2>
    
    <form class="vehicle-form glass" id="vehicle-form">
      <div class="form-group">
        <label class="form-label">Marka vozila</label>
        <input type="text" class="input" name="marka" required value="${initialData.marka || ''}">
      </div>

      <div class="form-group">
        <label class="form-label">Model</label>
        <input type="text" class="input" name="model" required value="${initialData.model || ''}">
      </div>

      <div class="form-group">
        <label class="form-label">Godina</label>
        <input type="number" class="input" name="godina" min="1980" max="2025" required value="${initialData.godina || ''}">
      </div>

      ${isPojasevi ? `
        <div class="form-group">
          <label class="form-label">Broj pojaseva</label>
          <select class="input" name="brojPojaseva" required>
            <option value="">Odaberi...</option>
            ${[1, 2, 3, 4, 5].map(n => `<option value="${n}" ${initialData.brojPojaseva == n ? 'selected' : ''}>${n}</option>`).join('')}
          </select>
        </div>

        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" id="vlastiti-pojasevi" name="vlastitiPojasevi" ${initialData.vlastitiPojasevi ? 'checked' : ''}>
          <label for="vlastiti-pojasevi">Nosim vlastite pojaseve / rastavljeni sustav</label>
        </div>
      ` : ''}

      ${isZvjezdano ? `
        <div class="form-group">
          <label class="form-label">Broj zvjezdica</label>
          <select class="input" name="brojZvjezdica" required>
            <option value="">Odaberi...</option>
            ${[100, 150, 200, 250, 300, 400, 500, 750, 1000].map(n => `
              <option value="${n}" ${initialData.brojZvjezdica == n ? 'selected' : ''}>${n}</option>
            `).join('')}
          </select>
        </div>
      ` : ''}

      <div class="form-group">
        <label class="form-label">Kratka napomena (opcionalno)</label>
        <textarea class="input" name="napomena" rows="4" placeholder="Dodatne informacije...">${initialData.napomena || ''}</textarea>
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

    const form = container.querySelector('#vehicle-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.vlastitiPojasevi = form.querySelector('#vlastiti-pojasevi')?.checked || false;
        onNext(data);
    });

    container.querySelector('#back-btn').addEventListener('click', onBack);

    return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .vehicle-form {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
`;
document.head.appendChild(style);
