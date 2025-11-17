// Quest System for Projects
class QuestSystem {
    constructor() {
        this.quests = {
            pyos_quest: {
                id: 'pyos_quest',
                title: 'The Dawn of the System',
                description: 'Explore the Py_OS operating system project',
                objective: 'View Py_OS project details',
                reward: {
                    xp: 50,
                    loreCard: 'pyos_origin'
                },
                element: 'electro'
            },
            autonix_quest: {
                id: 'autonix_quest',
                title: 'Guardian of the Roads',
                description: 'Discover the Autonix safety system',
                objective: 'Explore Autonix project',
                reward: {
                    xp: 50,
                    loreCard: 'autonix_tale'
                },
                element: 'cryo'
            },
            web_quest: {
                id: 'web_quest',
                title: 'The Web Architect',
                description: 'View the multi-page website project',
                objective: 'Explore web technology project',
                reward: {
                    xp: 50,
                    loreCard: 'web_architect'
                },
                element: 'hydro'
            }
        };
    }
    
    complete(questId) {
        const quest = this.quests[questId];
        if (!quest) return false;
        
        const completed = storage.completeQuest(questId);
        if (completed) {
            this.showQuestComplete(quest);
            
            // Give rewards
            if (quest.reward.xp) {
                storage.addXP(quest.reward.xp);
            }
            if (quest.reward.loreCard) {
                setTimeout(() => {
                    loreSystem.unlock(quest.reward.loreCard);
                }, 1500);
            }
            
            achievementSystem.checkProgress();
            return true;
        }
        return false;
    }
    
    showQuestComplete(quest) {
        const notification = document.createElement('div');
        notification.className = 'quest-complete-notification';
        notification.innerHTML = `
            <div class="quest-header">
                <h3>Quest Complete!</h3>
            </div>
            <div class="quest-body">
                <h4>${quest.title}</h4>
                <p class="quest-rewards">
                    ${quest.reward.xp ? `+${quest.reward.xp} XP` : ''}
                    ${quest.reward.loreCard ? ' • Lore Card Unlocked' : ''}
                </p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Play sound
        const sound = new Audio('assets/sounds/quest-complete.mp3');
        sound.volume = 0.5;
        sound.play().catch(e => {});
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    isCompleted(questId) {
        return storage.getCompletedQuests().includes(questId);
    }
    
    getAll() {
        return Object.values(this.quests);
    }
}

// Global instance
const questSystem = new QuestSystem();
