// Birthday Countdown Script
class BirthdayCountdown {
    constructor() {
        this.friendName = 'Sansy'; // Change this to your friend's name
        this.countdownSection = document.getElementById('countdown-section');
        this.birthdaySection = document.getElementById('birthday-section');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.friendNameElements = document.querySelectorAll('#friend-name, #birthday-friend-name');
        
        this.init();
    }

    init() {
        // Set friend's name in all elements
        this.friendNameElements.forEach(element => {
            element.textContent = this.friendName;
        });

        // Start the countdown
        this.startCountdown();
        
        // Update every second
        this.intervalId = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    startCountdown() {
        this.updateCountdown();
    }

    updateCountdown() {
        // Define the target birthday date (June 15, 2025)
        const birthdayDate = new Date(2025, 5, 15, 0, 0, 0); // Note: months are 0-indexed, so 5 = June
        const now = new Date();
        const timeDifference = birthdayDate.getTime() - now.getTime();

        // Check if it's already the birthday
        if (now.getDate() === 15 && now.getMonth() === 5 && now.getFullYear() === 2025) {
            this.showBirthdayMessage();
            return;
        }

        // Check if the birthday has passed this year
        if (timeDifference <= 0) {
            this.showBirthdayMessage();
            return;
        }
        // Check if it's already past midnight (birthday time!)
        if (timeDifference <= 0) {
            this.showBirthdayMessage();
            return;
        }

        // Calculate time remaining
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update display with animation
        this.updateTimeDisplay(hours, minutes, seconds);
    }

    getNextMidnight() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0); // Set to next midnight
        return midnight;
    }

    updateTimeDisplay(hours, minutes, seconds) {
        // Add leading zeros and animate changes
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // Only update if value changed to avoid unnecessary animations
        if (this.hoursElement.textContent !== formattedHours) {
            this.animateNumberChange(this.hoursElement, formattedHours);
        }
        if (this.minutesElement.textContent !== formattedMinutes) {
            this.animateNumberChange(this.minutesElement, formattedMinutes);
        }
        if (this.secondsElement.textContent !== formattedSeconds) {
            this.animateNumberChange(this.secondsElement, formattedSeconds);
        }
    }

    animateNumberChange(element, newValue) {
        // Add a subtle animation when numbers change
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
        }, 100);
    }

    showBirthdayMessage() {
        // Clear the interval
        clearInterval(this.intervalId);
        
        // Add celebration class to body for background transition
        document.body.classList.add('celebration');
        
        // Hide countdown section
        this.countdownSection.classList.remove('active');
        
        // Show birthday section with delay for smooth transition
        setTimeout(() => {
            this.countdownSection.style.display = 'none';
            this.birthdaySection.classList.add('active');
            this.birthdaySection.style.display = 'block';
            
            // Play birthday sound if available
            this.playBirthdaySound();
            
        }, 800);
    }



    playBirthdaySound() {
        // Try to play a gentle birthday chime using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.playElegantChime(audioContext);
        } catch (error) {
            console.log('Audio not supported or blocked by browser');
        }
    }

    playElegantChime(audioContext) {
        // Gentle, elegant chime sequence
        
        const notes = [
            { frequency: 523.25, duration: 0.8 }, // C5
            { frequency: 659.25, duration: 0.8 }, // E5
            { frequency: 783.99, duration: 1.2 }, // G5
            { frequency: 1046.50, duration: 1.5 } // C6
        ];

        let currentTime = audioContext.currentTime + 0.5; // Small delay
        
        notes.forEach((note, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = note.frequency;
            oscillator.type = 'sine';
            
            // Gentle fade in and out
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0.05, currentTime + note.duration - 0.2);
            gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + note.duration);
            
            currentTime += note.duration * 0.6; // Overlap notes slightly
        });
    }

    // Method to manually trigger birthday (for testing)
    triggerBirthday() {
        this.showBirthdayMessage();
    }
}

// Initialize the countdown when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const countdown = new BirthdayCountdown();
    
    // Add preview button functionality
    const previewButton = document.getElementById('preview-button');
    if (previewButton) {
        previewButton.addEventListener('click', () => {
            countdown.triggerBirthday();
        });
    }
    
    // Add a secret key combination to trigger birthday mode for testing
    // Press Ctrl+Shift+B to trigger birthday mode
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'B') {
            countdown.triggerBirthday();
        }
    });
});

// Add interactive features for time blocks
document.addEventListener('DOMContentLoaded', () => {
    // Add click effects to time blocks
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.addEventListener('click', () => {
            block.style.transform = 'scale(0.95)';
            setTimeout(() => {
                block.style.transform = '';
            }, 150);
        });
    });
});
