/**
 * RICHINGS PARK SPORTS CLUB (RPSC) - PREMIUM INTERACTION CONTROLLER
 * Fully responsive, optimized, and rich user-experience logic.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. GLOBAL INTERACTIVE ELEMENTS
    // ==========================================================================

    // Custom Cursor Ambient Glow (Desktop Only)
    const cursorGlow = document.getElementById('cursorGlow');
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // Shrinking Glassmorphic Navbar on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close mobile nav when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // Smooth active navigation indicator updating on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================================================
    // 2. DINING CONCEPT TAB SWITCHER (1920 KITCHEN & PLAYERS BAR)
    // ==========================================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const diningPanes = document.querySelectorAll('.dining-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Toggle active classes on buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Fade pane contents
            diningPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === `pane-${targetTab}`) {
                    // Let rendering occur with delay to ensure smooth CSS animations
                    setTimeout(() => {
                        pane.classList.add('active');
                    }, 50);
                }
            });
        });
    });


    // ==========================================================================
    // 3. SPORTS FACILITY COGNITIVE FILTERING GRID
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sportCards = document.querySelectorAll('.sport-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Toggle active filter button style
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Hide/Show cards with anim transitions
            sportCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // ==========================================================================
    // 4. ELITE SPECIFICATION DETAIL DIALOGS (MODALS)
    // ==========================================================================
    const specModal = document.getElementById('specModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBookBtn = document.getElementById('modalBookBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const viewSpecBtns = document.querySelectorAll('.view-spec-btn');

    // Sports specs database
    const sportsSpecs = {
        'Tennis': {
            subtitle: 'CHAMPIONSHIP GRASS & HARDCOURTS',
            description: 'Our tennis complex boasts premium grass and high-bounce hardcourts built to Professional Standards. Supported by the Lawn Tennis Association (LTA).',
            specs: {
                'Total Courts': '4 Bentgrass, 6 All-Weather Acrylic Acrylic',
                'Lighting': 'Luminator LED 500 Lux Night Floodlights',
                'Surface Tech': 'Shock-absorbing underlying rubber padding',
                'Equipment': 'Head Rackets & Dunlop Balls available for hire',
                'Coaching': 'Private LTA Pro coaching clinics',
                'Peak Cost': '£15.00 / Hour'
            }
        },
        'Football': {
            subtitle: '3G PRO-LEVEL TURF FIELDS',
            description: 'Top-tier synthetic turf fields optimized for speed and dynamic lateral traction. Designed to minimize impact stresses and optimize competitive play.',
            specs: {
                'Field Layouts': '5-a-side cage pitches & Full 11-a-side match arena',
                'Turf Tech': 'Pro-Weave 3G Shockpad Underlayment',
                'Lighting': 'Championship-grade stadium LED grids',
                'Facility': 'Private secure team locker rooms with saunas',
                'Academy': 'Youth Academy training slots available',
                'Peak Cost': '£45.00 / Hour'
            }
        },
        'Bowls': {
            subtitle: 'TRADITIONAL CROWN GREEN BOWLS',
            description: 'A serene yet strategic experience on one of the finest, most level manicured lawn bowls greens in South Bucks.',
            specs: {
                'Green Size': 'Six standard tournament rinks',
                'Turf Type': 'Immaculate creeping bentgrass',
                'Equipment': 'Bespoke Henselite bowls set in all sizes',
                'Socials': 'Weekly club competitive tournaments & teas',
                'Aesthetics': 'Historic oak pavilion borders',
                'Peak Cost': '£8.00 / Hour'
            }
        },
        'Pickleball': {
            subtitle: 'DYNAMIC HIGH-GROWTH HARDCOURTS',
            description: 'Dive into the fastest growing racket sport worldwide! Featuring professional court overlays, high-friction surfaces, and premium court nets.',
            specs: {
                'Courts': '4 dedicated custom courts',
                'Surface': 'Acrylic anti-skid high contrast grit',
                'Gear': 'Selkirk paddles & specialized polymer balls',
                'Coaching': 'Group introductory lessons every Saturday',
                'Vibe': 'High energy, community social tournaments',
                'Peak Cost': '£12.00 / Hour'
            }
        },
        'Padel': {
            subtitle: 'PANORAMIC DELUXE STRUCTURAL GLASS COURTS',
            description: 'Play with maximum bounce and rebound on our state-of-the-art panoramic glass padel courts, offering perfect visibility and acoustics.',
            specs: {
                'Courts': '3 Deluxe open-air panoramic enclosures',
                'Wall Tech': '12mm Tempered Structural Glass walls',
                'Turf Tech': 'Premium textured monofilament turf',
                'Lighting': 'Anti-glare projection LED posts',
                'Equipment': 'Babolat paddles & high-durability balls',
                'Peak Cost': '£24.00 / Hour'
            }
        },
        'Cricket Nets': {
            subtitle: 'HIGH-PERFORMANCE BATTING NETS',
            description: 'Perfect your strokes and bowling pacing under real turf-rebound conditions in our high-performance batting nets.',
            specs: {
                'Lanes': '3 Private enclosed turf batting lanes',
                'Surface': 'Fibre-reinforced synthetic woven turf carpet',
                'Equipment': 'Bolo Automatic bowling feeders, bowling machines',
                'Analysis': 'High-speed motion video analysis cameras',
                'Protection': 'Acoustic nets & professional safety frames',
                'Peak Cost': '£18.00 / Hour'
            }
        },
        'Kho Kho': {
            subtitle: 'TRADITIONAL ATHLETIC AGILITY ARENA',
            description: 'Test your reaction times and speed coordination on our professional-grade Kho Kho court setup, featuring natural grass and robust clay markers.',
            specs: {
                'Court Style': 'Full size tournament field',
                'Surface': 'High agility clay and natural dry grass',
                'Coaching': 'Agility speed workshops and fitness sessions',
                'Poles': 'Premium polished teak wood chaser poles',
                'Leagues': 'Local community agility championship cups',
                'Peak Cost': '£10.00 / Hour'
            }
        }
    };

    viewSpecBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sportKey = btn.getAttribute('data-sport');
            const data = sportsSpecs[sportKey];

            if (data) {
                document.getElementById('modalTag').innerText = data.subtitle;
                modalTitle.innerText = `${sportKey} Facilities`;
                
                let bodyHtml = `<p>${data.description}</p>`;
                bodyHtml += `<h4>Facility Specifications</h4>`;
                bodyHtml += `<div class="spec-list-grid">`;
                for (const [key, val] of Object.entries(data.specs)) {
                    bodyHtml += `
                        <div class="spec-item">
                            <strong>${key}:</strong><br>
                            <span>${val}</span>
                        </div>
                    `;
                }
                bodyHtml += `</div>`;
                
                modalBody.innerHTML = bodyHtml;
                specModal.classList.add('active');

                // Bind book button in modal to direct user to bookings
                modalBookBtn.href = `#bookings`;
                modalBookBtn.setAttribute('data-target-facility', sportKey);
            }
        });
    });

    // Direct booking trigger inside modal
    modalBookBtn.addEventListener('click', () => {
        specModal.classList.remove('active');
        const targetFac = modalBookBtn.getAttribute('data-target-facility');
        if (targetFac) {
            // Find option in select
            const selectEl = document.getElementById('bookingFacility');
            for(let option of selectEl.options) {
                if(option.value.includes(targetFac)) {
                    selectEl.value = option.value;
                    // Trigger custom change event to recalculate price
                    selectEl.dispatchEvent(new Event('change'));
                    break;
                }
            }
        }
    });

    closeModalBtn.addEventListener('click', () => {
        specModal.classList.remove('active');
    });

    // Close modal on background click
    window.addEventListener('click', (e) => {
        if (e.target === specModal) {
            specModal.classList.remove('active');
        }
    });


    // ==========================================================================
    // 5. RESTAURANT & BAR MENUS DIALOGS
    // ==========================================================================
    const menuModal = document.getElementById('menuModal');
    const drinksModal = document.getElementById('drinksModal');
    const toggleMenuBtn = document.getElementById('toggleMenuBtn');
    const toggleDrinksBtn = document.getElementById('toggleDrinksBtn');

    if (toggleMenuBtn) {
        toggleMenuBtn.addEventListener('click', () => menuModal.classList.add('active'));
    }
    if (toggleDrinksBtn) {
        toggleDrinksBtn.addEventListener('click', () => drinksModal.classList.add('active'));
    }

    document.getElementById('closeDinnerModal').addEventListener('click', () => menuModal.classList.remove('active'));
    document.getElementById('closeDrinksModal').addEventListener('click', () => drinksModal.classList.remove('active'));

    window.addEventListener('click', (e) => {
        if (e.target === menuModal) menuModal.classList.remove('active');
        if (e.target === drinksModal) drinksModal.classList.remove('active');
    });


    // ==========================================================================
    // 6. DYNAMIC KIDS CINEMA MOVIE SCHEDULER (THE PLAZA)
    // ==========================================================================
    const kidsMovies = [
        { time: '11:00', name: 'Zootropolis (3D)', status: 'Seats Open', class: 'bg-green' },
        { time: '13:15', name: 'Finding Nemo (Remastered)', status: 'Seats Open', class: 'bg-green' },
        { time: '15:30', name: 'Toy Story 4', status: 'Almost Full', class: 'bg-orange' },
        { time: '17:45', name: 'Inside Out 2', status: 'Almost Full', class: 'bg-orange' },
        { time: '20:00', name: 'Moana 2', status: 'Seats Open', class: 'bg-green' }
    ];

    function populateCinemaListings() {
        const movieList = document.getElementById('movieList');
        if (!movieList) return;

        // Render movies
        let listHtml = '';
        kidsMovies.forEach(movie => {
            listHtml += `
                <div class="movie-item">
                    <div>
                        <span class="movie-time">${movie.time}</span>
                        <span class="movie-name">${movie.name}</span>
                    </div>
                    <span class="movie-badge ${movie.class}">${movie.status}</span>
                </div>
            `;
        });
        movieList.innerHTML = listHtml;
    }

    populateCinemaListings();


    // ==========================================================================
    // 7. REACTIVE CONCIERGE BOOKING SYSTEM & PRICING CONTEXT
    // ==========================================================================
    const bookingForm = document.getElementById('rpscBookingForm');
    const bookingFacility = document.getElementById('bookingFacility');
    const bookingDate = document.getElementById('bookingDate');
    const slotsGrid = document.getElementById('slotsGrid');
    const membershipSelect = document.getElementById('userMembership');
    const equipmentSelect = document.getElementById('equipmentRental');
    
    const pricingPanel = document.getElementById('pricingPanel');
    const baseRateVal = document.getElementById('baseRateVal');
    const discountVal = document.getElementById('discountVal');
    const equipVal = document.getElementById('equipVal');
    const totalPriceVal = document.getElementById('totalPriceVal');
    const submitBookingBtn = document.getElementById('submitBookingBtn');

    // Set minimum date picker values to Today
    const today = new Date().toISOString().split('T')[0];
    if (bookingDate) {
        bookingDate.min = today;
        bookingDate.value = today;
    }

    // Facility rates config database
    const facilityRates = {
        // Culinary
        '1920 Kitchen (Restaurant)': { baseRate: 0, requireSlot: true, costLabel: 'Restaurant Table (Free Bookings)' },
        'The Players (Sports Bar)': { baseRate: 0, requireSlot: true, costLabel: 'Bar Lounge Space (Free Bookings)' },
        // Health
        'The Retreat (Wellness Centre)': { baseRate: 60, requireSlot: true, costLabel: 'Holistic Spa Session (1 Hr)' },
        'The Recovery (Athlete Area)': { baseRate: 45, requireSlot: true, costLabel: 'Metabolic Cryo-Recovery Session' },
        'Park Gym (Full Access)': { baseRate: 20, requireSlot: false, costLabel: 'Elite Facility Day Pass' },
        // Sports
        'Tennis Court': { baseRate: 15, requireSlot: true, costLabel: 'Floodlit Tennis Court (1 Hr)' },
        'Football Pitch': { baseRate: 45, requireSlot: true, costLabel: 'Tournament 3G Football Arena (1 Hr)' },
        'Bowling Green': { baseRate: 8, requireSlot: true, costLabel: 'Bentgrass Bowls Rink (1 Hr)' },
        'Pickleball Court': { baseRate: 12, requireSlot: true, costLabel: 'Anti-Skid Pickleball Court (1 Hr)' },
        'Padel Court': { baseRate: 24, requireSlot: true, costLabel: 'Deluxe Panoramic Padel Court (1 Hr)' },
        'Cricket Nets': { baseRate: 18, requireSlot: true, costLabel: 'High-Performance Batting Lane (1 Hr)' },
        'Kho Kho Arena': { baseRate: 10, requireSlot: true, costLabel: 'Agility Kho Kho Arena (1 Hr)' },
        // Social
        'The Balcony (Private Event)': { baseRate: 250, requireSlot: false, costLabel: 'Balcony Events Suite Reservation (Half Day)' },
        'The Plaza (Kids Cinema)': { baseRate: 0, requireSlot: true, costLabel: 'Kids Cinema Pass (Free Guest Access)' }
    };

    let selectedSlot = '';

    // Handle change of Facility or Date to populate Slots
    function handleFacilityDateChange() {
        const facility = bookingFacility.value;
        const date = bookingDate.value;

        if (!facility || !date) {
            slotsGrid.innerHTML = `<div class="slot-pill disabled">Select date & facility first</div>`;
            submitBookingBtn.disabled = true;
            pricingPanel.style.display = 'none';
            return;
        }

        const facilityData = facilityRates[facility];

        // If facility does not require slot selection
        if (!facilityData.requireSlot) {
            slotsGrid.innerHTML = `
                <div class="slot-pill active" style="grid-column: 1 / -1; cursor: default;">
                    Standard Day Pass Access (Valid all day)
                </div>
            `;
            selectedSlot = 'Day Access';
            calculatePricing();
            submitBookingBtn.disabled = false;
            return;
        }

        // Generate mock standard time slots
        const slots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM', '09:00 PM'];
        slotsGrid.innerHTML = '';
        selectedSlot = '';
        submitBookingBtn.disabled = true;

        slots.forEach(slot => {
            // Create a randomized status (Booked / Available / Popular) to feel fully dynamic
            const random = Math.random();
            let isBooked = random < 0.25;
            let isPopular = random > 0.75;
            
            const slotPill = document.createElement('div');
            slotPill.classList.add('slot-pill');
            
            if (isBooked) {
                slotPill.classList.add('booked');
                slotPill.innerText = `${slot} (Booked)`;
            } else if (isPopular) {
                slotPill.innerText = `${slot} (Popular)`;
            } else {
                slotPill.innerText = slot;
            }

            if (!isBooked) {
                slotPill.addEventListener('click', () => {
                    // Highlight selected slot
                    document.querySelectorAll('.slot-pill').forEach(pill => pill.classList.remove('active'));
                    slotPill.classList.add('active');
                    selectedSlot = slot;
                    calculatePricing();
                    submitBookingBtn.disabled = false;
                });
            }

            slotsGrid.appendChild(slotPill);
        });

        calculatePricing();
    }

    // Pricing calculation logic
    function calculatePricing() {
        const facility = bookingFacility.value;
        if (!facility) return;

        const data = facilityRates[facility];
        const baseRate = data.baseRate;

        // Membership discounts
        const membership = membershipSelect.value;
        let discountPercent = 0;
        if (membership === 'club') discountPercent = 0.15;
        if (membership === 'gold') discountPercent = 0.30;

        const discountAmount = baseRate * discountPercent;

        // Equipment hire rates
        const equipment = equipmentSelect.value;
        let equipmentCost = 0;
        if (equipment === 'racket') equipmentCost = 10.00;
        if (equipment === 'full') equipmentCost = 25.00;

        // Calculation
        const total = baseRate - discountAmount + equipmentCost;

        // Update pricing view
        baseRateVal.innerText = `£${baseRate.toFixed(2)}`;
        discountVal.innerText = `-£${discountAmount.toFixed(2)}`;
        equipVal.innerText = `£${equipmentCost.toFixed(2)}`;
        totalPriceVal.innerText = `£${total.toFixed(2)}`;

        // Show pricing panel
        pricingPanel.style.display = 'block';
    }

    if (bookingFacility) {
        bookingFacility.addEventListener('change', handleFacilityDateChange);
        bookingDate.addEventListener('change', handleFacilityDateChange);
        membershipSelect.addEventListener('change', calculatePricing);
        equipmentSelect.addEventListener('change', calculatePricing);
    }

    // Direct booking triggers located across the website
    const miniBookTriggers = document.querySelectorAll('.mini-book-trigger');
    miniBookTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const facilityName = trigger.getAttribute('data-facility');
            if (facilityName && bookingFacility) {
                // Pre-populate select box
                for(let opt of bookingFacility.options) {
                    if(opt.value === facilityName || opt.value.includes(facilityName)) {
                        bookingFacility.value = opt.value;
                        bookingFacility.dispatchEvent(new Event('change'));
                        break;
                    }
                }
            }
        });
    });


    // ==========================================================================
    // 8. BOOKING RECEIPT INVOICE DIALOG
    // ==========================================================================
    const receiptModal = document.getElementById('receiptModal');
    const receiptBox = document.getElementById('receiptBox');
    const closeReceiptBtn = document.getElementById('closeReceiptBtn');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract details
            const facility = bookingFacility.value;
            const date = bookingDate.value;
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const membership = membershipSelect.options[membershipSelect.selectedIndex].text;
            const equipment = equipmentSelect.options[equipmentSelect.selectedIndex].text;
            const totalPrice = totalPriceVal.innerText;

            // Format calendar date
            const formattedDate = new Date(date).toLocaleDateString('en-GB', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });

            // Generate receipt details
            const bookingId = `RPSC-${Math.floor(100000 + Math.random() * 900000)}`;
            const receiptHtml = `
                <div class="receipt-row">
                    <span>Booking ID:</span>
                    <strong>${bookingId}</strong>
                </div>
                <div class="receipt-row">
                    <span>Member Name:</span>
                    <span>${name}</span>
                </div>
                <div class="receipt-row">
                    <span>Email Address:</span>
                    <span>${email}</span>
                </div>
                <div class="receipt-row">
                    <span>Selected Arena:</span>
                    <span>${facility}</span>
                </div>
                <div class="receipt-row">
                    <span>Date:</span>
                    <span>${formattedDate}</span>
                </div>
                <div class="receipt-row">
                    <span>Time Slot:</span>
                    <span>${selectedSlot}</span>
                </div>
                <div class="receipt-row">
                    <span>Membership:</span>
                    <span>${membership}</span>
                </div>
                <div class="receipt-row">
                    <span>Equipment Rental:</span>
                    <span>${equipment}</span>
                </div>
                <div class="receipt-row final-total">
                    <span>Total Amount Charged:</span>
                    <span>${totalPrice}</span>
                </div>
            `;

            receiptBox.innerHTML = receiptHtml;
            receiptModal.classList.add('active');
        });
    }

    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener('click', () => {
            receiptModal.classList.remove('active');
            bookingForm.reset();
            bookingDate.value = today;
            handleFacilityDateChange();
        });
    }


    // ==========================================================================
    // 9. DYNAMIC TESTIMONIALS SLIDER CONTROLLER
    // ==========================================================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const prevSlideBtn = document.getElementById('prevSlide');
    const nextSlideBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + testimonialCards.length) % testimonialCards.length;
        
        testimonialCards[currentSlide].classList.add('active');
        sliderDots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        prevSlideBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoSlide();
            });
        });

        // Autoplay Interval
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 7000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
    }

    // ==========================================================================
    // 10. RPSC VISUAL MASTERPIECE UPGRADE - ADDITIONAL MECHANICS
    // ==========================================================================

    // --- Scroll Progress Tracker ---
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }
    });

    // --- Dynamic Club Weather & Playability Engine ---
    function updateClubWeather() {
        const tempEl = document.getElementById('weatherTemp');
        const descEl = document.getElementById('weatherDesc');
        const statusEl = document.getElementById('playingStatus');
        const iconEl = document.getElementById('weatherIcon');
        
        if (!tempEl || !descEl || !statusEl) return;
        
        const now = new Date();
        const month = now.getMonth(); 
        const hour = now.getHours();
        
        let temp = 15;
        let desc = 'Sunny Sky';
        let iconSvg = 'sunny';
        let status = '🎾 Tennis: Ideal Conditions';
        
        // Generate seasonal temperature and conditions for Iver, UK
        if (month >= 4 && month <= 8) { // Summer/Spring (May-Sept)
            temp = Math.floor(16 + Math.random() * 6);
            if (hour < 8 || hour > 20) temp -= 6;
            
            const conds = [
                { desc: 'Clear Skies', status: '🎾 Tennis & Rackets: Ideal Conditions', icon: 'sunny' },
                { desc: 'Warm Sunshine', status: '🎾 Tennis & Padel: Ideal Play', icon: 'sunny' },
                { desc: 'Light Breeze', status: '⛳ Bowls: Perfect Green Speed', icon: 'wind' },
                { desc: 'Scattered Clouds', status: '⚽ Football: Excellent Pitch Playability', icon: 'cloudy' }
            ];
            const chosen = conds[Math.floor(Math.random() * conds.length)];
            desc = chosen.desc;
            status = chosen.status;
            iconSvg = chosen.icon;
        } else { // Winter/Autumn (Oct-Apr)
            temp = Math.floor(4 + Math.random() * 8);
            if (hour < 8 || hour > 18) temp -= 4;
            
            const conds = [
                { desc: 'Overcast Sky', status: '🎾 Tennis: Damp court, play with care', icon: 'cloudy' },
                { desc: 'Drizzle Rain', status: '⚽ Football: Playable, wet turf', icon: 'rain' },
                { desc: 'Mist Fog', status: '🎾 Tennis: Indoor & floodlit active', icon: 'cloudy' }
            ];
            const chosen = conds[Math.floor(Math.random() * conds.length)];
            desc = chosen.desc;
            status = chosen.status;
            iconSvg = chosen.icon;
        }
        
        tempEl.innerText = `${temp}°C`;
        descEl.innerText = desc;
        statusEl.innerText = status;
        
        // Dynamically adjust SVG elements based on generated weather state
        if (iconSvg === 'sunny') {
            iconEl.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        } else if (iconSvg === 'cloudy') {
            iconEl.innerHTML = '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>';
        } else if (iconSvg === 'rain') {
            iconEl.innerHTML = '<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>';
        } else { // wind
            iconEl.innerHTML = '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>';
        }
    }
    
    updateClubWeather();
    // Refresh weather details every 5 minutes
    setInterval(updateClubWeather, 300000);

    // --- 3D Mouse Tilt & Dynamic Glow Engine (Desktop Only) ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        const tiltCards = document.querySelectorAll('.tilt-card, .well-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                
                const width = rect.width;
                const height = rect.height;
                
                // Pct boundaries -0.5 to 0.5
                const xPct = (x / width) - 0.5;
                const yPct = (y / height) - 0.5;
                
                const maxRotate = 10; // degrees
                
                // Rotations mapped
                const rotateX = (-yPct * maxRotate).toFixed(2);
                const rotateY = (xPct * maxRotate).toFixed(2);
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Colored glow shadow calculations
                let glowColor = card.getAttribute('data-glow-color') || 'rgba(212, 175, 55, 0.15)';
                card.style.boxShadow = `0 20px 40px ${glowColor}, 0 8px 20px rgba(0, 0, 0, 0.4)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                
                let defaultShadow = card.classList.contains('active-card') 
                    ? '0 15px 40px rgba(0, 201, 167, 0.15)' 
                    : 'var(--shadow-intense)';
                card.style.boxShadow = defaultShadow;
            });
        });
    }

    // --- Holographic Digital Membership Card Controller ---
    const holoCard = document.getElementById('holoCard');
    const holoShine = document.getElementById('holoShine');
    const userNameInput = document.getElementById('userName');
    const userMembershipSelect = document.getElementById('userMembership');
    
    const holoCardholder = document.getElementById('holoCardholder');
    const holoTierText = document.getElementById('holoTier');
    
    // Connect input name changes to Cardholder name
    if (userNameInput && holoCardholder) {
        userNameInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            holoCardholder.innerText = val ? val.toUpperCase() : 'GUEST VISITOR';
        });
    }
    
    // Connect select memberships to Card Tiers
    if (userMembershipSelect && holoCard) {
        userMembershipSelect.addEventListener('change', (e) => {
            const tier = e.target.value;
            
            holoCard.classList.remove('bronze-tier', 'silver-tier', 'gold-tier');
            
            if (tier === 'visitor') {
                holoCard.classList.add('bronze-tier');
                if (holoTierText) holoTierText.innerText = 'BRONZE';
            } else if (tier === 'club') {
                holoCard.classList.add('silver-tier');
                if (holoTierText) holoTierText.innerText = 'SILVER';
            } else if (tier === 'gold') {
                holoCard.classList.add('gold-tier');
                if (holoTierText) holoTierText.innerText = 'GOLD';
            }
        });
    }
    
    // Drag/shine mechanics over digital credit card
    if (holoCard && holoShine && !isTouchDevice) {
        holoCard.addEventListener('mousemove', (e) => {
            const rect = holoCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const w = rect.width;
            const h = rect.height;
            
            const xPct = (x / w) - 0.5;
            const yPct = (y / h) - 0.5;
            
            const rX = (-yPct * 15).toFixed(2);
            const rY = (xPct * 15).toFixed(2);
            holoCard.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            const shineX = (x / w * 100).toFixed(2);
            const shineY = (y / h * 100).toFixed(2);
            holoShine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%)`;
        });
        
        holoCard.addEventListener('mouseleave', () => {
            holoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            holoShine.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 80%)';
        });
    }

});
