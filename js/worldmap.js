// World Map Navigation System
class WorldMapSystem {
    constructor() {
        this.regions = document.querySelectorAll('.map-region');
        this.quickMenu = {
            codex: document.getElementById('codex-btn'),
            achievements: document.getElementById('achievements-btn'),
            profile: document.getElementById('profile-btn')
        };
        this.finalMissionBanner = document.getElementById('final-mission-banner');
        this.bgm = document.getElementById('map-bgm');
        
        this.init();
    }
    
    init() {
        // Setup BGM
        if (this.bgm) {
            this.bgm.volume = 0.2;
        }
        
        // Setup region clicks
        this.regions.forEach(region => {
            region.addEventListener('click', () => this.handleRegionClick(region));
            region.addEventListener('mouseenter', () => this.handleRegionHover(region));
        });
        
        // Setup quick menu
        if (this.quickMenu.codex) {
            this.quickMenu.codex.addEventListener('click', () => this.openCodex());
        }
        if (this.quickMenu.achievements) {
            this.quickMenu.achievements.addEventListener('click', () => this.openAchievements());
        }
        if (this.quickMenu.profile) {
            this.quickMenu.profile.addEventListener('click', () => this.openProfile());
        }
        
        // Check for final mission unlock
        this.checkFinalMission();
        
        // Create starfield
        this.createStarfield();
        
        // Add region particles
        this.addRegionParticles();
    }
    
    handleRegionClick(region) {
        const regionId = region.dataset.region;
        const isLocked = region.classList.contains('locked');
        
        if (isLocked) {
            this.showLockedMessage();
            return;
        }
        
        // Play click sound
        this.playSound('region-select');
        
        // Transition to region page
        this.navigateToRegion(regionId);
    }
    
    handleRegionHover(region) {
        const element = region.dataset.element;
        const particlesContainer = region.querySelector('.region-particles');
        
        // Create hover particles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = `${Math.random() * 6 + 3}px`;
                particle.style.height = particle.style.width;
                particle.style.background = `var(--${element})`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.bottom = '0';
                particlesContainer.appendChild(particle);
                
                setTimeout(() => particle.remove(), 3000);
            }, i * 100);
        }
    }
    
    navigateToRegion(regionId) {
        // Mark region as visited
        storage.visitRegion(regionId);
        storage.addXP(15);
        
        // Fade out and navigate
        document.body.style.transition = 'opacity 0.6s';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = `${regionId}.html`;
        }, 600);
    }
    
    showLockedMessage() {
        const message = document.createElement('div');
        message.className = 'locked-message';
        message.textContent = '🔒 Complete other realms to unlock this gate';
        document.body.appendChild(message);
        
        setTimeout(() => message.classList.add('show'), 100);
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 500);
        }, 2500);
    }
    
    checkFinalMission() {
        const visitedRegions = storage.getVisitedRegions();
        const requiredRegions = ['skills', 'projects', 'education', 'experience', 'certifications'];
        
        const allVisited = requiredRegions.every(region => visitedRegions.includes(region));
        
        if (allVisited) {
            // Unlock contact region
            const contactRegion = document.getElementById('region-contact');
            if (contactRegion) {
                contactRegion.classList.remove('locked');
                contactRegion.classList.add('unlocked');
            }
            
            // Show banner
            if (this.finalMissionBanner) {
                this.finalMissionBanner.classList.remove('hidden');
                
                // Auto-hide after 5 seconds
                setTimeout(() => {
                    this.finalMissionBanner.style.transition = 'opacity 0.5s';
                    this.finalMissionBanner.style.opacity = '0';
                    setTimeout(() => {
                        this.finalMissionBanner.style.display = 'none';
                    }, 500);
                }, 5000);
            }
        }
    }
    
    openCodex() {
        window.location.href = 'codex.html';
    }
    
    openAchievements() {
        window.location.href = 'achievements.html';
    }
    
    openProfile() {
        window.location.href = 'character-custom.html';
    }
    
    playSound(soundName) {
        const sound = new Audio(`assets/sounds/${soundName}.mp3`);
        sound.volume = 0.4;
        sound.play().catch(e => {});
    }
    
    createStarfield() {
        const starfield = document.getElementById('starfield');
        if (!starfield) return;
        
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${Math.random() * 2 + 2}s`;
            starfield.appendChild(star);
        }
    }
    
    addRegionParticles() {
        // Ambient particles for each region
        this.regions.forEach(region => {
            if (region.classList.contains('locked')) return;
            
            const element = region.dataset.element;
            const container = region.querySelector('.region-particles');
            
            setInterval(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = `${Math.random() * 4 + 2}px`;
                particle.style.height = particle.style.width;
                particle.style.background = `var(--${element})`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.bottom = '0';
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 3000);
            }, 2000);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new WorldMapSystem();
});
