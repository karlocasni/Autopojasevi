import { carBrands, searchBrands, getYearsForModel } from '../../data/carBrands.js';
import { state as globalState } from '../../utils/state.js';

export function Step2VehicleInfo({ serviceId, onNext, onBack, initialData = {} }) {
    const container = document.createElement('div');
    container.className = 'booking-step step-vehicle-info';

    // Identify service or bundle
    const service = globalState.services.find(s => s.id === serviceId) || globalState.bundles?.find(b => b.id === serviceId);

    // Helper to check inclusions
    const includes = (id) => service?.id === id || (service?.includes && service.includes.includes(id));

    const isPojasevi = service?.id === 'pojasevi';
    const isZvjezdano = service?.id === 'zvjezdano-nebo';
    const isMapiranje = includes('mapiranje');

    // State management
    let state = {
        stage: 'brand', // 'brand', 'model', 'year', 'manual', 'details'
        selectedBrand: initialData.marka ? carBrands.find(b => b.name === initialData.marka) : null,
        selectedModel: initialData.model || null,
        selectedYear: initialData.godina || null,
        searchQuery: '',
        isManualEntry: false
    };

    // If we have initial data, skip to details stage
    if (state.selectedBrand && state.selectedModel && state.selectedYear) {
        state.stage = 'details';
    }

    function render() {
        container.innerHTML = `
            <h2 class="step-title">
                <span class="heading-top">KORAK 2</span>
                <span class="heading-bottom">Podaci o Vozilu</span>
            </h2>
            
            <div class="vehicle-selection-container glass">
                ${renderBreadcrumb()}
                ${renderStage()}
            </div>
        `;

        attachEventListeners();
    }

    function renderBreadcrumb() {
        const parts = [];

        if (state.selectedBrand) {
            parts.push(`<span class="breadcrumb-item">${state.selectedBrand.name}</span>`);
        }
        if (state.selectedModel) {
            parts.push(`<span class="breadcrumb-item">${state.selectedModel}</span>`);
        }
        if (state.selectedYear) {
            parts.push(`<span class="breadcrumb-item">${state.selectedYear}</span>`);
        }

        if (parts.length === 0) return '';

        return `
            <div class="breadcrumb">
                ${parts.join('<span class="breadcrumb-separator">›</span>')}
            </div>
        `;
    }

    function renderStage() {
        switch (state.stage) {
            case 'brand':
                return renderBrandSelection();
            case 'model':
                return renderModelSelection();
            case 'year':
                return renderYearSelection();
            case 'manual':
                return renderManualEntry();
            case 'details':
                return renderDetailsForm();
            default:
                return '';
        }
    }

    function renderBrandSelection() {
        const filteredBrands = searchBrands(state.searchQuery);

        return `
            <div class="selection-stage">
                <div class="search-container">
                    <input 
                        type="text" 
                        class="search-input input" 
                        placeholder="Pretraži marku vozila..." 
                        value="${state.searchQuery}"
                        id="brand-search"
                    />
                </div>

                <div class="brands-grid">
                    ${filteredBrands.map(brand => `
                        <div class="brand-card" data-brand-id="${brand.id}">
                            <div class="brand-logo">
                                <img src="${brand.logo}" alt="${brand.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <div class="brand-fallback" style="display:none;">${brand.name.charAt(0)}</div>
                            </div>
                            <div class="brand-name">${brand.name}</div>
                        </div>
                    `).join('')}
                    
                    ${filteredBrands.length > 0 ? `
                        <div class="brand-card brand-card-other" id="other-brand-btn">
                            <div class="brand-logo">
                                <div class="brand-fallback" style="display:block;">
                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="brand-name">Ostalo</div>
                        </div>
                    ` : ''}
                </div>

                ${filteredBrands.length === 0 ? `
                    <div class="no-results">
                        <p>Nema rezultata za "${state.searchQuery}"</p>
                        <button class="btn btn-secondary" id="other-brand-btn-no-results">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                            Unesi vozilo ručno
                        </button>
                    </div>
                ` : ''}

                <div class="step-actions">
                    <button type="button" class="btn btn-secondary" id="back-btn">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Natrag
                    </button>
                </div>
            </div>
        `;
    }

    function renderModelSelection() {
        const models = state.selectedBrand.models;

        return `
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-brand">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni marku
                </button>

                <h3 class="stage-title">Odaberi model</h3>

                <div class="models-grid">
                    ${models.map(model => `
                        <div class="model-card" data-model-name="${model.name}">
                            <div class="model-name">${model.name}</div>
                            <div class="model-years">${model.years[0]} - ${model.years[1]}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="step-actions">
                    <button type="button" class="btn btn-secondary" id="back-btn">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Natrag
                    </button>
                </div>
            </div>
        `;
    }

    function renderYearSelection() {
        const modelData = state.selectedBrand.models.find(m => m.name === state.selectedModel);
        const years = getYearsForModel(modelData);

        return `
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-model">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni model
                </button>

                <h3 class="stage-title">Odaberi godinu</h3>

                <div class="years-grid">
                    ${years.map(year => `
                        <div class="year-card" data-year="${year}">
                            ${year}
                        </div>
                    `).join('')}
                </div>

                <div class="step-actions">
                    <button type="button" class="btn btn-secondary" id="back-btn">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Natrag
                    </button>
                </div>
            </div>
        `;
    }

    function renderManualEntry() {
        return `
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-brand-from-manual">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Natrag na odabir marke
                </button>

                <h3 class="stage-title">Unesi podatke o vozilu</h3>
                <p class="stage-description">Unesite informacije o vašem vozilu ručno.</p>

                <form class="manual-entry-form" id="manual-entry-form">
                    <div class="form-group">
                        <label class="form-label">Marka vozila *</label>
                        <input 
                            type="text" 
                            class="input" 
                            name="marka" 
                            placeholder="npr. Tesla, Polestar, Rivian..." 
                            required
                            value="${state.selectedBrand?.name || ''}"
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Model vozila *</label>
                        <input 
                            type="text" 
                            class="input" 
                            name="model" 
                            placeholder="npr. Model 3, 2, R1T..." 
                            required
                            value="${state.selectedModel || ''}"
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Godina proizvodnje *</label>
                        <input 
                            type="number" 
                            class="input" 
                            name="godina" 
                            placeholder="npr. 2023" 
                            min="1950" 
                            max="2030" 
                            required
                            value="${state.selectedYear || ''}"
                        />
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
            </div>
        `;
    }

    function renderDetailsForm() {
        return `
            <div class="selection-stage">
                <button class="back-to-stage-btn" id="back-to-year">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Promijeni godinu
                </button>

                <div class="selected-vehicle-summary">
                    <h3>Odabrano vozilo</h3>
                    <p class="vehicle-info">${state.selectedBrand.name} ${state.selectedModel} (${state.selectedYear})</p>
                </div>

                <form class="details-form" id="details-form">
                    ${isPojasevi ? `
                        <div class="form-group">
                            <label class="form-label">Broj pojaseva</label>
                            <select class="input" name="brojPojaseva" id="broj-pojaseva" required>
                                <option value="">Odaberi...</option>
                                ${[1, 2, 3, 4, 5, 6, 7].map(n => `<option value="${n}" ${initialData.brojPojaseva == n ? 'selected' : ''}>${n}</option>`).join('')}
                            </select>
                            <div id="seatbelt-warning" style="visibility: hidden; margin-top: 10px; font-size: 0.9rem; color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.1); padding: 10px; border-radius: 4px;">
                                Ne preporučujemo ugradnju manje od 4 pojasa zbog zakonskih regulativa.
                            </div>
                        </div>

                        <div class="checkbox-wrapper">
                            <input type="checkbox" class="checkbox" id="vlastiti-pojasevi" name="vlastitiPojasevi" ${initialData.vlastitiPojasevi ? 'checked' : ''}>
                            <label for="vlastiti-pojasevi">Rastavljeni sustav</label>
                        </div>
                    ` : ''}

                    ${isZvjezdano ? `
                        <div class="form-group">
                            <label class="form-label">Broj zvjezdica</label>
                            <select class="input" name="brojZvjezdica" required>
                                <option value="">Odaberi...</option>
                                ${[500, 600, 700, 750, 800, 900, 1000].map(n => `
                                    <option value="${n}" ${initialData.brojZvjezdica == n ? 'selected' : ''}>${n}</option>
                                `).join('')}
                            </select>
                        </div>
                    ` : ''}

                    ${isMapiranje ? `
                        <div class="form-group">
                            <label class="form-label">Broj šasije (VIN)</label>
                            <input type="text" class="input" name="vinBroj" placeholder="Unesite broj šasije" required value="${initialData.vinBroj || ''}">
                        </div>

                        <div class="form-group">
                            <label class="form-label">Vrsta usluge kodiranja</label>
                            <select class="input" name="codingOption" id="coding-option" required>
                                <option value="">Odaberi...</option>
                                ${(() => {
                    // Check if current service is a bundle
                    const isBundle = globalState.bundles?.some(b => b.id === serviceId);

                    // Full list of advanced tuning/removal options (Restricted for bundles)
                    const advancedOptions = `
                                        <option value="stage_tune">Stage tune</option>
                                        <option value="pops_bangs">Pops and bangs</option>
                                        <option value="custom_mapa">Custom mapa</option>
                                        <option value="uklanjanje_torque_limitera">Uklanjanje torque limitera</option>
                                        <option value="uklanjanje_adblue">Uklanjanje AdBlue</option>
                                        <option value="uklanjanje_aktivnih_poklopaca">Uklanjanje aktivnih poklopaca maske</option>
                                        <option value="uklanjanje_dpf_opf">Uklanjanje DPFa/OPFa</option>
                                        <option value="uklanjanje_egr">Uklanjanje EGRa</option>
                                        <option value="uklanjanje_senzora_kisika">Uklanjanje senzora kisika</option>
                                        <option value="uklanjanje_kickdowna">Uklanjanje kickdowna</option>
                                        <option value="uklanjanje_maf">Uklanjanje MAF senzora</option>
                                        <option value="uklanjanje_ventila">Uklanjanje ventila (valve)</option>
                                        <option value="uklanjanje_limitera_brzine">Uklanjanje limitera brzine</option>
                                        <option value="uklanjanje_start_stop">Uklanjanje Start/Stop</option>
                                    `;

                    // Basic/Comfort options (Available for everyone)
                    const basicOptions = `
                                        <option value="video_u_voznji">Video u vožnji</option>
                                        <option value="carplay_android_auto">Carplay/Android Auto</option>
                                        <option value="azuriranje_navigacije">Ažuriranje navigacije</option>
                                        <option value="needle_sweep">Needle sweep</option>
                                        <option value="ostalo">Ostalo</option>
                                    `;

                    // If it's a bundle, return only basic options. If singular, return both.
                    if (isBundle) {
                        return basicOptions;
                    } else {
                        return advancedOptions + basicOptions;
                    }
                })()}
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Slika verzije softvera</label>
                            <input type="file" class="input" name="softverSlika" accept="image/*" ${initialData.softverSlika ? '' : 'required'}>
                            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:5px;">Molimo učitajte sliku trenutne verzije softvera.</p>
                        </div>
                    ` : ''}

                    <div class="form-group">
                        <label class="form-label">Kratka napomena <span id="napomena-optional">(opcionalno)</span></label>
                        <textarea class="input" name="napomena" id="napomena-input" rows="4" placeholder="Dodatne informacije...">${initialData.napomena || ''}</textarea>
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
            </div>
        `;
    }

    function attachEventListeners() {
        // Brand search
        const searchInput = container.querySelector('#brand-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                state.searchQuery = e.target.value;
                render();
            });
        }

        // Brand selection
        const brandCards = container.querySelectorAll('.brand-card:not(.brand-card-other)');
        brandCards.forEach(card => {
            card.addEventListener('click', () => {
                const brandId = card.dataset.brandId;
                state.selectedBrand = carBrands.find(b => b.id === brandId);
                state.stage = 'model';
                render();
            });
        });

        // "Other" brand button (in grid)
        const otherBrandBtn = container.querySelector('#other-brand-btn');
        if (otherBrandBtn) {
            otherBrandBtn.addEventListener('click', () => {
                state.stage = 'manual';
                state.isManualEntry = true;
                render();
            });
        }

        // "Other" brand button (when no results)
        const otherBrandBtnNoResults = container.querySelector('#other-brand-btn-no-results');
        if (otherBrandBtnNoResults) {
            otherBrandBtnNoResults.addEventListener('click', () => {
                state.stage = 'manual';
                state.isManualEntry = true;
                render();
            });
        }

        // Model selection
        const modelCards = container.querySelectorAll('.model-card');
        modelCards.forEach(card => {
            card.addEventListener('click', () => {
                state.selectedModel = card.dataset.modelName;
                state.stage = 'year';
                render();
            });
        });

        // Year selection
        const yearCards = container.querySelectorAll('.year-card');
        yearCards.forEach(card => {
            card.addEventListener('click', () => {
                state.selectedYear = card.dataset.year;
                state.stage = 'details';
                render();
            });
        });

        // Back to stage buttons
        const backToBrand = container.querySelector('#back-to-brand');
        if (backToBrand) {
            backToBrand.addEventListener('click', () => {
                state.stage = 'brand';
                state.selectedBrand = null;
                state.selectedModel = null;
                state.selectedYear = null;
                render();
            });
        }

        const backToModel = container.querySelector('#back-to-model');
        if (backToModel) {
            backToModel.addEventListener('click', () => {
                state.stage = 'model';
                state.selectedModel = null;
                state.selectedYear = null;
                render();
            });
        }

        const backToYear = container.querySelector('#back-to-year');
        if (backToYear) {
            backToYear.addEventListener('click', () => {
                state.stage = 'year';
                state.selectedYear = null;
                render();
            });
        }

        const backToBrandFromManual = container.querySelector('#back-to-brand-from-manual');
        if (backToBrandFromManual) {
            backToBrandFromManual.addEventListener('click', () => {
                state.stage = 'brand';
                state.isManualEntry = false;
                render();
            });
        }

        // Manual entry form submission
        const manualEntryForm = container.querySelector('#manual-entry-form');
        if (manualEntryForm) {
            manualEntryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(manualEntryForm);
                const data = Object.fromEntries(formData.entries());

                // Set manual vehicle data
                state.selectedBrand = { name: data.marka };
                state.selectedModel = data.model;
                state.selectedYear = data.godina;
                state.isManualEntry = true;
                state.stage = 'details';
                render();
            });
        }

        // Details form submission
        // Details form submission
        const detailsForm = container.querySelector('#details-form');
        if (detailsForm) {
            // Seatbelt warning listener
            const brojPojasevaInput = detailsForm.querySelector('#broj-pojaseva');
            if (brojPojasevaInput) {
                const warningDiv = detailsForm.querySelector('#seatbelt-warning');
                const checkWarning = () => {
                    const val = parseInt(brojPojasevaInput.value);
                    if (val > 0 && val < 4) {
                        warningDiv.style.visibility = 'visible';
                    } else {
                        warningDiv.style.visibility = 'hidden';
                    }
                };
                brojPojasevaInput.addEventListener('change', checkWarning);
                // Initial check
                checkWarning();
            }

            // Coding 'Ostalo' logic
            const codingOption = detailsForm.querySelector('#coding-option');
            const napomenaInput = detailsForm.querySelector('#napomena-input');
            const napomenaOptional = detailsForm.querySelector('#napomena-optional');

            if (codingOption && napomenaInput) {
                const checkCoding = () => {
                    if (codingOption.value === 'ostalo') {
                        napomenaInput.required = true;
                        if (napomenaOptional) napomenaOptional.textContent = '*';
                    } else {
                        napomenaInput.required = false;
                        if (napomenaOptional) napomenaOptional.textContent = '(opcionalno)';
                    }
                };
                codingOption.addEventListener('change', checkCoding);
                checkCoding(); // Initial check
            }

            detailsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(detailsForm);
                const data = Object.fromEntries(formData.entries());
                data.marka = state.selectedBrand.name;
                data.model = state.selectedModel;
                data.godina = state.selectedYear;
                data.vlastitiPojasevi = detailsForm.querySelector('#vlastiti-pojasevi')?.checked || false;
                onNext(data);
            });
        }

        // Back button
        const backBtn = container.querySelector('#back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (state.stage === 'brand') {
                    onBack();
                } else {
                    // Go back one stage
                    if (state.stage === 'model') {
                        state.stage = 'brand';
                        state.selectedBrand = null;
                    } else if (state.stage === 'year') {
                        state.stage = 'model';
                        state.selectedModel = null;
                    } else if (state.stage === 'details') {
                        state.stage = 'year';
                        state.selectedYear = null;
                    }
                    render();
                }
            });
        }
    }

    // Initial render
    render();

    return container;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
    .vehicle-selection-container {
        max-width: 900px;
        margin: 0 auto;
        padding: var(--spacing-2xl);
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-xl);
        padding-bottom: var(--spacing-lg);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .breadcrumb-item {
        color: var(--accent);
        font-weight: 600;
    }

    .breadcrumb-separator {
        color: var(--text-secondary);
        opacity: 0.5;
    }

    .selection-stage {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
    }

    .search-container {
        width: 100%;
    }

    .search-input {
        width: 100%;
        font-size: 1rem;
    }

    .brands-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
    }

    @media (max-width: 1024px) {
        .brands-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .brand-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);
        padding: var(--spacing-lg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .brand-card:hover {
        background: rgba(0, 152, 255, 0.1);
        border-color: var(--accent);
        transform: translateY(-4px);
    }

    .brand-card-other {
        background: rgba(0, 152, 255, 0.05);
        border: 2px dashed rgba(0, 152, 255, 0.3);
    }

    .brand-card-other:hover {
        background: rgba(0, 152, 255, 0.15);
        border-color: var(--accent);
    }

    .brand-card-other .brand-fallback {
        background: transparent;
        border: 2px solid var(--accent);
    }

    .brand-card-other .icon {
        width: 40px;
        height: 40px;
        color: var(--accent);
    }

    .brand-logo {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .brand-logo img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: brightness(0.9);
    }

    .brand-fallback {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--accent);
        border-radius: 50%;
        font-size: 2rem;
        font-weight: bold;
        color: white;
    }

    .brand-name {
        font-weight: 600;
        text-align: center;
        font-size: 0.9rem;
    }

    .models-grid,
    .years-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
    }

    @media (max-width: 1024px) {
        .models-grid,
        .years-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .model-card,
    .year-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);
        padding: var(--spacing-lg);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }

    .model-card:hover,
    .year-card:hover {
        background: rgba(0, 152, 255, 0.1);
        border-color: var(--accent);
        transform: translateY(-2px);
    }

    .model-name {
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: var(--spacing-xs);
    }

    .model-years {
        font-size: 0.85rem;
        color: var(--text-secondary);
    }

    .year-card {
        font-size: 1.2rem;
        font-weight: 600;
    }

    .years-grid {
        grid-template-columns: repeat(3, 1fr);
        max-height: 400px;
        overflow-y: auto;
    }

    @media (max-width: 1024px) {
        .years-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .back-to-stage-btn {
        background: none;
        border: none;
        color: var(--accent);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        cursor: pointer;
        font-size: 0.9rem;
        padding: var(--spacing-sm);
        margin: calc(var(--spacing-lg) * -1) calc(var(--spacing-lg) * -1) 0;
        transition: opacity 0.3s ease;
    }

    .back-to-stage-btn:hover {
        opacity: 0.8;
    }

    .back-to-stage-btn .icon {
        width: 16px;
        height: 16px;
    }

    .stage-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
    }

    .stage-description {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .selected-vehicle-summary {
        background: rgba(0, 152, 255, 0.1);
        border: 1px solid var(--accent);
        border-radius: var(--radius-md);
        padding: var(--spacing-lg);
        text-align: center;
    }

    .selected-vehicle-summary h3 {
        margin: 0 0 var(--spacing-sm) 0;
        font-size: 1rem;
        color: var(--text-secondary);
    }

    .vehicle-info {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--accent);
    }

    .details-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .no-results {
        text-align: center;
        padding: var(--spacing-2xl);
        color: var(--text-secondary);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        align-items: center;
    }

    .no-results p {
        margin: 0;
    }

    .manual-entry-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    @media (max-width: 768px) {
        .brands-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
        }

        .brand-logo {
            width: 60px;
            height: 60px;
        }

        .brand-fallback {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
        }

        .brand-card-other .icon {
            width: 30px;
            height: 30px;
        }

        .models-grid,
        .years-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
