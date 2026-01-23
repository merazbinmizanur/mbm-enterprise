/**
 * MBM ENTERPRISE | Executive Terminal Controller
 * Developer: Meraz Bin Mizanur [cite: 2025-11-23]
 * * Features:
 * - Custom Yarn Cone SVG Illustration
 * - 3-Column Product Dashboard
 * - Real-time Office Status (8 AM - 10 PM)
 * - Premium Swipe-Up Scroll Reveal
 * - VCF (vCard) Contact Generator
 */

// Custom Yarn Cone SVG mimicking the tapered cone with winding lines
const yarnConeSVG = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 22h6M10 2l-3 20h10l-3-20h-4z" />
    <path d="M7.5 18h9M8.5 14h7M9.5 10h5" opacity="0.5"/>
</svg>`;

// Complete Product Inventory
const yarnInventory = [
    { name: "Cotton", type: "yarn" },
    { name: "Viscose", type: "yarn" },
    { name: "PBT", type: "yarn" },
    { name: "Moshiyan", type: "yarn" },
    { name: "Cat Feather", type: "yarn" },
    { name: "Acrylic", type: "yarn" },
    { name: "Bangla", type: "yarn" },
    { name: "Nylon", type: "yarn" },
    { name: "Used Yarn", type: "yarn" },
    { name: "Intake Sweater", type: "sweater" },
      { name: "Wastage Sweater Parts", type: "sweater" },
    { name: "Leftover Sweater", type: "sweater" }
];

/**
 * Initialize Terminal Components
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initial load for static Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Build and display the inventory grid
    renderInventory();

    // Initialize the swipe-up reveal system
    initScrollReveal();

    // Initial office status check and periodic refresh every 1 minute
    updateActiveStatus();
    setInterval(updateActiveStatus, 60000);
    
    console.log("MBM ENTERPRISE Terminal | Online");
});

/**
 * Renders the product inventory grid (3 items per line)
 * Conditional logic: yarns get custom SVG, sweaters get Lucide 'shirt' icon
 */
function renderInventory() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = yarnInventory.map((item, index) => {
        // Updated with 'loom-icon' class for hover animations
        const iconHTML = item.type === 'yarn' 
            ? `<div class="loom-icon w-5 h-5 text-gold-500 mb-2">${yarnConeSVG}</div>` 
            : `<i data-lucide="shirt" class="loom-icon w-5 h-5 text-gold-500 mb-2"></i>`;

        return `
            <div class="stat-box flex flex-col items-center justify-center p-2 reveal" style="transition-delay: ${index * 0.05}s">
                <div class="opacity-20 absolute inset-0 bg-radial-gradient from-emerald-500/10 to-transparent"></div>
                ${iconHTML}
                <h4 class="text-[7px] font-black text-white uppercase leading-tight tracking-tighter text-center relative z-10">
                    ${item.name}
                </h4>
            </div>
        `;
    }).join('');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}


/**
 * Premium Swipe-Up Reveal System
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Real-time Office Status Logic
 * Open: 8:00 AM (08:00) to 10:00 PM (22:00)
 */
function updateActiveStatus() {
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');
    const statusPulse = document.getElementById('status-pulse');
    const container = document.getElementById('status-container');

    if (!statusText || !statusDot) return;

    const now = new Date();
    const hours = now.getHours();
    const isOpen = hours >= 8 && hours < 22;

    if (isOpen) {
        statusText.innerText = "Office Open";
        statusText.className = "text-[8px] font-black uppercase tracking-widest status-open";
        statusDot.className = "w-2 h-2 rounded-full dot-open";
        statusPulse.className = "absolute inset-0 rounded-full animate-ping opacity-75 pulse-open";
        container.style.borderColor = "rgba(16, 185, 129, 0.3)";
    } else {
        statusText.innerText = "Office Closed";
        statusText.className = "text-[8px] font-black uppercase tracking-widest status-closed";
        statusDot.className = "w-2 h-2 rounded-full dot-closed";
        statusPulse.className = "hidden";
        container.style.borderColor = "rgba(255, 255, 255, 0.1)";
    }
}

/**
 * Generates and triggers the download of a .vcf contact file
 * Includes verified phone numbers and professional credentials
 */
window.downloadVCard = function() {
    const contact = {
        name: "Meraz Bin Mizanur",
        org: "MBM ENTERPRISE",
        title: "Founder & CEO",
        phone1: "+8801736907380",
        phone2: "+8801830038179",
        email: "merazbinmizanur@gmail.com",
        fb: "https://www.facebook.com/merazbinmizanur",
        address: "Sultan Market, Borobari, Gazipur, Bangladesh",
        url: window.location.href
    };

    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:${contact.org}
TITLE:${contact.title}
TEL;TYPE=CELL,VOICE:${contact.phone1}
TEL;TYPE=CELL,VOICE:${contact.phone2}
EMAIL;TYPE=PREF,INTERNET:${contact.email}
ADR;TYPE=WORK:;;${contact.address}
URL:${contact.url}
NOTE:Social Profile: ${contact.fb}
REV:${new Date().toISOString()}
END:VCARD`;

    try {
        const blob = new Blob([vCardData], { type: "text/vcard" });
        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        
        downloadLink.href = url;
        downloadLink.download = `Meraz_Bin_Mizanur_MBM.vcf`;
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("V-Card generation error:", err);
    }
};
