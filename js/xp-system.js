// XP and Level System
class XPSystem {
    constructor() {
        this.displayElement = null;
        this.init();
    }
    
    init() {
        // Create XP display UI
        this.createDisplay();
        this.updateDisplay();
    }
    
    createDisplay() {
        const display = document.createElement('div');
        display.className = 'xp-display';
        display.innerHTML = `
            <div class="level-badge">
                <span class="level-number">${storage.getLevel()}</span>
            </div>
            <div class="xp-info">
                <div class="xp-bar-container">
                    <div class="xp-bar-fill" style="width: ${this.getXPProgress()}%"></div>
                </div>
                <span class="xp-text">${storage.getXP()} XP</span>
            </div>
        `;
        
        document.body.appendChild(display);
        this.displayElement = display;
    }
    
    updateDisplay() {
        if (!this.displayElement) return;
        
        const level = storage.getLevel();
        const xp = storage.getXP();
        const progress = this.getXPProgress();
        
        this.displayElement.querySelector('.level-number').textContent = level;
        this.displayElement.querySelector('.xp-bar-fill').style.width = `${progress}%`;
        this.displayElement.querySelector('.xp-text').textContent = `${xp} XP`;
    }
    
    getXPProgress() {
        const currentXP = storage.getXP();
        const currentLevel = storage.getLevel();
        const xpForCurrentLevel = Math.pow(currentLevel - 1, 2) * 50;
        const xpForNextLevel = Math.pow(currentLevel, 2) * 50;
        const xpInLevel = currentXP - xpForCurrentLevel;
        const xpNeeded = xpForNextLevel - xpForCurrentLevel;
        
        return Math.min((xpInLevel / xpNeeded) * 100, 100);
    }
    
    addXP(amount, reason = '') {
        const result = storage.addXP(amount);
        this.updateDisplay();
        
        if (result.levelUp) {
            this.showLevelUp(result.newLevel);
        } else {
            this.showXPGain(amount, reason);
        }
        
        return result;
    }
    
    showXPGain(amount, reason) {
        const notification = document.createElement('div');
        notification.className = 'xp-gain-notification';
        notification.innerHTML = `
            <span class="xp-amount">+${amount} XP</span>
            ${reason ? `<span class="xp-reason">${reason}</span>` : ''}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
    
    showLevelUp(newLevel) {
        const overlay = document.createElement('div');
        overlay.className = 'level-up-overlay';
        overlay.innerHTML = `
            <div class="level-up-container">
                <div class="level-up-burst"></div>
                <h1 class="level-up-title">LEVEL UP!</h1>
                <div class="level-display">
                    <span class="new-level">${newLevel}</span>
                </div>
                <p class="level-up-message">You've grown stronger on your journey</p>
                <button class="level-continue-btn">Continue</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Play sound
        const sound = new Audio('assets/sounds/level-up.mp3');
        sound.volume = 0.6;
        sound.play().catch(e => {});
        
        setTimeout(() => overlay.classList.add('show'), 100);
        
        overlay.querySelector('.level-continue-btn').addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 500);
        });
    }
}

// Global instance
const xpSystem = new XPSystem();
