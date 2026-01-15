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
        content: "As an international student from India, I've been struggling to find affordable housing near campus. The housing shortage is real, and many of us are forced to accept overpriced rooms or commute for hours. We need better support from TUM's housing office.",
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
        content: "Many international students struggle with visa renewals because documents are only in German. This creates unnecessary stress and delays. Can TUM provide dedicated support staff or translation services?",
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
        title: "Mental Health Support: More Resources Needed",
        content: "The waiting times for counseling are too long (3-4 weeks!). Cultural adaptation, homesickness, and academic pressure are real issues that need immediate attention.",
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
        content: "International students need more support navigating the German job market. We need workshops on work visa options and guidance on CVs that meet German standards.",
        tags: ["Career Services", "Job Market", "Work Visa"],
        likes: 56,
        comments: 31,
        liked: true
    },
    {
        id: 5,
        author: "Sofia Martinez",
        initials: "SM",
        program: "Chemistry",
        timeAgo: "6 days ago",
        title: "International Student ID Card Delays Affecting Daily Life",
        content: "I've been waiting over 6 weeks for my student ID card, which means I can't access the library, cafeteria discounts, or public transport benefits. This administrative delay is making my first semester incredibly difficult and expensive. Other universities process these cards within a week!",
        tags: ["Administration", "Student ID", "Support Needed"],
        likes: 73,
        comments: 28,
        liked: true
    },
    {
        id: 6,
        author: "Yuki Tanaka",
        initials: "YT",
        program: "Robotics",
        timeAgo: "1 day ago",
        title: "Appreciation: International Mentorship Program is Excellent",
        content: "I want to highlight the amazing mentorship program that paired me with a senior student. They helped me navigate course registration, find study groups, and understand German academic culture. This program should be expanded - it made such a difference in my transition to TUM!",
        tags: ["Positive Feedback", "Mentorship", "Integration"],
        likes: 42,
        comments: 15,
        liked: false
    }
];

// Initialize posts from localStorage or use sample data
let posts = JSON.parse(localStorage.getItem('tumVoicePosts')) || samplePosts;
let nextPostId = Math.max(...posts.map(p => p.id)) + 1;

// Initialize comments from localStorage
let comments = JSON.parse(localStorage.getItem('tumVoiceComments')) || {};

// Save comments to localStorage
function saveComments() {
    localStorage.setItem('tumVoiceComments', JSON.stringify(comments));
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('tumVoicePosts', JSON.stringify(posts));
}

// Render all posts
function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = posts.map(post => createPostHTML(post)).join('');
    updateStats();
}

// Create HTML for a single post
function createPostHTML(post) {
    const forwardedBadge = post.likes >= LIKE_THRESHOLD 
        ? '<span class="badge badge-forwarded">Forwarded to Authorities</span>' 
        : '';
    
    const likeIcon = post.liked ? '♥' : '♡';
    const likedClass = post.liked ? 'liked' : '';
    
    const tagsHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Get comments for this post
    const postComments = comments[post.id] || [];
    const commentsHTML = postComments.length > 0 ? `
        <div class="comments-section">
            <h4>Comments (${postComments.length})</h4>
            ${postComments.map(comment => `
                <div class="comment">
                    <div class="comment-avatar">${comment.initials}</div>
                    <div class="comment-content">
                        <div class="comment-author">${comment.author} <span class="comment-time">${comment.timeAgo}</span></div>
                        <p>${comment.content}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    ` : '';
    
    return `
        <article class="post" data-id="${post.id}">
            <div class="post-header">
                <div class="user-info">
                    <div class="avatar">${post.initials}</div>
                    <div>
                        <h3 class="username">${post.author}</h3>
                        <p class="post-meta">International Student • ${post.program} • ${post.timeAgo}</p>
                    </div>
                </div>
                ${forwardedBadge}
                <button class="post-menu-btn" onclick="togglePostMenu(event, ${post.id})">⋮</button>
                <div class="post-menu" id="menu-${post.id}">
                    <button onclick="editPost(${post.id})">Edit Post</button>
                </div>
            </div>
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <div class="post-text ${post.content.length > 200 ? 'collapsed' : ''}">
                    <p>${post.content}</p>
                </div>
                ${post.content.length > 200 ? '<button class="read-more-btn" onclick="toggleReadMore(event)"><span>▼ Read more</span></button>' : ''}
                <div class="post-tags">${tagsHTML}</div>
            </div>
            ${commentsHTML}
            <div class="post-footer">
                <button class="like-btn ${likedClass}" onclick="toggleLike(${post.id})">
                    <span class="like-icon">${likeIcon}</span>
                    <span class="like-count">${post.likes}</span>
                </button>
                <button class="comment-btn" onclick="openReplyModal(${post.id})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>${postComments.length}</span>
                </button>
            </div>
        </article>
    `;
}

// Toggle like
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    
    savePosts();
    renderPosts();
    
    if (post.liked && post.likes === LIKE_THRESHOLD) {
        showNotification('Post forwarded to TUM authorities!');
    }
}

// Update statistics
function updateStats() {
    const forwardedCount = posts.filter(p => p.likes >= LIKE_THRESHOLD).length;
    document.querySelector('.floating-stats').innerHTML = `
        <div class="stat">
            <span class="stat-number">${posts.length}</span>
            <span class="stat-label">Active Posts</span>
        </div>
        <div class="stat">
            <span class="stat-number">${forwardedCount}</span>
            <span class="stat-label">Forwarded Today</span>
        </div>
    `;
}

// Toggle read more/less for posts
function toggleReadMore(event) {
    const btn = event.target.closest('.read-more-btn');
    const postText = btn.previousElementSibling;
    const isCollapsed = postText.classList.contains('collapsed');
    
    if (isCollapsed) {
        postText.classList.remove('collapsed');
        btn.innerHTML = '<span>▲ Read less</span>';
    } else {
        postText.classList.add('collapsed');
        btn.innerHTML = '<span>▼ Read more</span>';
    }
}

// Toggle post menu
function togglePostMenu(event, postId) {
    event.stopPropagation();
    const menu = document.getElementById(`menu-${postId}`);
    const allMenus = document.querySelectorAll('.post-menu');
    allMenus.forEach(m => {
        if (m !== menu) m.style.display = 'none';
    });
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Close menus when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.post-menu').forEach(m => m.style.display = 'none');
});

// Edit post
function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    // Fill form with existing data
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postContent').value = post.content;
    document.getElementById('authorName').value = post.author.includes('Anonymous') ? '' : post.author;
    document.getElementById('authorProgram').value = post.program;
    document.getElementById('postTags').value = post.tags.join(', ');
    
    // Store the post ID being edited
    document.getElementById('newPostModal').dataset.editingId = postId;
    
    // Change modal title
    document.querySelector('.modal-header h2').textContent = '✏️ Edit Post';
    
    // Show modal
    document.getElementById('newPostModal').style.display = 'block';
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        background: rgba(48, 112, 179, 0.5);
        color: white; padding: 8px 14px; border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        font-weight: 500; font-size: 0.8em;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Modal functions
function openModal() {
    const modal = document.getElementById('newPostModal');
    delete modal.dataset.editingId;
    document.querySelector('.modal-header h2').textContent = '✍️ Create New Post';
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('newPostModal');
    modal.style.display = 'none';
    document.getElementById('newPostForm').reset();
    delete modal.dataset.editingId;
    document.querySelector('.modal-header h2').textContent = '✍️ Create New Post';
}

function openReplyModal(postId) {
    document.getElementById('replyPostId').value = postId;
    document.getElementById('replyModal').style.display = 'block';
}

function closeReplyModal() {
    document.getElementById('replyModal').style.display = 'none';
    document.getElementById('replyForm').reset();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('TUM Voice loaded!');
    
    // Render posts
    renderPosts();
    
    // New post button
    const newPostBtn = document.getElementById('newPostBtn');
    console.log('Button found:', newPostBtn);
    
    newPostBtn.addEventListener('click', function() {
        console.log('Button clicked!');
        openModal();
    });
    
    // Close button
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    
    // Reply modal close buttons
    document.getElementById('closeReplyModal').addEventListener('click', closeReplyModal);
    document.getElementById('cancelReplyBtn').addEventListener('click', closeReplyModal);
    
    // Click outside to close
    window.addEventListener('click', function(e) {
        const newPostModal = document.getElementById('newPostModal');
        const replyModal = document.getElementById('replyModal');
        if (e.target === newPostModal) {
            closeModal();
        }
        if (e.target === replyModal) {
            closeReplyModal();
        }
    });
    
    // Form submission
    document.getElementById('newPostForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const modal = document.getElementById('newPostModal');
        const editingId = modal.dataset.editingId;
        
        const name = document.getElementById('authorName').value.trim() || 'Anonymous Student';
        const program = document.getElementById('authorProgram').value.trim();
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();
        const tagsInput = document.getElementById('postTags').value.trim();
        
        // Generate initials
        const initials = name === 'Anonymous Student' ? '..' : 
            name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        
        // Parse tags
        const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : ['General'];
        
        if (editingId) {
            // Update existing post
            const post = posts.find(p => p.id === parseInt(editingId));
            if (post) {
                post.author = name;
                post.initials = initials;
                post.program = program;
                post.title = title;
                post.content = content;
                post.tags = tags;
                showNotification('Post updated successfully!');
            }
            delete modal.dataset.editingId;
        } else {
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
        
        // Add to top of posts
        posts.unshift(newPost);
        showNotification('Your post has been published!');
        }
        
        savePosts();
        renderPosts();
        
        closeModal();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Reply form submission
    document.getElementById('replyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const postId = parseInt(document.getElementById('replyPostId').value);
        const name = document.getElementById('replyName').value.trim() || 'Anonymous';
        const content = document.getElementById('replyContent').value.trim();
        
        // Generate initials
        const initials = name === 'Anonymous' ? '..' : 
            name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        
        // Create new comment
        const newComment = {
            author: name,
            initials: initials,
            content: content,
            timeAgo: "Just now"
        };
        
        // Add comment to the post
        if (!comments[postId]) {
            comments[postId] = [];
        }
        comments[postId].push(newComment);
        
        // Update post's comment count
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments = comments[postId].length;
        }
        
        saveComments();
        savePosts();
        renderPosts();
        
        closeReplyModal();
        showNotification('Comment posted successfully!');
        
        // Scroll to the post
        const postElement = document.querySelector(`[data-id="${postId}"]`);
        if (postElement) {
            postElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
