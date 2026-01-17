# TUM Voice 🎓

**Amplifying Student Experiences**

A student-driven forum platform designed for international students at Technical University of Munich (TUM) to share experiences, raise concerns, and support each other.

---

## 🎯 End Goal

The primary goal of **TUM Voice** is to create a transparent, democratic platform where international students can:

1. **Share their experiences** - Post about challenges, successes, and general university life
2. **Voice concerns** - Raise issues that affect their academic and social experience
3. **Get community support** - Receive advice and solidarity from fellow international students
4. **Drive institutional change** - Posts that receive **50+ likes are automatically flagged** and forwarded to TUM authorities, ensuring popular concerns reach decision-makers

This system creates a **direct feedback loop** between students and university administration, making student voices truly heard.

---

## ✨ Key Features

### 🗣️ Student Forum
- **Post Creation**: Students can create posts sharing their experiences, concerns, or feedback
- **Anonymous Option**: Post anonymously or with your name - your choice
- **Rich Categorization**: Tag posts with relevant topics (Housing, Mental Health, Administration, etc.)
- **Read More/Less**: Expandable posts for better readability

### 💬 Community Engagement
- **Like System**: Show support for posts that resonate with you
- **Comment System**: Engage in discussions and share advice
- **Anonymous Comments**: Option to comment anonymously

### 🔔 Automatic Escalation
- **Like Threshold**: Posts reaching 50+ likes are automatically flagged
- **Authority Notification**: Popular posts are forwarded to TUM authorities
- **Visual Badge**: "Forwarded to Authorities" badge appears on escalated posts
- **Transparency**: Students can see which issues gained official attention

### 📊 Live Statistics
- **Active Posts Counter**: Track total number of posts
- **Forwarded Posts Counter**: See how many issues reached authorities
- **Topic Overview**: Sidebar shows common discussion topics

### 🔐 Data Persistence
- **Local Storage**: All posts and comments are saved in the browser
- **No Backend Required**: Runs entirely client-side for simplicity
- **Edit Capability**: Post authors can edit their submissions

---

## 📁 Project Structure

```
Hacking_TUM/
├── index.html       # Main HTML structure and layout
├── script.js        # JavaScript logic (posts, comments, likes, modals)
├── styles.css       # Complete styling and responsive design
├── test.html        # Testing file for development
└── README.md        # This file
```

---

## 🚀 How It Works

### For Students:
1. **Visit the platform** - Open `index.html` in your browser
2. **Browse posts** - See what other international students are discussing
3. **Create a post** - Click "+ New Post" to share your experience
4. **Engage** - Like posts you relate to, comment with advice or support
5. **Make an impact** - If a post reaches 50 likes, it gets forwarded to authorities

### For Administrators:
- Posts reaching the **50-like threshold** are flagged with a visual badge
- These posts represent significant student concerns requiring attention
- The democratic voting system ensures genuine issues rise to the top

---

## 🛠️ Technical Implementation

### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with flexbox/grid layouts
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage API** - Client-side data persistence

### Key Components

#### 1. Post Management (`script.js`)
- Sample posts pre-loaded for demonstration
- Dynamic post creation, editing, and rendering
- Like/unlike functionality with threshold detection
- Auto-generation of user initials for avatars

#### 2. Comment System
- Thread-based comments under each post
- Anonymous commenting support
- Persistent comment storage

#### 3. Modal System
- New Post Modal - For creating/editing posts
- Reply Modal - For adding comments
- Click-outside-to-close functionality

#### 4. Data Persistence
```javascript
// Posts stored in localStorage
localStorage.setItem('tumVoicePosts', JSON.stringify(posts));

// Comments stored separately
localStorage.setItem('tumVoiceComments', JSON.stringify(comments));
```

#### 5. Like Threshold System
```javascript
const LIKE_THRESHOLD = 50;

// Automatic notification when threshold reached
if (post.liked && post.likes === LIKE_THRESHOLD) {
    showNotification('Post forwarded to TUM authorities!');
}
```

---

## 🎨 Design Philosophy

### Color Scheme
- **Primary**: TUM Blue (#3070B3) - Official TUM branding
- **Background**: Light gray (#f5f7fa) - Easy on the eyes
- **Accents**: White cards with subtle shadows

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, slide-in notifications
- **Intuitive Interface**: Clear call-to-action buttons
- **Visual Hierarchy**: Important information stands out

---

## 📝 Sample Discussion Topics

The platform includes these common categories:
- 🏠 **Housing & Accommodation** - Finding apartments, roommate issues
- 📚 **Academic Support** - Course help, exam preparation
- 🧠 **Mental Health** - Stress, counseling, wellbeing
- 📋 **Visa & Administration** - Paperwork, bureaucracy
- 💼 **Career & Jobs** - Internships, job market guidance
- 🌍 **Cultural Integration** - Adapting to German culture
- 🔬 **Lab & Research Access** - Research facilities, equipment
- 💰 **Finances & Scholarships** - Funding, student jobs

---

## 🔄 Usage Instructions

### Running Locally
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start browsing, posting, and engaging!

### Creating a Post
1. Click **"+ New Post"** in the header
2. Fill in the form:
   - **Title**: Brief, descriptive heading
   - **Content**: Your detailed experience/concern
   - **Name**: Optional (leave empty for anonymous)
   - **Program**: Your field of study
   - **Tags**: Optional categorization
3. Click **"📤 Submit Post"**

### Engaging with Posts
- **Like**: Click the heart icon (♡ → ♥)
- **Comment**: Click the comment button
- **Edit**: Click the menu (⋮) on your own posts
- **Read More**: Expand long posts with the arrow button

---

## 🌟 Impact Potential

### For Students:
- ✅ Feel heard and represented
- ✅ Find community support
- ✅ Discover you're not alone in challenges
- ✅ Drive real institutional change

### For TUM Administration:
- ✅ Get direct, unfiltered student feedback
- ✅ Identify systemic issues early
- ✅ Prioritize interventions based on student votes
- ✅ Build trust with international student community

---

## 🚧 Future Enhancements

Potential improvements for future versions:

1. **Backend Integration**
   - PostgreSQL/MongoDB database
   - User authentication system
   - Email notifications to authorities

2. **Advanced Features**
   - Search and filter functionality
   - Real-time updates (WebSockets)
   - Post reporting/moderation system
   - Upvote/downvote on comments

3. **Analytics Dashboard**
   - Sentiment analysis of posts
   - Trending topics over time
   - Response rate from authorities

4. **Mobile App**
   - Native iOS/Android applications
   - Push notifications

---

## 🤝 Contributing

This project was created for Hacking TUM hackathon. Contributions are welcome!

### How to Contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is open-source and available for educational purposes.

---

## 👥 About

Created with ❤️ for international students at TUM by students who understand the challenges of studying abroad.

**Mission**: To amplify every student voice and create a more responsive, inclusive university environment.

---

## 📞 Support

For questions, suggestions, or bug reports, please create an issue in the repository.

---

## 🎉 Acknowledgments

- TUM International Student Community
- All students who shared their experiences
- Hacking TUM organizing team

---

**Together, we make TUM better for everyone! 🚀**
