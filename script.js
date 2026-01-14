// Like threshold for forwarding to authorities
const LIKE_THRESHOLD = 50;

// Toggle like functionality
function toggleLike(button) {
    const post = button.closest('.post');
    const likeCountSpan = button.querySelector('.like-count');
    const likeIcon = button.querySelector('.like-icon');
    let currentLikes = parseInt(likeCountSpan.textContent);
    
    if (button.classList.contains('liked')) {
        // Unlike
        button.classList.remove('liked');
        likeIcon.textContent = '🤍';
        currentLikes--;
    } else {
        // Like
        button.classList.add('liked');
        likeIcon.textContent = '❤️';
        currentLikes++;
        
        // Show celebration effect
        createLikeEffect(button);
    }
    
    // Update like count
    likeCountSpan.textContent = currentLikes;
    post.setAttribute('data-likes', currentLikes);
    
    // Check if post reaches threshold
    checkThreshold(post, currentLikes);
}

// Create a visual effect when liking
function createLikeEffect(button) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '2em';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 1s ease-out';
    
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Check if post reaches threshold for forwarding
function checkThreshold(post, likes) {
    const postHeader = post.querySelector('.post-header');
    let badge = postHeader.querySelector('.badge-forwarded');
    
    if (likes >= LIKE_THRESHOLD && !badge) {
        // Add forwarded badge
        badge = document.createElement('span');
        badge.className = 'badge badge-forwarded';
        badge.textContent = '✓ Forwarded to Authorities';
        postHeader.appendChild(badge);
        
        // Show notification
        showNotification(`Post forwarded to TUM authorities! 🎉`);
        
        // Update stats
        updateForwardedCount(1);
    } else if (likes < LIKE_THRESHOLD && badge) {
        // Remove badge if likes drop below threshold
        badge.remove();
        updateForwardedCount(-1);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        font-size: 1.1em;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Update forwarded count in stats
function updateForwardedCount(change) {
    const stats = document.querySelectorAll('.stat-number');
    const forwardedStat = stats[1]; // Second stat is forwarded count
    const current = parseInt(forwardedStat.textContent);
    forwardedStat.textContent = current + change;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('TUM Voice Forum loaded successfully! 🎓');
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add comment button functionality (demo only)
document.querySelectorAll('.comment-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('Comment feature coming soon! 💬');
    });
});

// Add share button functionality (demo only)
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('Link copied to clipboard! 🔗');
    });
});

// Add new post button functionality (demo only)
document.querySelector('.btn-primary').addEventListener('click', function() {
    showNotification('New post creation coming soon! ✍️');
});
