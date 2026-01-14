// Like threshold for forwarding to authorities
const LIKE_THRESHOLD = 50;

// Sample posts data
const samplePosts = [
    {
        id: 1,
        author: "Ananya Sharma",
        initials: "AS",
        program: "Computer Science",
        timeAgo: "2 days ago",
        title: "Housing Crisis: International Students Struggle to Find Accommodation",
        content: "As an international student from India, I've been struggling to find affordable housing near campus. The housing shortage is real, and many of us are forced to accept overpriced rooms or commute for hours. The university portal has limited listings, and most landlords prefer German-speaking tenants. We need better support from TUM's housing office and more partnerships with verified landlords.",
        tags: ["Housing", "International Students", "Support Needed"],
        likes: 67,
        comments: 24,
        liked: true
    },
    {
        id: 2,
        author: "Mohammed Khalil",
        initials: "MK",
        program: "Mechanical Engineering",
        timeAgo: "5 days ago",
        title: "Limited German Language Support in Critical Administrative Services",
        content: "I want to bring attention to the language barriers we face at the Ausländerbehörde and other administrative offices. Many international students struggle with visa renewals and residence permits because documents are only in German, and staff rarely speak English. This creates unnecessary stress and delays. Can TUM provide dedicated support staff or translation services for these critical processes?",
        tags: ["Administration", "Language Barrier", "Visa Issues"],
        likes: 89,
        comments: 42,
        liked: true
    },
    {
        id: 3,
        author: "Lisa Chen",
        initials: "LC",
        program: "Data Science",
        timeAgo: "1 week ago",
        title: "Mental Health Support: More Resources Needed for International Students",
        content: "Being away from home and adjusting to a new culture is challenging. While TUM offers counseling services, the waiting times are too long (3-4 weeks!), and there aren't enough counselors who understand the unique challenges international students face. Cultural adaptation, homesickness, and academic pressure are real issues that need immediate attention.",
        tags: ["Mental Health", "Wellbeing", "Counseling"],
        likes: 34,
        comments: 18,
        liked: false
    },
    {
        id: 4,
        author: "Raj Gupta",
        initials: "RG",
        program: "Business Administration",
        timeAgo: "3 days ago",
        title: "Career Services for International Students Need Improvement",
        content: "The career center is great for German students, but international students need more support navigating the German job market. We need workshops on work visa options, networking events with international companies, and guidance on CVs that meet German standards. Many of us want to stay and work in Germany after graduation but don't know where to start.",
        tags: ["Career Services", "Job Market", "Work Visa"],
        likes: 56,
        comments: 31,
        liked: true
    },
    {
        id: 5,
        author: "Elena Novak",
        initials: "EN",
        program: "Physics",
        timeAgo: "4 days ago",
        title: "Appreciation: International Office's Welcome Week Was Amazing!",
        content: "I just wanted to share a positive experience! The welcome week organized by the international office was incredibly helpful. The campus tours, orientation sessions, and meet-and-greet events helped me settle in quickly. Special thanks to the buddy program that paired me with a German student who showed me around Munich. More programs like this would be wonderful! 🙌",
        tags: ["Positive Feedback", "Orientation", "Buddy Program"],
        likes: 23,
        comments: 12,
        liked: false
    },
    {
        id: 6,
        author: "Thomas Wang",
        initials: "TW",
        program: "Electrical Engineering",
        timeAgo: "1 week ago",
        title: "Lab Access and Equipment: International Students Face Scheduling Issues",
        content: "Getting lab time as an international student has been challenging. The scheduling system seems to prioritize certain groups, and by the time we get access, peak hours are full. This affects our project work and research. We need a fairer allocation system that ensures all students have equal opportunity to use lab facilities during reasonable hours.",
        tags: ["Lab Access", "Facilities", "Fair Access"],
        likes: 45,
        comments: 19,
        liked: false
    }
];

// Initialize posts from localStorage or use sample data
let posts = JSON.parse(localStorage.getItem('tumVoicePosts')) || samplePosts;
let nextPostId = Math.max(...posts.map(p => p.id)) + 1;

// Initialize posts from localStorage or use sample data
let posts = JSON.parse(localStorage.getItem('tumVoicePosts')) || samplePosts;
let nextPostId = Math.max(...posts.map(p => p.id)) + 1;

// Render all posts
function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = posts.map(post => createPostHTML(post)).join('');
    updateStats();
}

// Create HTML for a single post
function createPostHTML(post) {
    const forwardedBadge = post.likes >= LIKE_THRESHOLD 
        ? '<span class="badge badge-forwarded">✓ Forwarded to Authorities</span>' 
        : '';
    
    const likeIcon = post.liked ? '❤️' : '🤍';
    const likedClass = post.liked ? 'liked' : '';
    
    const tagsHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <article class="post" data-id="${post.id}" data-likes="${post.likes}">
            <div class="post-header">
                <div class="user-info">
                    <div class="avatar">${post.initials}</div>
                    <div>
                        <h3 class="username">${post.author}</h3>
                        <p class="post-meta">International Student • ${post.program} • ${post.timeAgo}</p>
                    </div>
                </div>
                ${forwardedBadge}
            </div>
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <p>${post.content}</p>
                <div class="post-tags">
                    ${tagsHTML}
                </div>
            </div>
            <div class="post-footer">
                <button class="like-btn ${likedClass}" onclick="toggleLikeById(${post.id})">
                    <span class="like-icon">${likeIcon}</span>
                    <span class="like-count">${post.likes}</span>
                </button>
                <button class="comment-btn">
                    💬 <span>${post.comments}</span>
                </button>
                <button class="share-btn">
                    🔗 Share
                </button>
            </div>
        </article>
    `;
}

// Toggle like by post ID
function toggleLikeById(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    if (post.liked) {
        post.liked = false;
        post.likes--;
    } else {
        post.liked = true;
        post.likes++;
    }
    
    savePosts();
    renderPosts();
    
    if (post.liked) {
        const postElement = document.querySelector(`[data-id="${postId}"]`);
        const button = postElement.querySelector('.like-btn');
        createLikeEffect(button);
    }
    
    checkThresholdById(postId);
}

// Check threshold by post ID
function checkThresholdById(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    const justCrossedThreshold = post.likes === LIKE_THRESHOLD && post.liked;
    const justDroppedBelowThreshold = post.likes === LIKE_THRESHOLD - 1 && !post.liked;
    
    if (justCrossedThreshold) {
        showNotification(`Post forwarded to TUM authorities! 🎉`);
    }
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('tumVoicePosts', JSON.stringify(posts));
}

// Update statistics
function updateStats() {
    const forwardedCount = posts.filter(p => p.likes >= LIKE_THRESHOLD).length;
    const totalPosts = posts.length;
    
    document.querySelector('.floating-stats').innerHTML = `
        <div class="stat">
            <span class="stat-number">${totalPosts}</span>
            <span class="stat-label">Active Posts</span>
        </div>
        <div class="stat">
            <span class="stat-number">${forwardedCount}</span>
            <span class="stat-label">Forwarded Today</span>
        </div>
    `;
}

// Modal functions
function openModal() {
    document.getElementById('newPostModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('newPostModal').style.display = 'none';
    document.getElementById('newPostForm').reset();
}

// Handle new post submission
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    
    // Form submission
    document.getElementById('newPostForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('authorName').value.trim();
        const program = document.getElementById('authorProgram').value.trim();
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();
        const tagsInput = document.getElementById('postTags').value.trim();
        
        // Generate initials
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        
        // Parse tags
        const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];
        
        // Create new post
        const newPost = {
            id: nextPostId++,
            author: name,
            initials: initials,
            program: program,
            timeAgo: "Just now",
            title: title,
            content: content,
            tags: tags,
            likes: 0,
            comments: 0,
            liked: false
        };
        
        // Add to beginning of posts array
        posts.unshift(newPost);
        savePosts();
        renderPosts();
        
        closeModal();
        showNotification('Your post has been published! 🎉');
        
        // Scroll to top to see new post
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // New post button
    const newPostBtn = document.querySelector('.btn-primary');
    if (newPostBtn) {
        newPostBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('newPostModal');
        if (e.target === modal) {
            closeModal();
        }
    });
});

// Keep existing functions for compatibility
function toggleLike(button) {
    const post = button.closest('.post');
    const postId = parseInt(post.getAttribute('data-id'));
    toggleLikeById(postId);
}

function checkThreshold(post, likes) {
    // Now handled in checkThresholdById
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

