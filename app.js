// --- CROP SIMULATOR DATA CONFIGURATION ---
const cropData = {
    avocado: {
        image: "assets/avocado.png",
        farmerName: "Amara Vance",
        farmerLocation: "Sonoma Valley, CA",
        farmerImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
        harvestDate: "Harvested: Today, 5:00 AM",
        farmName: "Green Valley Orchards",
        temp: "Optimal 4°C",
        hotspots: {
            origin: { top: "25%", left: "35%" },
            temp: { top: "55%", left: "68%" }
        },
        traditional: {
            time: "5+ Days",
            middlemen: "4 Brokers",
            payout: "30%"
        },
        foodsetu: {
            time: "12 Hours",
            middlemen: "Direct (0)",
            payout: "85%"
        },
        stats: {
            payout: "85%",
            transit: "12 hrs",
            carbon: "-75%"
        }
    },
    tomatoes: {
        image: "assets/tomatoes.png",
        farmerName: "Rajesh Patel",
        farmerLocation: "Fresno County, CA",
        farmerImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
        harvestDate: "Harvested: Today, 6:30 AM",
        farmName: "Sun-Kissed Farms",
        temp: "Optimal 12°C",
        hotspots: {
            origin: { top: "40%", left: "55%" },
            temp: { top: "65%", left: "30%" }
        },
        traditional: {
            time: "6+ Days",
            middlemen: "5 Brokers",
            payout: "25%"
        },
        foodsetu: {
            time: "8 Hours",
            middlemen: "Direct (0)",
            payout: "88%"
        },
        stats: {
            payout: "88%",
            transit: "8 hrs",
            carbon: "-82%"
        }
    },
    honey: {
        image: "assets/honey.png",
        farmerName: "Elena Rostova",
        farmerLocation: "Oregon Apiaries, OR",
        farmerImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
        harvestDate: "Harvested: Yesterday, 4:00 PM",
        farmName: "Golden Bloom Apiary",
        temp: "Optimal 20°C",
        hotspots: {
            origin: { top: "30%", left: "45%" },
            temp: { top: "60%", left: "60%" }
        },
        traditional: {
            time: "10+ Days",
            middlemen: "3 Brokers",
            payout: "35%"
        },
        foodsetu: {
            time: "24 Hours",
            middlemen: "Direct (0)",
            payout: "90%"
        },
        stats: {
            payout: "90%",
            transit: "24 hrs",
            carbon: "-68%"
        }
    }
};

// --- DOM ELEMENTS ---
const tabs = document.querySelectorAll('.crop-tab');
const displayImg = document.getElementById('crop-display-img');
const farmerImg = document.getElementById('farmer-img');
const farmerName = document.getElementById('farmer-name');
const farmerLocation = document.getElementById('farmer-location');
const harvestDate = document.getElementById('harvest-date');

const hotspotOrigin = document.getElementById('hotspot-origin');
const tooltipFarmName = document.getElementById('tooltip-farm-name');

const hotspotTemp = document.getElementById('hotspot-temp');
const tooltipFarmTemp = document.getElementById('tooltip-farm-temp');

const tradTime = document.getElementById('trad-time');
const tradMiddlemen = document.getElementById('trad-middlemen');
const tradPayout = document.getElementById('trad-payout');

const setuTime = document.getElementById('setu-time');
const setuMiddlemen = document.getElementById('setu-middlemen');
const setuPayout = document.getElementById('setu-payout');

const statPayout = document.getElementById('stat-payout');
const statTransit = document.getElementById('stat-transit');
const statCarbon = document.getElementById('stat-carbon');

const ctaExplore = document.getElementById('cta-explore-fresh');
const ctaHowItWorks = document.getElementById('cta-how-it-works');
const btnHeaderCta = document.getElementById('btn-header-cta');
const logoLink = document.getElementById('logo-link');

// --- INTERACTIVE SIMULATOR LOGIC ---
function switchCrop(cropKey) {
    const data = cropData[cropKey];
    if (!data) return;

    // 1. Trigger micro-animations: fade out panel
    const visualPanel = document.querySelector('.crop-visual-panel');
    const comparisonPanel = document.querySelector('.supply-chain-comparison');
    const impactGrid = document.querySelector('.impact-metrics-grid');

    [visualPanel, comparisonPanel, impactGrid].forEach(el => {
        el.style.opacity = '0.3';
        el.style.transform = 'scale(0.98)';
        el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    });

    setTimeout(() => {
        // 2. Update Card Visual Details
        displayImg.src = data.image;
        displayImg.alt = `Fresh ${cropKey.charAt(0).toUpperCase() + cropKey.slice(1)}`;
        
        farmerImg.src = data.farmerImg;
        farmerName.textContent = data.farmerName;
        farmerLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.farmerLocation}`;
        harvestDate.textContent = data.harvestDate;

        // Tooltips & Hotspots Position
        tooltipFarmName.textContent = data.farmName;
        tooltipFarmTemp.textContent = data.temp;

        hotspotOrigin.style.top = data.hotspots.origin.top;
        hotspotOrigin.style.left = data.hotspots.origin.left;

        hotspotTemp.style.top = data.hotspots.temp.top;
        hotspotTemp.style.left = data.hotspots.temp.left;

        // 3. Update Supply Chain Comparison Route
        tradTime.textContent = data.traditional.time;
        tradMiddlemen.textContent = data.traditional.middlemen;
        tradPayout.textContent = data.traditional.payout;

        setuTime.textContent = data.foodsetu.time;
        setuMiddlemen.textContent = data.foodsetu.middlemen;
        setuPayout.textContent = data.foodsetu.payout;

        // 4. Update Stats Grid
        statPayout.textContent = data.stats.payout;
        statTransit.textContent = data.stats.transit;
        statCarbon.textContent = data.stats.carbon;

        // 5. Reset line glow animation
        const lineGlow = document.querySelector('.node-line-glow');
        if (lineGlow) {
            lineGlow.style.animation = 'none';
            // Trigger reflow to restart animation
            lineGlow.offsetHeight; 
            lineGlow.style.animation = null;
        }

        // 6. Fade back in
        [visualPanel, comparisonPanel, impactGrid].forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        });
    }, 250);
}

// Attach Event Listeners to Tabs
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        // Remove active class from other tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        const clickedTab = e.currentTarget;
        clickedTab.classList.add('active');
        
        // Switch content
        const crop = clickedTab.getAttribute('data-crop');
        switchCrop(crop);
    });
});

// --- HOVER / INTERACTIVE CTAs AND BUTTONS ---

// Primary CTA Interaction
ctaExplore.addEventListener('click', () => {
    createRippleEffect(ctaExplore);
    // Simulate navigation/action
    setTimeout(() => {
        alert("🌻 Welcome to FoodSetu! This CTA will load the interactive crop catalogue showing farms in your local area.");
    }, 150);
});

// Secondary CTA Interaction
ctaHowItWorks.addEventListener('click', () => {
    createRippleEffect(ctaHowItWorks);
    
    // Smooth scroll down slightly to focus on the simulator card
    const targetElement = document.querySelector('.hero-interactive');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Pulse the simulator card to draw attention
        targetElement.style.animation = 'pulse-focus 1.2s ease-in-out';
        setTimeout(() => {
            targetElement.style.animation = '';
        }, 1200);
    }
});

// Add dynamic CSS style block for focus anim if not already defined
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-focus {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(63, 184, 107, 0.4); }
        50% { transform: scale(1.03); box-shadow: 0 0 30px 10px rgba(63, 184, 107, 0.2); }
        100% { transform: scale(1); box-shadow: var(--glass-shadow); }
    }
`;
document.head.appendChild(style);

// Header / General CTA Feedback
btnHeaderCta.addEventListener('click', () => {
    alert("🔒 Sign Up Interface: In a full deployment, this button launches the FoodSetu producer/kitchen registration portal.");
});

logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Fun visual effect when clicking logo
    const logoIcon = document.querySelector('.logo-icon');
    logoIcon.style.transform = 'rotate(360deg) scale(1.1)';
    logoIcon.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
        logoIcon.style.transform = 'none';
    }, 800);
});

// Button Ripple Effect Utility
function createRippleEffect(button) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(255, 255, 255, 0.3)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 600ms linear';
    circle.style.pointerEvents = 'none';

    // Position ripple relative to button
    const rect = button.getBoundingClientRect();
    // In case click wasn't triggered by actual coordinate event, center it
    circle.style.left = `${button.clientWidth / 2 - radius}px`;
    circle.style.top = `${button.clientHeight / 2 - radius}px`;
    
    // Add relative positioning to button if static
    if (window.getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
    }
    
    // Ensure overflow is hidden on button so ripple stays inside
    button.style.overflow = 'hidden';

    // Append and remove
    button.appendChild(circle);
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Add keyframe for ripple dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
