import { supabase } from './supabase.js';

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

    // Global settings
    maxReservations: 4,

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
    async saveBooking(bookingData) {
        const { supabase } = await import('./supabase.js');

        const newReservation = {
            service_id: bookingData.service_id,
            service_name: bookingData.service_name || this.services.find(s => s.id === bookingData.service_id)?.name,
            marka: bookingData.marka,
            model: bookingData.model,
            godina: bookingData.godina,
            broj_pojaseva: bookingData.broj_pojaseva ? parseInt(bookingData.broj_pojaseva) : null,
            vlastiti_pojasevi: bookingData.vlastiti_pojasevi || false,
            broj_zvjezdica: bookingData.broj_zvjezdica ? parseInt(bookingData.broj_zvjezdica) : null,
            napomena: bookingData.napomena || null,
            appointment_date: bookingData.appointment_date,
            appointment_time: bookingData.appointment_time,
            ime: bookingData.ime,
            prezime: bookingData.prezime,
            email: bookingData.email,
            telefon: bookingData.telefon,
            adresa: bookingData.adresa || null,
            status: 'pending',
            is_manual_entry: bookingData.is_manual_entry || false
        };

        const { data, error } = await supabase
            .from('bookings')
            .insert([newReservation])
            .select();

        if (error) {
            console.error('Error saving booking:', error);
            throw error;
        }

        return data[0];
    },

    async getReservations() {
        const { supabase } = await import('./supabase.js');

        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching reservations:', error);
            return [];
        }

        return data || [];
    },

    async updateReservationStatus(id, status) {
        const { supabase } = await import('./supabase.js');

        const { error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating reservation:', error);
            throw error;
        }
    },

    // Service Configuration
    async fetchServiceConfig() {
        const { supabase } = await import('./supabase.js');

        const { data, error } = await supabase
            .from('services')
            .select('*');

        if (error) {
            console.warn('Error fetching service config:', error);
            return;
        }

        if (data && data.length > 0) {
            // Check for global config
            const globalConfig = data.find(c => c.id === 'global_config');
            if (globalConfig) {
                this.maxReservations = globalConfig.duration_minutes || 4;
            }

            // Merge config into local state
            this.services = this.services.map(service => {
                const config = data.find(c => c.id === service.id);
                if (config) {
                    return {
                        ...service,
                        duration: config.duration_minutes,
                        durationPerUnit: config.duration_per_unit_minutes,
                        durationRastavljeni: config.duration_rastavljeni_minutes
                    };
                }
                return service;
            });
        }
        return this.services;
    },

    async updateServiceConfig(id, config) {
        const { supabase } = await import('./supabase.js');

        const { error } = await supabase
            .from('services')
            .upsert({
                id,
                name: 'Service Config', // Default for new rows
                icon: '⚙️',            // Default for new rows
                description: 'Config',  // Default for new rows
                ...config,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Update Service Config Error:', JSON.stringify(error, null, 2));
            throw error;
        }

        // Refresh local state
        await this.fetchServiceConfig();
    },

    // Reviews
    async getReviews() {
        const { supabase } = await import('./supabase.js');

        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('is_approved', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching reviews:', error);
            return [];
        }

        return data || [];
    },

    async saveReview(review) {
        const { supabase } = await import('./supabase.js');

        // Check if admin
        const { data: { user } } = await supabase.auth.getUser();
        const isAdmin = user?.user_metadata?.role === 'admin';

        const { error } = await supabase
            .from('reviews')
            .insert([{
                ...review,
                is_approved: isAdmin // Auto-approve if admin
            }]);

        if (error) throw error;
    },

    async deleteReview(id) {
        const { supabase } = await import('./supabase.js');

        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async uploadReviewImage(file) {
        const { supabase } = await import('./supabase.js');

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('review-images')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('review-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    },

    // Calendar availability
    async getCalendarAvailability(year, month) {
        const { supabase } = await import('./supabase.js');

        // Ensure config is loaded (for maxReservations)
        await this.fetchServiceConfig();

        // Calculate start and end of the month
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        // Format for Supabase query
        const startStr = startDate.toISOString().split('T')[0];
        const endStr = endDate.toISOString().split('T')[0];

        // Fetch all reservations for this month
        const { data: reservations, error } = await supabase
            .from('bookings')
            .select('appointment_date, status')
            .gte('appointment_date', startStr)
            .lte('appointment_date', endStr)
            .neq('status', 'cancelled'); // Don't count cancelled

        if (error) {
            console.error('Error fetching availability:', error);
            return {};
        }

        const counts = {};
        if (reservations) {
            reservations.forEach(r => {
                const date = r.appointment_date;
                counts[date] = (counts[date] || 0) + 1;
            });
        }

        const availability = {};
        const daysInMonth = endDate.getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayOfWeek = date.getDay();

            // Weekend = unavailable
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                availability[day] = { status: 'unavailable', count: 0 };
            } else {
                const count = counts[dateStr] || 0;
                let status = 'available';

                if (count >= state.maxReservations) {
                    status = 'unavailable';
                } else if (count >= (state.maxReservations - 1)) {
                    status = 'almost-full';
                }

                availability[day] = { status, count };
            }
        }

        return availability;
    },

    async getReservationsByDate(date) {
        const { supabase } = await import('./supabase.js');

        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('appointment_date', date)
            .order('appointment_time', { ascending: true });

        if (error) {
            console.error('Error fetching daily reservations:', error);
            return [];
        }

        return data || [];
    },

    async getTimeSlots(date) {
        // First check if the day is already full based on maxReservations
        // We'll keep the daily max check as a safety net, but revert to standard slots
        const { supabase } = await import('./supabase.js');
        const { count, error } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('appointment_date', date)
            .neq('status', 'cancelled');

        // Default max is 4 if not configured
        const maxReservations = this.maxReservations || 4;
        const isDayFull = error ? false : (count >= maxReservations);

        // Standard fixed slots as requested
        return [
            { time: '10:00', available: !isDayFull },
            { time: '10:30', available: !isDayFull },
            { time: '11:00', available: !isDayFull },
            { time: '11:30', available: !isDayFull },
            { time: '14:00', available: !isDayFull },
            { time: '14:30', available: !isDayFull },
            { time: '15:00', available: !isDayFull },
            { time: '15:30', available: !isDayFull }
        ];
    }
};
