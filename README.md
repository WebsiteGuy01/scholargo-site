<div align="center">

# 🎓 ScholarGo

### *Unlock Scholarships, Grants & Opportunities* ✨

[![Live Site](https://img.shields.io/badge/🌐-Visit_ScholarGo-blue?style=for-the-badge)](https://scholargo.netlify.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Netlify Status](https://img.shields.io/badge/Netlify-Success-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://scholargo.netlify.app)

<p align="center">
  <strong>Your all-in-one platform for scholarships, education updates, and tech tools for students worldwide.</strong>
</p>

</div>

---

## 🚀 About ScholarGo

**ScholarGo** is a free, student-driven initiative dedicated to helping learners everywhere discover scholarships, grants, online courses, and educational resources — **absolutely free**! 🌍

We believe information should empower, not confuse. That's why we never charge fees, collect shady data, or make you jump through hoops. Our mission is to make quality education more accessible, less overwhelming, and fun to explore.

---

## ✨ Key Features

🎯 **Curated Scholarships** - Find the best fully funded programs for BS, MPhil, PhD, and more  
📚 **Educational Resources** - Learn Python, AI, ML, and other key academic tools with free resources  
💡 **Tech for Students** - Stay ahead with tools, apps, and tech that boost learning and productivity  
🔍 **Smart Search** - Quickly find scholarships, courses, and resources by category or keyword  
🌙 **Dark Mode** - Easy on the eyes for late-night study sessions  
📱 **Mobile Responsive** - Works seamlessly on all devices  
📬 **Newsletter** - Get the latest opportunities delivered to your inbox  
🆓 **100% Free** - No registration required, no hidden fees

---

## 🌐 Live Demo

**[Visit ScholarGo →](https://scholargo.netlify.app)**

<div align="center">
  
### 📸 Quick Preview

*A modern, clean interface designed for students by students*

</div>

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Animations**: [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
- **Icons**: [Font Awesome 6](https://fontawesome.com/)
- **Markdown Processing**: [Marked.js](https://marked.js.org/)
- **Content Management**: [Netlify CMS](https://www.netlifycms.org/)
- **Hosting**: [Netlify](https://www.netlify.com/)
- **Build Tools**: Node.js

---

## 📁 Project Structure

```
scholargo-site/
├── assets/           # Images, logos, and thumbnails
├── css/             # Stylesheets
├── js/              # JavaScript files
├── posts/           # Content in Markdown format
│   ├── scholarships/
│   ├── education/
│   └── technology/
├── admin/           # Netlify CMS configuration
├── index.html       # Homepage
├── scholarships.html
├── education.html
├── technology.html
├── about.html
├── contact.html
├── post.html        # Dynamic post viewer
├── generate-index.js    # Auto-generate JSON from Markdown
├── generate-sitemap.js  # SEO sitemap generator
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/WebsiteGuy01/scholargo-site.git
   cd scholargo-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate post indexes**
   ```bash
   npm run generate-posts
   ```

4. **Generate sitemap**
   ```bash
   npm run generate-sitemap
   ```

5. **Build everything**
   ```bash
   npm run build
   ```

6. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server like:
   npx serve .
   ```

---

## 📝 Adding Content

### Add a New Post

1. Create a Markdown file in the appropriate folder:
   - `posts/scholarships/` for scholarship opportunities
   - `posts/education/` for educational resources
   - `posts/technology/` for tech tools and updates

2. Use this frontmatter template:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2025-02-13"
   description: "Brief description of the post"
   thumbnail: "/assets/your-image.png"
   tags: ["scholarship", "fully-funded", "international"]
   ---

   Your content here...
   ```

3. Run the build script:
   ```bash
   npm run generate-posts
   ```

---

## 🎨 Features Showcase

### 🔍 Smart Search
Filter and search across all categories to find exactly what you need.

### 📱 Responsive Design
Beautiful on desktop, tablet, and mobile devices.

### 🌙 Dark Mode Toggle
Switch between light and dark themes with one click.

### ⚡ Fast & Lightweight
No heavy frameworks — pure performance.

### 📊 SEO Optimized
Automatic sitemap generation and meta tags for better discoverability.

---

## 🌍 Connect With Us

Stay updated and join our growing community:

[![YouTube](https://img.shields.io/badge/YouTube-Subscribe-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/@scholarshipportalofficial)
[![Facebook](https://img.shields.io/badge/Facebook-Follow-1877F2?style=for-the-badge&logo=facebook)](https://www.facebook.com/share/18rYAQAa3g/)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/scholarshipportalofficial)
[![X (Twitter)](https://img.shields.io/badge/X-Follow-000000?style=for-the-badge&logo=x)](https://x.com/Scholar_portal)
[![Telegram](https://img.shields.io/badge/Telegram-Join-26A5E4?style=for-the-badge&logo=telegram)](https://t.me/scholarshipportalofficial)
[![Messenger](https://img.shields.io/badge/Messenger-Chat-0078FF?style=for-the-badge&logo=messenger)](https://m.me/683992234795939)

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's:

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements

### How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This information is for reference only. Always confirm scholarship details and deadlines from the official source before applying.

---

## 💝 Support the Project

If ScholarGo has helped you in your educational journey, consider:

- ⭐ Starring this repository
- 📢 Sharing it with fellow students
- 🤝 Contributing to the project
- 💬 Spreading the word on social media

---

## 🙏 Acknowledgments

- Thanks to all students who inspired this project
- Special thanks to contributors and supporters
- Built with ❤️ by students, for students

---

<div align="center">

**Made with 💙 by the ScholarGo Team**

*Empowering students worldwide, one opportunity at a time* 🌟

[🌐 Visit ScholarGo](https://scholargo.netlify.app) | [📧 Contact Us](https://scholargo.netlify.app/contact.html)

</div>
