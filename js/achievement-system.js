// Achievement System
class AchievementSystem {
    constructor() {
        this.achievements = {
            // Bronze Tier
            first_steps: {
                id: 'first_steps',
                name: 'First Steps',
                description: 'Viewed the Skills page',
                tier: 'bronze',
                xp: 20,
                icon: '👣'
            },
            vision_bearer: {
                id: 'vision_bearer',
                name: 'Vision Bearer',
                description: 'Selected your first Vision',
                tier: 'bronze',
                xp: 100,
                icon: '⚡'
            },
            armed_traveler: {
                id: 'armed_traveler',
                name: 'Armed Traveler',
                description: 'Equipped weapon and vision',
                tier: 'bronze',
                xp: 50,
                icon: '⚔️'
            },
            
            // Silver Tier
            archivist: {
                id: 'archivist',
                name: 'Archivist',
                description: 'Unlocked 5 Lore Cards',
                tier: 'silver',
                xp: 150,
                icon: '📚'
            },
            cartographer: {
                id: 'cartographer',
                name: 'Cartographer',
                description: 'Visited 3 different regions',
                tier: 'silver',
                xp: 100,
                icon: '🗺️'
            },
            quest_hunter: {
                id: 'quest_hunter',
                name: 'Quest Hunter',
                description: 'Completed 3 project quests',
                tier: 'silver',
                xp: 200,
                icon: '🎯'
            },
            
            // Gold Tier
            master_smith: {
                id: 'master_smith',
                name: 'Master Smith',
                description: 'Completed all project quests',
                tier: 'gold',
                xp: 500,
                icon: '🔨'
            },
            realm_walker: {
                id: 'realm_walker',
                name: 'Realm Walker',
                description: 'Visited all regions',
                tier: 'gold',
                xp: 300,
                icon: '🌍'
            },
            lore_master: {
                id: 'lore_master',
                name: 'Lore Master',
                description: 'Collected all Lore Cards',
                tier: 'gold',
                xp: 400,
                icon: '📖'
            },
            
            // Mythic Tier
            met_developer: {
                id: 'met_developer',
                name: 'Met the Traveler',
                description: 'Completed the Final Mission',
                tier: 'mythic',
                xp: 1000,
                icon: '👤'
            },
            observer_code: {
                id: 'observer_code',
                name: 'Observer of Code',
                description: 'Found the secret command',
                tier: 'mythic',
                xp: 500,
                icon: '🔍'
            }
        };
    }
    
    unlock(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return false;
        
        const unlocked = storage.addAchievement(achievement);
        if (unlocked) {
            this.showNotification(achievement);
            storage.addXP(achievement.xp);
            return true;
        }
        return false;
    }
    
    showNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = `achievement-notification tier-${achievement.tier}`;
        notification.innerHTML = `
            <div class="achievement-header">
                <span class="achievement-icon">${achievement.icon}</span>
                <h3>Achievement Unlocked!</h3>
            </div>
            <div class="achievement-body">
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
                <span class="achievement-xp">+${achievement.xp} XP</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Play sound
        const sound = new Audio('assets/sounds/achievement.mp3');
        sound.volume = 0.5;
        sound.play().catch(e => {});
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }
    
    checkProgress() {
        const loreCards = storage.getLoreCards().length;
        const regions = storage.getVisitedRegions().length;
        const quests = storage.getCompletedQuests().length;
        
        // Check tier achievements
        if (loreCards >= 5) this.unlock('archivist');
        if (loreCards >= 10) this.unlock('lore_master');
        if (regions >= 3) this.unlock('cartographer');
        if (regions >= 6) this.unlock('realm_walker');
        if (quests >= 3) this.unlock('quest_hunter');
        if (quests >= 6) this.unlock('master_smith');
    }
    
    getAll() {
        return storage.getAchievements();
    }
    
    getTierColor(tier) {
        const colors = {
            bronze: '#cd7f32',
            silver: '#c0c0c0',
            gold: '#ffd700',
            mythic: '#9d4edd'
        };
        return colors[tier] || '#fff';
    }
}

// Global instance
const achievementSystem = new AchievementSystem();
