// State management using localStorage for demo
export const state = {
    // Services data
    services: [
        {
            id: 'pojasevi',
            name: 'Ugradnja pojaseva',
            icon: '🔧',
            description: 'Profesionalna ugradnja sigurnosnih pojaseva. Možete donijeti i rastavljeni sustav za pojaseve.',
            sellingPoints: [
                'Certificirana ugradnja',
                'Garancija na rad',
                'Brza i precizna usluga',
                'Podrška za sve modele'
            ],
            images: ['/images/service-seatbelt-1.jpg', '/images/service-seatbelt-2.jpg']
        },
        {
            id: 'zvjezdano-nebo',
            name: 'Ugradnja zvjezdanog neba',
            icon: '✨',
            description: 'Luksuzna ugradnja LED zvjezdanog neba u strop vozila. Odaberite broj zvjezdica (100-1000).',
            sellingPoints: [
                'Premium LED tehnologija',
                'Prilagođeni dizajn',
                'Dugotrajnost',
                'Spektakularan efekt'
            ],
            images: ['/images/service-stars-1.jpg', '/images/service-stars-2.jpg']
        },
        {
            id: 'zatamnjivanje',
            name: 'Zatamnjivanje zadnjih stakala',
            icon: '🪟',
            description: 'Profesionalno zatamnjivanje stakala prema zakonskim propisima.',
            sellingPoints: [
                'Zakonski propisi',
                'UV zaštita',
                'Estetski izgled',
                'Povećana privatnost'
            ],
            images: ['/images/service-tint-1.jpg', '/images/service-tint-2.jpg']
        },
        {
            id: 'mapiranje',
            name: 'Mapiranje vozila',
            icon: '💻',
            description: 'Profesionalno mapiranje i optimizacija performansi vašeg vozila.',
            sellingPoints: [
                'Povećane performanse',
                'Bolja ekonomičnost',
                'Sigurno mapiranje',
                'Garancija na uslugu'
            ],
            images: ['/images/service-mapping-1.jpg', '/images/service-mapping-2.jpg']
        }
    ],

    // Reviews data
    reviews: [
        {
            id: 1,
            company: 'Maminjo',
            logo: '/images/review-maminjo.png',
            rating: 5,
            text: 'Odličan servis! Profesionalno i brzo obavljen posao. Preporučujem!',
            author: 'Maminjo'
        },
        {
            id: 2,
            company: 'Luxe Rent',
            logo: '/images/review-luxerent.png',
            rating: 5,
            text: 'Koristimo njihove usluge za cijelu flotu. Uvijek pouzdani i kvalitetni.',
            author: 'Luxe Rent'
        }
    ],

    // FAQ data
    faq: [
        {
            question: 'Koliko traje ugradnja pojaseva?',
            answer: 'Ugradnja pojaseva obično traje 2-4 sata, ovisno o modelu vozila i broju pojaseva.'
        },
        {
            question: 'Mogu li donijeti vlastite pojaseve?',
            answer: 'Da, možete donijeti vlastite pojaseve ili čak rastavljeni sustav. Naši stručnjaci će ih profesionalno ugraditi.'
        },
        {
            question: 'Koliko zvjezdica mogu odabrati za zvjezdano nebo?',
            answer: 'Možete odabrati između 100 i 1000 zvjezdica, ovisno o vašim preferencijama i veličini stropa vozila.'
        },
        {
            question: 'Je li zatamnjivanje stakala zakonito?',
            answer: 'Da, naše zatamnjivanje je u skladu sa zakonskim propisima. Prednja stakla ostaju nezatamnjena.'
        },
        {
            question: 'Što je mapiranje vozila?',
            answer: 'Mapiranje je proces optimizacije softvera upravljačke jedinice motora za poboljšanje performansi i ekonomičnosti.'
        },
        {
            question: 'Imate li garanciju na usluge?',
            answer: 'Da, sve naše usluge dolaze s garancijom. Detalji ovise o vrsti usluge.'
        },
        {
            question: 'Trebam li naručiti termin unaprijed?',
            answer: 'Preporučujemo rezervaciju termina kako bismo osigurali dostupnost i najbolju uslugu.'
        },
        {
            question: 'Koliko košta ugradnja pojaseva?',
            answer: 'Cijena ovisi o modelu vozila i broju pojaseva. Kontaktirajte nas za točnu ponudu.'
        },
        {
            question: 'Radite li vikendom?',
            answer: 'Radimo od ponedjeljka do petka. Za hitne slučajeve, kontaktirajte nas.'
        },
        {
            question: 'Gdje se nalazite?',
            answer: 'Nalazimo se na adresi Vranplaninska ulica 1, Zagreb.'
        }
    ],

    // Booking state
    booking: {
        service: null,
        vehicle: {},
        date: null,
        time: null,
        customer: {}
    },

    // Reservations (admin)
    reservations: [],

    // Methods
    saveBooking(bookingData) {
        const reservations = this.getReservations();
        const newReservation = {
            id: Date.now(),
            ...bookingData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        reservations.push(newReservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        return newReservation;
    },

    getReservations() {
        const stored = localStorage.getItem('reservations');
        return stored ? JSON.parse(stored) : [];
    },

    updateReservationStatus(id, status) {
        const reservations = this.getReservations();
        const index = reservations.findIndex(r => r.id === id);
        if (index !== -1) {
            reservations[index].status = status;
            localStorage.setItem('reservations', JSON.stringify(reservations));
        }
    },

    getReviews() {
        const stored = localStorage.getItem('reviews');
        return stored ? JSON.parse(stored) : this.reviews;
    },

    saveReview(review) {
        const reviews = this.getReviews();
        if (review.id) {
            // Update existing
            const index = reviews.findIndex(r => r.id === review.id);
            if (index !== -1) {
                reviews[index] = review;
            }
        } else {
            // Add new
            review.id = Date.now();
            reviews.push(review);
        }
        localStorage.setItem('reviews', JSON.stringify(reviews));
        return review;
    },

    deleteReview(id) {
        const reviews = this.getReviews();
        const filtered = reviews.filter(r => r.id !== id);
        localStorage.setItem('reviews', JSON.stringify(filtered));
    },

    // Calendar availability (mock data)
    getCalendarData(year, month) {
        // Mock data - in real app, this would come from backend
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const availability = {};

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();

            // Weekend = unavailable
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                availability[day] = 'unavailable';
            } else {
                // Random availability for demo
                const rand = Math.random();
                if (rand > 0.7) availability[day] = 'unavailable';
                else if (rand > 0.4) availability[day] = 'almost-full';
                else availability[day] = 'available';
            }
        }

        return availability;
    },

    getTimeSlots(date) {
        // Mock time slots
        return [
            { time: '09:00', available: true },
            { time: '10:30', available: true },
            { time: '12:00', available: false },
            { time: '13:30', available: true },
            { time: '15:00', available: true },
            { time: '16:30', available: false }
        ];
    }
};
