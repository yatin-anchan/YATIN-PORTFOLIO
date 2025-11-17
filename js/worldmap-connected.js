// World Map Navigation System - Connected to Game Engine
class WorldMapSystem {
    constructor() {
        this.regions = document.querySelectorAll('.map-region');
        this.quickMenu = {
            codex: document.getElementById('codex-btn'),
            achievements: document.getElementById('achievements-btn'),
            profile: document.getElementById('profile-btn'),
            clearJourney: document.getElementById('clear-journey-btn')
        };
        this.finalMissionBanner = document.getElementById('final-mission-banner');
        this.bgm = document.getElementById('map-bgm');
        
        this.init();
    }
    
        init() {
        // Setup BGM
        if (this.bgm) {
            this.bgm.volume = 0.2;
            this.bgm.play().catch(e => console.log('Audio autoplay blocked'));
        }
        
        // Mark visited regions
        this.markVisitedRegions();
        
        // Setup region clicks with dynamic lock checking
        this.regions.forEach(region => {
            region.addEventListener('click', () => {
                // Check lock status dynamically on each click
                const isLocked = region.classList.contains('locked');
                
                if (!isLocked) {
                    this.handleRegionClick(region);
                } else {
                    this.showLockedMessage();
                }
            });
            
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
        if (this.quickMenu.clearJourney) {
            this.quickMenu.clearJourney.addEventListener('click', () => this.clearJourney());
        }
        
        // Close banner button
        const closeBannerBtn = document.getElementById('close-banner');
        if (closeBannerBtn) {
            closeBannerBtn.addEventListener('click', () => {
                this.finalMissionBanner.classList.add('hidden');
            });
        }
        
        // Check for final mission unlock
        this.checkFinalMission();
        
        // Create starfield
        this.createStarfield();
        
        // Initialize landmarks
        this.initLandmarks();
        
        // Setup touch interactions
        this.setupTouchInteractions();
    }

    
    markVisitedRegions() {
        const visitedRegions = storage.getVisitedRegions();
        visitedRegions.forEach(regionId => {
            const region = document.querySelector(`[data-region="${regionId}"]`);
            if (region) {
                region.classList.add('visited');
            }
        });
    }
    
    handleRegionClick(region) {
        const regionId = region.dataset.region;
        
        // Play click sound
        this.playSound('region-select');
        
        // Add particle burst effect
        this.createClickParticles(region);
        
        // Transition to region page
        this.navigateToRegion(regionId);
    }
    
    handleRegionHover(region) {
        // Play hover sound (optional)
        const hoverSound = new Audio('assets/sounds/hover.mp3');
        if (hoverSound) {
            hoverSound.volume = 0.1;
            hoverSound.play().catch(e => {});
        }
    }
    
    navigateToRegion(regionId) {
        // Track journey for footprint trail
        footprintTrail.trackVisit(regionId);
        
        // Mark region as visited
        const isNew = storage.visitRegion(regionId);
        
        if (isNew) {
            // Award XP for first visit
            xpSystem.addXP(15, `Discovered ${this.getRegionName(regionId)}`);
        }
        
        // Fade out and navigate
        document.body.style.transition = 'opacity 0.6s';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = `${regionId}.html`;
        }, 600);
    }
    
    getRegionName(regionId) {
        const names = {
            skills: 'The Code Domain',
            projects: 'The Forge',
            education: "Scholar's Library",
            experience: 'Path of Experience',
            certifications: 'Isles of Knowledge',
            contact: 'The Aether Gate'
        };
        return names[regionId] || regionId;
    }
    
    showLockedMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(232, 213, 183, 0.98);
            border: 3px solid #4a3f2f;
            border-radius: 12px;
            padding: 20px 40px;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            color: #4a3f2f;
            z-index: 1000;
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
            animation: fadeInUp 0.3s ease;
        `;
        message.textContent = '🔒 Complete other realms to unlock this gate';
        document.body.appendChild(message);
        
        // Play locked sound
        const lockedSound = new Audio('assets/sounds/locked.mp3');
        if (lockedSound) {
            lockedSound.volume = 0.3;
            lockedSound.play().catch(e => {});
        }
        
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 2500);
    }
    
        checkFinalMission() {
        const visitedRegions = storage.getVisitedRegions();
        const requiredRegions = ['skills', 'projects', 'education', 'experience', 'certifications'];
        
        const allVisited = requiredRegions.every(region => visitedRegions.includes(region));
        
        console.log('Visited regions:', visitedRegions);
        console.log('All required visited?', allVisited);
        
        if (allVisited) {
            // Unlock contact region
            const contactRegion = document.getElementById('region-contact');
            if (contactRegion) {
                contactRegion.classList.remove('locked');
                contactRegion.classList.add('unlocked');
                
                // Visual feedback for unlock
                contactRegion.style.animation = 'unlockFlash 1s ease';
                
                console.log('Contact region unlocked!');
            }
            
            // Show banner if not shown before
            if (!localStorage.getItem('finalMissionShown')) {
                if (this.finalMissionBanner) {
                    this.finalMissionBanner.classList.remove('hidden');
                    localStorage.setItem('finalMissionShown', 'yes');
                    
                    // Play unlock sound
                    this.playSound('unlock');
                }
            }
        } else {
            console.log('Not all regions visited yet. Missing:', 
                requiredRegions.filter(r => !visitedRegions.includes(r)));
        }
    }

    
    createClickParticles(region) {
        const rect = region.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 60;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 8px;
                height: 8px;
                background: #FFD700;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 10px #FFD700;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.style.transition = 'all 0.6s ease-out';
                particle.style.left = `${endX}px`;
                particle.style.top = `${endY}px`;
                particle.style.opacity = '0';
                particle.style.transform = 'scale(0)';
                
                setTimeout(() => particle.remove(), 600);
            }, 50);
        }
    }
    
    initLandmarks() {
        const landmarks = document.querySelectorAll('.terrain-landmark');
        
        landmarks.forEach(landmark => {
            // Add click interaction for easter eggs
            landmark.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showLandmarkInfo(landmark);
            });
        });
        
        // Animate mystery markers
        const mysteryMarkers = document.querySelectorAll('.mystery-marker');
        mysteryMarkers.forEach(marker => {
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                this.revealMystery(marker);
            });
        });
    }
    
    showLandmarkInfo(landmark) {
        const icon = landmark.querySelector('.landmark-icon').textContent;
        const name = landmark.querySelector('.landmark-label').textContent;
        
        const loreMap = {
            'Code Citadel': 'The fortress where programming skills are honed and mastered.',
            "Builder's Tower": 'A towering monument to projects built with passion and code.',
            'Ancient Archives': 'Where knowledge from past endeavors is preserved.',
            "Warrior's Camp": 'Training ground for leadership and discipline.',
            'Knowledge Haven': 'A village celebrating certifications and achievements.',
            'Aether Shrine': 'The sacred gateway to connect with the developer.'
        };
        
        const lore = loreMap[name] || 'A mysterious landmark on the map.';
        
        // Create popup
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(232, 213, 183, 0.98);
            border: 4px solid #4a3f2f;
            border-radius: 15px;
            padding: 30px 40px;
            z-index: 2000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            text-align: center;
            max-width: 400px;
        `;
        
        popup.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 15px;">${icon}</div>
            <h3 style="font-family: 'Cinzel', serif; font-size: 1.5rem; color: #4a3f2f; margin-bottom: 10px;">${name}</h3>
            <p style="font-size: 1rem; color: #6b5744; line-height: 1.6; margin-bottom: 20px;">${lore}</p>
            <button onclick="this.parentElement.remove()" style="
                padding: 10px 25px;
                background: #8b7355;
                border: 2px solid #4a3f2f;
                border-radius: 8px;
                color: white;
                font-family: 'Cinzel', serif;
                cursor: pointer;
                font-size: 1rem;
            ">Close</button>
        `;
        
        document.body.appendChild(popup);
        
        // Play info sound
        const sound = new Audio('assets/sounds/lore-unlock.mp3');
        sound.volume = 0.3;
        sound.play().catch(e => {});
    }
    
    revealMystery(marker) {
        // Easter egg: hidden XP
        xpSystem.addXP(25, 'Discovered Hidden Mystery!');
        
        // Visual effect
        marker.style.animation = 'none';
        marker.style.transform = 'scale(1.5)';
        marker.style.opacity = '1';
        
        setTimeout(() => {
            marker.style.transition = 'all 0.5s ease';
            marker.style.opacity = '0';
            marker.style.transform = 'scale(0)';
        }, 500);
        
        setTimeout(() => {
            marker.remove();
        }, 1000);
        
        // Achievement
        achievementSystem.unlock('observer_code');
    }
    
        clearJourney() {
        if (confirm('⚠️ Reset your entire journey?\n\nThis will clear:\n• Footprint trails\n• Visited regions\n• XP and Level\n• Achievements\n• Lore cards\n• Character customization\n\nYou will return to the beginning.')) {
            // Clear all game data
            this.clearAllGameData();
            
            // Show reset animation
            this.showResetAnimation();
            
            // Redirect to homepage after animation
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    }
    
    clearAllGameData() {
        // Clear footprint trails
        footprintTrail.clearAllTrails();
        
        // Clear all localStorage game data
        storage.clearAll();
        
        // Clear specific keys
        localStorage.removeItem('cutscenePlayed');
        localStorage.removeItem('finalMissionShown');
        localStorage.removeItem('journeyHistory');
        localStorage.removeItem('lastVisitedRegion');
        
        console.log('All game data cleared!');
    }
    
    showResetAnimation() {
        // Create reset overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.5s ease;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 5rem; margin-bottom: 30px; animation: spin 2s linear infinite;">🌀</div>
                <h2 style="font-family: 'Cinzel', serif; font-size: 2.5rem; color: var(--gold); margin-bottom: 15px; text-shadow: 0 0 20px var(--gold);">
                    Journey Reset
                </h2>
                <p style="font-family: 'Poppins', sans-serif; font-size: 1.2rem; color: var(--text-secondary);">
                    Returning to the beginning...
                </p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    
    openCodex() {
        this.navigateTo('codex.html');
    }
    
    openAchievements() {
        this.navigateTo('achievements.html');
    }
    
    openProfile() {
        this.navigateTo('character-custom.html');
    }
    
    navigateTo(page) {
        document.body.style.transition = 'opacity 0.4s';
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = page;
        }, 400);
    }
    
    playSound(soundName) {
        const sound = new Audio(`assets/sounds/${soundName}.mp3`);
        sound.volume = 0.4;
        sound.play().catch(e => {});
    }
    
    setupTouchInteractions() {
        // Detect if touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            // Prevent default touch behaviors that might interfere
            const mapWrapper = document.querySelector('.map-canvas-wrapper');
            if (mapWrapper) {
                mapWrapper.addEventListener('touchstart', (e) => {
                    // Allow normal scrolling but prevent zoom
                    if (e.touches.length > 1) {
                        e.preventDefault();
                    }
                }, { passive: false });
            }
            
            // Add visual feedback on touch
            this.regions.forEach(region => {
                region.addEventListener('touchstart', (e) => {
                    region.style.transform = 'translate(-50%, -50%) scale(1.1)';
                });
                
                region.addEventListener('touchend', (e) => {
                    setTimeout(() => {
                        region.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 200);
                });
            });
            
            // Make nameplates always visible on touch devices
            this.regions.forEach(region => {
                const nameplate = region.querySelector('.region-nameplate');
                if (nameplate) {
                    nameplate.style.opacity = '1';
                    nameplate.style.transform = 'translateX(-50%) translateY(5px)';
                }
            });
        }
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
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new WorldMapSystem();
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
