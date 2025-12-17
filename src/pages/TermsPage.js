import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

export function TermsPage() {
    const page = document.createElement('div');
    page.className = 'page-terms';

    page.appendChild(Header());

    const main = document.createElement('main');
    main.className = 'terms-main';

    main.innerHTML = `
    <div class="container" style="max-width: 800px; margin: 0 auto; padding: calc(var(--header-height, 80px) + var(--spacing-2xl)) var(--spacing-lg) var(--spacing-2xl);">
        <h1 class="section-title text-center" style="margin-bottom: var(--spacing-2xl);">Opći uvjeti poslovanja i Politika privatnosti</h1>
        
        <div class="glass" style="padding: var(--spacing-2xl);">
            <div class="terms-content">
                <p><strong>Autopojasevi.hr</strong></p>
                <p>Korištenjem web stranice autopojasevi.hr i slanjem zahtjeva za rezervaciju termina, korisnik (u daljnjem tekstu: Klijent) u potpunosti prihvaća dolje navedene uvjete poslovanja, pravila o prikupljanju podataka i politiku otkazivanja.</p>

                <h3>I. POLITIKA PRIVATNOSTI I ZAŠTITA PODATAKA</h3>

                <h4>1. Kontakt i pitanja</h4>
                <p>Poštujemo vašu privatnost. Za sva pitanja vezana uz obradu vaših podataka ili ove uvjete, možete nas kontaktirati na e-mail adresu: info@autopojasevi.hr.</p>

                <h4>2. Prikupljanje podataka</h4>
                <p>Prilikom rezervacije termina za usluge auto detailinga, prikupljamo sljedeće osobne podatke: ime i prezime, adresu e-pošte, broj telefona te podatke o vozilu.</p>

                <h4>3. Svrha obrade</h4>
                <p>Vaši podaci nužni su za:</p>
                <ul>
                    <li>Dogovaranje, potvrdu i realizaciju termina.</li>
                    <li>Izdavanje računa za obavljene usluge.</li>
                    <li>Izdavanje računa za naknadu štete u slučaju nedolaska ili otkazivanja termina.</li>
                    <li>Zakonske obveze vođenja poslovnih knjiga.</li>
                </ul>

                <h4>4. Pohrana i dijeljenje</h4>
                <p>Vaši podaci čuvaju se sukladno zakonskim propisima. Podaci se ne dijele s trećim stranama, osim kada je to nužno za ispunjenje zakonskih obveza ili za potrebe prisilne naplate potraživanja (odvjetnički uredi, javni bilježnici, FINA).</p>

                <h3>II. UVJETI REZERVACIJE, OTKAZIVANJA I NAPLATE (Obavezno pročitati)</h3>

                <h4>1. Obvezujuća rezervacija</h4>
                <p>Rezervacija termina putem sustava autopojasevi.hr smatra se sklapanjem obvezujućeg ugovora o pružanju usluge. Rezervacijom zauzimate termin koji pružatelj usluge ne može ustupiti drugom klijentu.</p>

                <h4>2. Politika nedolaska i otkazivanja (No-Show Policy)</h4>
                <p>Slanjem rezervacije Klijent pristaje na sljedeće stroge uvjete otkazivanja:</p>
                <p><strong>Bezuvjetna naplata:</strong> U slučaju da Klijent ne dođe na dogovoreni termin ili otkaže termin, bez obzira na vremenski trenutak otkazivanja (bilo odmah nakon rezervacije, danima ranije ili na dan termina), Klijent je dužan platiti naknadu za rezervaciju termina.</p>
                <p><strong>Iznos naknade:</strong> Naknada za otkazivanje ili nedolazak iznosi 50,00 EUR (slovima: pedeset eura).</p>

                <h4>3. Izdavanje računa i rok plaćanja</h4>
                <p>U slučaju nastupa okolnosti iz točke 2. (otkazivanje ili nedolazak), Klijentu će na ostavljenu e-mail adresu biti poslan račun na iznos od 50,00 EUR.</p>
                <p>Klijent je dužan podmiriti navedeni iznos u roku od 3 (tri) radna dana od primitka računa putem e-maila.</p>

                <h4>4. Prisilna naplata i sudski postupak</h4>
                <p>Ukoliko Klijent ne podmiri račun u navedenom roku, pokreće se postupak prisilne naplate sukladno važećim zakonima Republike Hrvatske.</p>
                <p>Slučaj se prosljeđuje na rješavanje nadležnim tijelima radi pokretanja ovršnog postupka ili sudske tužbe.</p>
                <p>U slučaju prisilne naplate, Klijent se obvezuje, pored osnovnog duga od 50,00 EUR, podmiriti i sve nastale troškove postupka (troškove odvjetnika, javnobilježničke pristojbe) te zakonske zatezne kamate.</p>

                <h4>5. Izjava o prihvaćanju</h4>
                <p>Zaključenjem procesa rezervacije Klijent potvrđuje da je pročitao ove Uvjete, da ih razumije te da je suglasan s naplatom iznosa od 50,00 EUR u slučaju da rezervirani termin ne iskoristi, neovisno o razlogu ili vremenu otkazivanja.</p>
            </div>
        </div>
    </div>
  `;

    page.appendChild(main);
    page.appendChild(Footer());

    return page;
}

const style = document.createElement('style');
style.textContent = `
    .terms-content h3 {
        color: var(--color-accent);
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    .terms-content h4 {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        color: var(--color-text);
    }
    .terms-content p, .terms-content ul {
        margin-bottom: 1rem;
        line-height: 1.6;
        color: var(--color-text-muted);
    }
    .terms-content ul {
        padding-left: 20px;
        list-style-type: disc;
    }
`;
document.head.appendChild(style);
