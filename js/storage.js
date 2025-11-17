// localStorage Manager for Game State
class StorageManager {
    constructor() {
        this.keys = {
            CUTSCENE: 'cutscenePlayed',
            CHARACTER: 'characterData',
            VISION: 'selectedVision',
            WEAPON: 'selectedWeapon',
            POSE: 'selectedPose',
            XP: 'playerXP',
            LEVEL: 'playerLevel',
            ACHIEVEMENTS: 'achievements',
            LORE_CARDS: 'loreCards',
            QUESTS: 'completedQuests',
            REGIONS_VISITED: 'regionsVisited'
        };
    }
    
    // Save data
    save(key, value) {
        try {
            const data = typeof value === 'object' ? JSON.stringify(value) : value;
            localStorage.setItem(key, data);
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    }
    
    // Load data
    load(key) {
        try {
            const data = localStorage.getItem(key);
            if (!data) return null;
            
            try {
                return JSON.parse(data);
            } catch {
                return data;
            }
        } catch (e) {
            console.error('Storage load error:', e);
            return null;
        }
    }
    
    // Remove data
    remove(key) {
        localStorage.removeItem(key);
    }
    
    // Clear all game data
    clearAll() {
        Object.values(this.keys).forEach(key => {
            this.remove(key);
        });
    }
    
    // Save character data
    saveCharacter(vision, weapon, pose) {
        const characterData = {
            vision,
            weapon,
            pose,
            timestamp: Date.now()
        };
        this.save(this.keys.CHARACTER, characterData);
        this.save(this.keys.VISION, vision);
        this.save(this.keys.WEAPON, weapon);
        this.save(this.keys.POSE, pose);
    }
    
    // Load character data
    loadCharacter() {
        return this.load(this.keys.CHARACTER) || {
            vision: null,
            weapon: null,
            pose: 'idle'
        };
    }
    
    // Add achievement
    addAchievement(achievement) {
        const achievements = this.load(this.keys.ACHIEVEMENTS) || [];
        if (!achievements.find(a => a.id === achievement.id)) {
            achievements.push({
                ...achievement,
                unlockedAt: Date.now()
            });
            this.save(this.keys.ACHIEVEMENTS, achievements);
            return true;
        }
        return false;
    }
    
    // Get all achievements
    getAchievements() {
        return this.load(this.keys.ACHIEVEMENTS) || [];
    }
    
    // Add lore card
    addLoreCard(card) {
        const cards = this.load(this.keys.LORE_CARDS) || [];
        if (!cards.find(c => c.id === card.id)) {
            cards.push({
                ...card,
                unlockedAt: Date.now()
            });
            this.save(this.keys.LORE_CARDS, cards);
            return true;
        }
        return false;
    }
    
    // Get lore cards
    getLoreCards() {
        return this.load(this.keys.LORE_CARDS) || [];
    }
    
    // Complete quest
    completeQuest(questId) {
        const quests = this.load(this.keys.QUESTS) || [];
        if (!quests.includes(questId)) {
            quests.push(questId);
            this.save(this.keys.QUESTS, quests);
            return true;
        }
        return false;
    }
    
    // Get completed quests
    getCompletedQuests() {
        return this.load(this.keys.QUESTS) || [];
    }
    
    // Visit region
    visitRegion(regionId) {
        const regions = this.load(this.keys.REGIONS_VISITED) || [];
        if (!regions.includes(regionId)) {
            regions.push(regionId);
            this.save(this.keys.REGIONS_VISITED, regions);
            return true;
        }
        return false;
    }
    
    // Get visited regions
    getVisitedRegions() {
        return this.load(this.keys.REGIONS_VISITED) || [];
    }
    
    // XP System
    addXP(amount) {
        const currentXP = this.load(this.keys.XP) || 0;
        const newXP = currentXP + amount;
        this.save(this.keys.XP, newXP);
        
        // Check for level up
        const currentLevel = this.load(this.keys.LEVEL) || 1;
        const newLevel = this.calculateLevel(newXP);
        
        if (newLevel > currentLevel) {
            this.save(this.keys.LEVEL, newLevel);
            return { levelUp: true, newLevel, xp: newXP };
        }
        
        return { levelUp: false, xp: newXP };
    }
    
    calculateLevel(xp) {
        // Level = floor(sqrt(xp / 50)) + 1
        return Math.floor(Math.sqrt(xp / 50)) + 1;
    }
    
    getXP() {
        return this.load(this.keys.XP) || 0;
    }
    
    getLevel() {
        return this.load(this.keys.LEVEL) || 1;
    }
}

// Create global instance
const storage = new StorageManager();
