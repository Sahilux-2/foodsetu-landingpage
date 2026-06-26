document.addEventListener('DOMContentLoaded', () => {
    // --- HEADER SCROLL EFFECT ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE MENU TOGGLE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('navigation-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Toggle icon between bars and times (close)
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- LIVE SIMULATOR LOGIC (HERO SECTION) ---
    const simDonorName = document.getElementById('sim-donor-name');
    const simFoodDesc = document.getElementById('sim-food-desc');
    const simStatus = document.getElementById('sim-status');
    const simNgoNode = document.getElementById('sim-ngo');
    const simNgoName = document.getElementById('sim-ngo-name');
    const simNgoAction = document.getElementById('sim-ngo-action');
    const simLine = document.querySelector('.sim-line');

    const donations = [
        {
            donor: "IIT Bombay Mess",
            food: "150 Meals Available",
            ngo: "Robin Hood Army",
            action: "Pickup Confirmed"
        },
        {
            donor: "Taj Hotel Caterers",
            food: "50kg Excess Buffet",
            ngo: "Feeding India",
            action: "Volunteer Assigned"
        },
        {
            donor: "Tech Event Cafeteria",
            food: "200 Snack Boxes",
            ngo: "No Food Waste",
            action: "En Route"
        }
    ];

    let currentSim = 0;

    function runSimulator() {
        if (!simDonorName) return; // Guard if not on page

        const data = donations[currentSim];
        
        // Step 1: Initial state (Searching)
        simNgoNode.classList.remove('active');
        simNgoNode.classList.add('pending');
        simLine.classList.remove('active');
        
        simDonorName.textContent = data.donor;
        simFoodDesc.textContent = data.food;
        
        simStatus.textContent = "Searching Nearby NGOs...";
        simStatus.style.color = "var(--color-secondary)";
        
        simNgoName.textContent = "Awaiting Match";
        simNgoAction.textContent = "...";

        // Step 2: Match Found
        setTimeout(() => {
            simStatus.textContent = "Match Found!";
            simStatus.style.color = "var(--accent-primary)";
            simLine.classList.add('active');
            
            simNgoNode.classList.remove('pending');
            simNgoNode.classList.add('active');
            
            simNgoName.textContent = data.ngo;
            simNgoAction.textContent = "Accepting Donation...";
            
            // Step 3: Action Confirmed
            setTimeout(() => {
                simNgoAction.textContent = data.action;
                
                // Step 4: Reset and next
                setTimeout(() => {
                    currentSim = (currentSim + 1) % donations.length;
                    runSimulator();
                }, 3000);
                
            }, 1500);
            
        }, 2000);
    }

    // Start simulator
    setTimeout(runSimulator, 1000);

    // --- TIMELINE SCROLL LOGIC (HOW IT WORKS SECTION) ---
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineProgress = document.getElementById('timeline-progress');
    
    function updateTimeline() {
        if (!timelineProgress || timelineSteps.length === 0) return;
        
        const timelineContainer = document.querySelector('.how-it-works-section');
        if (!timelineContainer) return;

        const scrollPosition = window.scrollY + window.innerHeight * 0.7;
        let activeIndex = -1;

        timelineSteps.forEach((step, index) => {
            // Need absolute Y offset relative to document
            const rect = step.getBoundingClientRect();
            const stepAbsTop = rect.top + window.scrollY;
            
            if (scrollPosition > stepAbsTop) {
                step.classList.add('active');
                activeIndex = index;
            } else {
                step.classList.remove('active');
            }
        });

        // Update progress bar height based on the active index
        if (activeIndex >= 0) {
            const activeStep = timelineSteps[activeIndex];
            // Get relative top inside the timeline line
            const progressHeight = activeStep.offsetTop + 22; // 22px to center of dot
            const totalHeight = timelineProgress.parentElement.clientHeight;
            const percentage = Math.min((progressHeight / totalHeight) * 100, 100);
            timelineProgress.style.height = `${percentage}%`;
        } else {
            timelineProgress.style.height = '0%';
        }
    }

    window.addEventListener('scroll', updateTimeline);
    // Initial check
    setTimeout(updateTimeline, 500);

    // --- STAKEHOLDER TABS LOGIC (BENEFITS SECTION) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const benefitsContents = document.querySelectorAll('.benefits-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            benefitsContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // --- DEMO SIMULATOR LOGIC (SECTION 5) ---
    const btnPlaceOrder = document.getElementById('btn-place-order');
    const demoSuccessMsg = document.getElementById('demo-success-msg');
    
    const checkoutHeader = document.getElementById('checkout-header-view');
    const checkoutBody = document.getElementById('checkout-body-view');
    const checkoutFooter = document.getElementById('checkout-footer-view');
    
    const ngoEmpty = document.getElementById('ngo-empty');
    const ngoAlert = document.getElementById('ngo-alert');
    const ngoAccepted = document.getElementById('ngo-accepted');
    
    const alertFoodType = document.getElementById('alert-food-type');
    const alertQuantity = document.getElementById('alert-quantity');
    const alertLocation = document.getElementById('alert-location');
    
    const btnAccept = document.getElementById('btn-accept');
    const btnDecline = document.getElementById('btn-decline');

    if (btnPlaceOrder) {
        // Handle plus/minus buttons interactively
        const counters = document.querySelectorAll('.counter');
        const subTotalEl = document.getElementById('sub-total');
        const totalAmountEl = document.getElementById('total-amount');

        counters.forEach(counter => {
            const btnMinus = counter.querySelector('.btn-minus');
            const btnPlus = counter.querySelector('.btn-plus');
            const countSpan = counter.querySelector('.count');
            
            btnMinus.addEventListener('click', () => {
                let count = parseInt(countSpan.textContent);
                if (count > 0) {
                    countSpan.textContent = count - 1;
                    updateTotals();
                }
            });
            
            btnPlus.addEventListener('click', () => {
                let count = parseInt(countSpan.textContent);
                // Hardcode limit logic loosely
                countSpan.textContent = count + 1;
                updateTotals();
            });
        });

        function updateTotals() {
            let totalKg = 0;
            document.querySelectorAll('.count').forEach(span => {
                totalKg += parseInt(span.textContent);
            });
            
            const subTotal = totalKg * 10;
            const deliveryFee = 100;
            
            subTotalEl.textContent = `Rs. ${subTotal.toFixed(2)}`;
            totalAmountEl.textContent = `Rs. ${subTotal + deliveryFee}`;
        }

        btnPlaceOrder.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get form values for alert
            let totalKg = 0;
            document.querySelectorAll('.count').forEach(span => {
                totalKg += parseInt(span.textContent);
            });
            const location = "GGSIPU, Vishwas Nagar";
            
            // Show success on donor screen
            if (checkoutHeader) checkoutHeader.classList.add('hidden');
            if (checkoutBody) checkoutBody.classList.add('hidden');
            if (checkoutFooter) checkoutFooter.classList.add('hidden');
            demoSuccessMsg.classList.remove('hidden');
            
            // Simulate network delay then show alert on NGO screen
            setTimeout(() => {
                ngoEmpty.classList.add('hidden');
                
                alertFoodType.textContent = "Mixed Order";
                alertQuantity.textContent = totalKg + " kg";
                alertLocation.textContent = location;
                
                ngoAlert.classList.remove('hidden');
            }, 1500);
        });

        btnAccept.addEventListener('click', () => {
            ngoAlert.classList.add('hidden');
            ngoAccepted.classList.remove('hidden');
            
            setTimeout(resetDemo, 4000);
        });
        
        btnDecline.addEventListener('click', () => {
            ngoAlert.classList.add('hidden');
            ngoEmpty.classList.remove('hidden');
            
            resetDemo();
        });

        function resetDemo() {
            if (checkoutHeader) checkoutHeader.classList.remove('hidden');
            if (checkoutBody) checkoutBody.classList.remove('hidden');
            if (checkoutFooter) checkoutFooter.classList.remove('hidden');
            demoSuccessMsg.classList.add('hidden');
            
            ngoEmpty.classList.remove('hidden');
            ngoAlert.classList.add('hidden');
            ngoAccepted.classList.add('hidden');
        }
    }
});
