// Core Game Engine
class GameEngine {
    constructor() {
        this.initialized = false;
        this.currentPage = this.getCurrentPage();
        this.init();
    }
    
    init() {
        if (this.initialized) return;
        
        // Check if first time visitor
        this.checkFirstVisit();
        
        // Initialize systems based on page
        this.initializeSystems();
        
        // Add global event listeners
        this.addGlobalListeners();
        
        this.initialized = true;
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        return page || 'index';
    }
    
    checkFirstVisit() {
        if (!localStorage.getItem('cutscenePlayed')) {
            // First time visitor
            console.log('Welcome, new traveler!');
        }
    }
    
    initializeSystems() {
        // Systems are auto-initialized via their constructors
        // This method can be used for page-specific initialization
        
        switch(this.currentPage) {
            case 'homepage':
                this.initHomepage();
                break;
            case 'skills':
                this.initSkillsPage();
                break;
            case 'projects':
                this.initProjectsPage();
                break;
            case 'contact':
                this.initContactPage();
                break;
        }
    }
    
    initHomepage() {
        console.log('Homepage initialized');
    }
    
    initSkillsPage() {
        // Visit region achievement
        if (storage.visitRegion('skills')) {
            achievementSystem.unlock('first_steps');
            xpSystem.addXP(15, 'Explored Skills Realm');
        }
    }
    
    initProjectsPage() {
        if (storage.visitRegion('projects')) {
            xpSystem.addXP(15, 'Entered Projects Realm');
        }
    }
    
    initContactPage() {
        if (storage.visitRegion('contact')) {
            // Check if all regions visited
            const visitedRegions = storage.getVisitedRegions();
            if (visitedRegions.length >= 6) {
                achievementSystem.unlock('met_developer');
            }
        }
    }
    
    addGlobalListeners() {
        // Secret command listener
        let commandBuffer = '';
        document.addEventListener('keypress', (e) => {
            commandBuffer += e.key;
            if (commandBuffer.length > 20) {
                commandBuffer = commandBuffer.slice(-20);
            }
            
            if (commandBuffer.includes('developer')) {
                achievementSystem.unlock('observer_code');
                commandBuffer = '';
            }
        });
        
        // Page visibility for analytics
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('Traveler departed temporarily');
            } else {
                console.log('Traveler returned');
            }
        });
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.gameEngine = new GameEngine();
});
