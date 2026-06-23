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
});
