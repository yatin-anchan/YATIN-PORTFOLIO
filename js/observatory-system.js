/**
 * ═══════════════════════════════════════════════════════════════
 * THE CONSTELLATION OBSERVATORY SYSTEM
 * A testament to the infinite beauty of the cosmos
 * Designed to honor the majesty of space and the universe
 * ═══════════════════════════════════════════════════════════════
 */

class ConstellationObservatory {
    constructor() {
        // Galileo's transmission messages
        this.transmissions = [
            "Greetings, traveler. I am Galileo Galilei, guardian of celestial knowledge.",
            "For centuries, I have mapped the stars and charted the heavens above.",
            "This observatory is no ordinary place—it is a gateway to understanding.",
            "Each star you see represents a milestone in your journey of learning.",
            "Together, they form YOUR constellation—a unique pattern of achievement.",
            "Use the telescope to observe each star closely. Discover their stories.",
            "The cosmos is infinite, as is the potential within you.",
            "Now, young astronomer, let us explore the stars you have earned. ✨"
        ];
        
        this.currentTransmission = 0;
        this.hasVisited = localStorage.getItem('observatory_visited') === 'true';
        this.isTelescopeMode = false;
        this.typingSpeed = 50;
        
        // Certification data with celestial coordinates
        this.certifications = [
            {
                id: 1,
                name: "Certified Robotic Engineer",
                issuer: "SP Robotic Works",
                date: "Jun 2019",
                category: "Robotics",
                icon: "🤖",
                ra: 15.4,
                dec: 20.8,
                x: 15,
                y: 20
            },
            {
                id: 2,
                name: "Data Analysis with Python",
                issuer: "LetsUpgrade",
                date: "Aug 2024",
                category: "Data Science",
                icon: "📊",
                ra: 75.2,
                dec: 25.6,
                x: 75,
                y: 25
            },
            {
                id: 3,
                name: "Introduction to Generative AI Studio",
                issuer: "Simplilearn",
                date: "Aug 2024",
                category: "AI/ML",
                icon: "🎨",
                ra: 30.8,
                dec: 40.3,
                x: 30,
                y: 40
            },
            {
                id: 4,
                name: "AI/ML Certification",
                issuer: "ISRO",
                date: "Sep 2024",
                category: "AI/ML",
                icon: "🛰️",
                ra: 65.5,
                dec: 45.7,
                x: 65,
                y: 45
            },
            {
                id: 5,
                name: "Artificial Intelligence Fundamentals",
                issuer: "Great Learning",
                date: "Sep 2024",
                category: "AI",
                icon: "🧠",
                ra: 50.0,
                dec: 30.2,
                x: 50,
                y: 30
            },
            {
                id: 6,
                name: "Building Recommendation System",
                issuer: "Great Learning",
                date: "Sep 2024",
                category: "Machine Learning",
                icon: "💡",
                ra: 40.3,
                dec: 60.9,
                x: 40,
                y: 60
            },
            {
                id: 7,
                name: "Machine Learning Internship",
                issuer: "Externs Club",
                date: "Aug 2024",
                category: "ML Internship",
                icon: "🔬",
                ra: 80.7,
                dec: 55.4,
                x: 80,
                y: 55
            },
            {
                id: 8,
                name: "Introduction to Machine Learning",
                issuer: "Great Learning",
                date: "Jun 2024",
                category: "Machine Learning",
                icon: "🎓",
                ra: 25.1,
                dec: 70.6,
                x: 25,
                y: 70
            },
            {
                id: 9,
                name: "Kivy Project Certificate",
                issuer: "Great Learning",
                date: "Dec 2024",
                category: "Mobile Development",
                icon: "📱",
                ra: 60.4,
                dec: 75.2,
                x: 60,
                y: 75
            },
            {
                id: 10,
                name: "ISRO Geo Stationary Satellite and GIS",
                issuer: "ISRO",
                date: "Aug 2021",
                category: "Geospatial",
                icon: "🛰️",
                ra: 85.9,
                dec: 35.8,
                x: 85,
                y: 35
            },
            {
                id: 11,
                name: "Best Company Commander",
                issuer: "NCC",
                date: "May 2025",
                category: "Leadership Award",
                icon: "🏅",
                ra: 45.6,
                dec: 85.3,
                x: 45,
                y: 85
            },
            {
                id: 12,
                name: "Figma Bootcamp",
                issuer: "LetsUpgrade",
                date: "Mar 2025",
                category: "UI/UX Design",
                icon: "🎨",
                ra: 20.2,
                dec: 50.7,
                x: 20,
                y: 50
            },
            {
                id: 13,
                name: "Hackanova 4.0 Participation Certificate",
                issuer: "Thakur College",
                date: "Feb 2025",
                category: "Hackathon",
                icon: "🏆",
                ra: 70.8,
                dec: 65.4,
                x: 70,
                y: 65
            }
        ];
        
        this.init();
    }
    
    init() {
        // Start loading sequence
        this.startLoadingSequence();
        
        // Initialize all systems after loading
        setTimeout(() => {
            this.hideLoader();
            this.createInfiniteStarfield();
            this.createMeteorShower();
            this.drawConstellation();
            this.setupEventListeners();
            this.updateHUDTime();
            
            // Show transmission if first visit
            if (!this.hasVisited) {
                setTimeout(() => this.startTransmission(), 1000);
            }
        }, 3000);
    }
    
    // ═══════════════════════════════════════════════════════════
    // LOADING SEQUENCE
    // ═══════════════════════════════════════════════════════════
    
    startLoadingSequence() {
        const progressBar = document.getElementById('progress-bar');
        let progress = 0;
        
        const loadInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadInterval);
            }
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
        }, 200);
    }
    
    hideLoader() {
        const loader = document.getElementById('cosmic-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 1000);
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // TRANSMISSION SYSTEM
    // ═══════════════════════════════════════════════════════════
    
    startTransmission() {
        const overlay = document.getElementById('transmission-overlay');
        if (overlay) {
            overlay.classList.add('active');
            this.showTransmission();
        }
    }
    
    showTransmission() {
        const messageText = document.getElementById('message-text');
        const message = this.transmissions[this.currentTransmission];
        
        if (!messageText) return;
        
        messageText.textContent = '';
        let charIndex = 0;
        
        const typingInterval = setInterval(() => {
            if (charIndex < message.length) {
                messageText.textContent += message[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, this.typingSpeed);
    }
    
    nextTransmission() {
        this.currentTransmission++;
        
        if (this.currentTransmission < this.transmissions.length) {
            this.showTransmission();
        } else {
            this.endTransmission();
        }
    }
    
    endTransmission() {
        const overlay = document.getElementById('transmission-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            localStorage.setItem('observatory_visited', 'true');
        }
        
        // Add achievement if storage is available
        if (typeof storage !== 'undefined' && storage.addAchievement) {
            storage.addAchievement({
                id: 'met_galileo',
                name: 'Celestial Scholar',
                description: 'Received transmission from Galileo',
                tier: 'silver'
            });
            storage.addXP(50);
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // STARFIELD CREATION
    // ═══════════════════════════════════════════════════════════
    
    createInfiniteStarfield() {
        const starfield = document.getElementById('starfield');
        if (!starfield) return;
        
        const starTypes = [
            { size: 'tiny', count: 200 },
            { size: 'small', count: 120 },
            { size: 'medium', count: 60 },
            { size: 'large', count: 20 }
        ];
        
        starTypes.forEach(type => {
            for (let i = 0; i < type.count; i++) {
                const star = document.createElement('div');
                star.className = `star ${type.size}`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 8}s`;
                star.style.animationDuration = `${Math.random() * 6 + 3}s`;
                starfield.appendChild(star);
            }
        });
    }
    
    createMeteorShower() {
        const meteorShower = document.getElementById('meteor-shower');
        if (!meteorShower) return;
        
        setInterval(() => {
            if (Math.random() > 0.5) {
                const meteor = document.createElement('div');
                meteor.className = 'meteor';
                meteor.style.left = `${Math.random() * 50}%`;
                meteor.style.top = `${Math.random() * 30}%`;
                meteor.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
                
                meteorShower.appendChild(meteor);
                
                setTimeout(() => meteor.remove(), 3000);
            }
        }, 4000);
    }
    
    // ═══════════════════════════════════════════════════════════
    // CONSTELLATION DRAWING
    // ═══════════════════════════════════════════════════════════
    
    drawConstellation() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Constellation connection patterns
    const connections = [
        [0, 1], [1, 4], [4, 3], [3, 5], [5, 7],
        [2, 4], [4, 6], [6, 9], [7, 8], [8, 10],
        [10, 12], [11, 4]
    ];
    
    // Draw connecting lines with MUCH more visibility
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.8)'; // More opaque
    ctx.lineWidth = 3; // Thicker lines
    ctx.shadowBlur = 20; // More glow
    ctx.shadowColor = 'rgba(0, 212, 255, 1)';
    
    connections.forEach(([start, end]) => {
        if (this.certifications[start] && this.certifications[end]) {
            const startCert = this.certifications[start];
            const endCert = this.certifications[end];
            
            const x1 = (startCert.x / 100) * canvas.width;
            const y1 = (startCert.y / 100) * canvas.height;
            const x2 = (endCert.x / 100) * canvas.width;
            const y2 = (endCert.y / 100) * canvas.height;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    });
    
    // Draw certification stars - SMALLER and more visible
    this.certifications.forEach(cert => {
        const x = (cert.x / 100) * canvas.width;
        const y = (cert.y / 100) * canvas.height;
        
        // Outer glow - SMALLER
        ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#FFD700';
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2); // Reduced from 25
        ctx.fill();
        
        // Inner bright star
        ctx.fillStyle = '#FFD700';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2); // Reduced from 8
        ctx.fill();
        
        // Star sparkle
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2); // Reduced from 3
        ctx.fill();
    });
    
    // Don't animate the large overlays
}

    
    animateConstellation(canvas, ctx) {
        let frame = 0;
        
        const animate = () => {
            frame++;
            
            this.certifications.forEach((cert, index) => {
                const x = (cert.x / 100) * canvas.width;
                const y = (cert.y / 100) * canvas.height;
                const opacity = 0.3 + Math.sin(frame * 0.02 + index) * 0.3;
                
                ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`;
                ctx.shadowBlur = 25 + Math.sin(frame * 0.03 + index) * 10;
                ctx.shadowColor = '#FFD700';
                ctx.beginPath();
                ctx.arc(x, y, 25, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // ═══════════════════════════════════════════════════════════
    // TELESCOPE MODE
    // ═══════════════════════════════════════════════════════════
    
    engageTelescopeMode() {
        const dome = document.getElementById('observatory-dome');
        const telescopeMode = document.getElementById('telescope-mode');
        
        if (dome && telescopeMode) {
            dome.style.display = 'none';
            telescopeMode.classList.add('active');
            this.isTelescopeMode = true;
            
            this.createDeepSpaceView();
            this.createObservationStars();
        }
    }
    
    exitTelescopeMode() {
        const dome = document.getElementById('observatory-dome');
        const telescopeMode = document.getElementById('telescope-mode');
        
        if (dome && telescopeMode) {
            telescopeMode.classList.remove('active');
            dome.style.display = 'block';
            this.isTelescopeMode = false;
        }
    }
    
    createDeepSpaceView() {
        const canvas = document.getElementById('deep-space-canvas');
        if (!canvas) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        
        // Create deep space background with nebulae
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        
        gradient.addColorStop(0, 'rgba(107, 76, 154, 0.1)');
        gradient.addColorStop(0.5, 'rgba(0, 8, 20, 0.5)');
        gradient.addColorStop(1, '#000');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add distant stars
        for (let i = 0; i < 300; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2;
            const opacity = Math.random();
            
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    createObservationStars() {
        const container = document.getElementById('observation-stars');
        if (!container) return;
        
        // Clear existing
        container.innerHTML = '';
        
        // Create certification stars
        this.certifications.forEach(cert => {
            const star = document.createElement('div');
            star.className = 'obs-star cert-star';
            star.style.left = `${cert.x}%`;
            star.style.top = `${cert.y}%`;
            star.dataset.certId = cert.id;
            
            star.addEventListener('click', () => {
                this.showCertificateModal(cert);
            });
            
            container.appendChild(star);
        });
        
        // Create decorative stars
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'obs-star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(star);
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // CERTIFICATE MODAL
    // ═══════════════════════════════════════════════════════════
    
    showCertificateModal(cert) {
        const modal = document.getElementById('star-modal');
        if (!modal) return;
        
        // Update content
        document.getElementById('star-icon').textContent = cert.icon;
        document.getElementById('cert-name').textContent = cert.name;
        document.getElementById('cert-issuer').textContent = cert.issuer;
        document.getElementById('cert-date').textContent = cert.date;
        document.getElementById('cert-category').textContent = cert.category;
        document.getElementById('cert-coords').textContent = `RA ${cert.ra.toFixed(1)}° | DEC +${cert.dec.toFixed(1)}°`;
        
        modal.classList.add('active');
        
        // Add XP
        if (typeof storage !== 'undefined' && storage.addXP) {
            storage.addXP(5);
        }
    }
    
    closeCertificateModal() {
        const modal = document.getElementById('star-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // CERTIFICATE LIST VIEW
    // ═══════════════════════════════════════════════════════════
    
    showCertificateList() {
        const modal = document.getElementById('cert-list-modal');
        const grid = document.getElementById('certificates-grid');
        
        if (!modal || !grid) return;
        
        // Clear and populate
        grid.innerHTML = '';
        
        this.certifications.forEach(cert => {
            const item = document.createElement('div');
            item.className = 'cert-item';
            item.innerHTML = `
                <div class="cert-item-icon">${cert.icon}</div>
                <h3 class="cert-item-title">${cert.name}</h3>
                <p class="cert-item-issuer">${cert.issuer}</p>
                <p class="cert-item-date">${cert.date}</p>
            `;
            
            item.addEventListener('click', () => {
                this.showCertificateModal(cert);
                modal.classList.remove('active');
            });
            
            grid.appendChild(item);
        });
        
        modal.classList.add('active');
    }
    
    closeCertificateList() {
        const modal = document.getElementById('cert-list-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    // ═══════════════════════════════════════════════════════════
    // RETICLE TRACKING
    // ═══════════════════════════════════════════════════════════
    
    trackReticle(e) {
    if (!this.isTelescopeMode) return;
    
    const reticle = document.getElementById('reticle');
    const coords = document.getElementById('coordinates');
    
    if (reticle) {
        // Center the reticle on cursor position
        reticle.style.left = `${e.clientX}px`;
        reticle.style.top = `${e.clientY}px`;
        reticle.style.transform = 'translate(-50%, -50%)'; // Keep centered
    }
    
    if (coords) {
        const ra = ((e.clientX / window.innerWidth) * 360).toFixed(1);
        const dec = ((e.clientY / window.innerHeight) * 180 - 90).toFixed(1);
        coords.textContent = `RA: ${ra}° | DEC: ${dec > 0 ? '+' : ''}${dec}°`;
    }
}

    
    // ═══════════════════════════════════════════════════════════
    // HUD TIME UPDATE
    // ═══════════════════════════════════════════════════════════
    
    updateHUDTime() {
        const timeElement = document.getElementById('hud-time');
        if (!timeElement) return;
        
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    // ═══════════════════════════════════════════════════════════
    // EVENT LISTENERS
    // ═══════════════════════════════════════════════════════════
    
    setupEventListeners() {
        // Transmission controls
        const nextBtn = document.getElementById('next-transmission');
        const skipBtn = document.getElementById('skip-transmission');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextTransmission());
        }
        
        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.endTransmission());
        }
        
        // Telescope engagement
        const engageBtn = document.getElementById('engage-telescope');
        const exitBtn = document.getElementById('exit-scope');
        
        if (engageBtn) {
            engageBtn.addEventListener('click', () => this.engageTelescopeMode());
        }
        
        if (exitBtn) {
            exitBtn.addEventListener('click', () => this.exitTelescopeMode());
        }
        
        // Modal controls
        const closeModal = document.getElementById('close-modal');
        const continueBtn = document.getElementById('continue-observation');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeCertificateModal());
        }
        
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.closeCertificateModal());
        }
        
        // Certificate list
        const quickViewBtn = document.getElementById('quick-view-btn');
        const closeListBtn = document.getElementById('close-list');
        
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', () => this.showCertificateList());
        }
        
        if (closeListBtn) {
            closeListBtn.addEventListener('click', () => this.closeCertificateList());
        }
        
        // Reticle tracking
        document.addEventListener('mousemove', (e) => this.trackReticle(e));
        
        // Window resize
        window.addEventListener('resize', () => {
            this.drawConstellation();
            if (this.isTelescopeMode) {
                this.createDeepSpaceView();
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZE OBSERVATORY ON PAGE LOAD
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    new ConstellationObservatory();
});

// Console signature
console.log('%c✨ THE CONSTELLATION OBSERVATORY ✨', 'font-size: 20px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px #00d4ff');
console.log('%cA tribute to the infinite beauty of the cosmos', 'font-size: 14px; color: #ffd700; font-style: italic');
console.log('%c🌌 Where knowledge becomes stardust 🌌', 'font-size: 12px; color: #06ffa5');
