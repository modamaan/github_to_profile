# DevTree

**Turn your GitHub into a stunning portfolio. Powered by AI, zero coding required.**

DevTree is an AI-powered portfolio generator that automatically transforms GitHub profiles into beautiful, professional developer portfolios. Simply enter a GitHub username and get a fully-featured, SEO-optimized portfolio website instantly.

![DevTree Banner](https://via.placeholder.com/1200x400/000000/FFFFFF?text=DevTree+-+GitHub+to+Portfolio+Builder)

## ✨ Features

### 🚀 Core Features

- **Instant Portfolio Generation** - Enter any GitHub username and get a complete portfolio in seconds
- **AI-Powered Content** - Groq AI generates professional summaries, highlights, and descriptions
- **Zero Configuration** - No coding, no setup, just enter a username
- **Beautiful Themes** - Multiple pre-designed themes (Default, Vintage, Mono, Neobrutalism, T3 Chat)
- **Two Layout Modes** - Classic timeline or modern Bento grid layout
- **Fully Responsive** - Perfect on desktop, tablet, and mobile devices

### 🎨 Design & Customization

- **Dark Theme** - Modern black background with clean aesthetics
- **Theme Switcher** - Toggle between light and dark modes
- **Layout Toggle** - Switch between Classic and Bento layouts
- **Custom URLs** - Create memorable URLs (e.g., `devtree.com/john-doe`)
- **Share Features** - Easy sharing via Twitter, LinkedIn, WhatsApp

### 📊 GitHub Integration

- **Profile Data** - Name, bio, avatar, location, social links
- **Repository Stats** - Stars, forks, languages, topics
- **Contribution Graph** - Visual activity timeline
- **Top Projects** - AI-selected featured repositories
- **PR Analytics** - Pull requests grouped by organization
- **Language Stats** - Top programming languages with percentages

### 🤖 AI Capabilities

- **Smart Summaries** - Professional "About Me" sections
- **Project Highlights** - AI-generated project descriptions
- **SEO Optimization** - Auto-generated meta tags and descriptions
- **Skill Extraction** - Identifies key technologies and skills

### 🔐 Authentication & Accounts

- **GitHub OAuth** - Secure login with GitHub
- **User Dashboard** - Manage your portfolio settings
- **Custom URLs** - Register personalized portfolio links
- **Profile Management** - Edit and customize your portfolio

### ⚡ Performance

- **Smart Caching** - Database-backed caching (1-hour TTL)
- **Fast Loading** - Optimized API calls and data fetching
- **CDN Ready** - Static assets optimized for CDN delivery
- **SEO Optimized** - Dynamic metadata for search engines

## 🎯 How It Works

```mermaid
graph LR
    A[Enter GitHub Username] --> B[Fetch GitHub Data]
    B --> C[AI Processing]
    C --> D[Generate Portfolio]
    D --> E[Beautiful Portfolio Page]
    E --> F[Share & Customize]
```

1. **Enter Username** - Visit DevTree and enter any GitHub username
2. **Data Fetching** - System fetches profile, repos, and contributions from GitHub
3. **AI Analysis** - Groq AI analyzes the data and generates professional content
4. **Portfolio Creation** - Complete portfolio page is generated with all sections
5. **Customization** - Choose themes, layouts, and create custom URLs

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20 or higher
- **PostgreSQL** database
- **Groq API Key** - Get one at [groq.com](https://groq.com)
- **GitHub Token** (optional) - For higher rate limits

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/modamaan/DevTree
cd DevTree
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required
GROQ_API_KEY=your_groq_api_key_here
API_KEYS=key1,key2,key3
DATABASE_URL=postgresql://user:password@host:port/database

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000

# Better Auth
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# Optional
GITHUB_TOKEN=your_github_token
CACHE_ENABLED=true
DEFAULT_CACHE_TTL=3600
NODE_ENV=development
```

4. **Set up the database**

```bash
npm run db:push
npm run db:generate
```

5. **Run development server**

```bash
npm run dev
```

6. **Open your browser**

```
http://localhost:3000
```

Enter a GitHub username to generate a portfolio!

## 📁 Project Structure

```
DevTree/
├── app/
│   ├── (portfolio)/
│   │   └── [username]/          # Dynamic portfolio pages
│   ├── api/
│   │   ├── auth/                # Authentication endpoints
│   │   ├── custom-url/          # Custom URL management
│   │   ├── github/              # GitHub API integration
│   │   ├── linkedin/            # LinkedIn integration (WIP)
│   │   ├── screenshot/          # Screenshot generation
│   │   └── user/                # User data endpoints
│   ├── dashboard/               # User dashboard
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── auth/                    # Authentication components
│   ├── portfolio/               # Portfolio sections
│   │   ├── introduction-section.tsx
│   │   ├── capabilities-section.tsx
│   │   ├── work-gallery.tsx
│   │   ├── proof-of-work-section.tsx
│   │   ├── prs-by-org-section.tsx
│   │   ├── classic-layout.tsx
│   │   └── bento-layout.tsx
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── modules/
│   │   ├── github/              # GitHub API client
│   │   ├── groq/                # AI processing
│   │   └── linkedin/            # LinkedIn integration
│   ├── utils/                   # Utility functions
│   └── config/                  # Configuration
├── types/                       # TypeScript types
└── prisma/                      # Database schema
```

## 🎨 Themes & Layouts

### Available Themes

- **Default** - Clean, modern design
- **Vintage** - Classic, retro aesthetic
- **Mono** - Minimalist monochrome
- **Neobrutalism** - Bold, brutalist design
- **T3 Chat** - Tech-inspired theme

### Layout Options

- **Classic** - Traditional vertical timeline
- **Bento** - Modern grid-based layout

## 🔧 API Endpoints

### Public Endpoints

```
GET  /                           # Landing page
GET  /[username]                 # Portfolio page
GET  /api/github/stars           # GitHub stars count
```

### Authenticated Endpoints

```
GET  /dashboard                  # User dashboard
POST /api/custom-url/register    # Register custom URL
GET  /api/custom-url/check       # Check URL availability
```

### User Data Endpoints

```
GET  /api/user/[username]/profile        # User profile
GET  /api/user/[username]/about          # About section
GET  /api/user/[username]/projects       # Projects
GET  /api/user/[username]/contributions  # Contribution graph
GET  /api/user/[username]/prs-by-org     # PRs by organization
```

## 🗄️ Database Schema

### Key Tables

- **users** - User accounts and authentication
- **profiles** - Cached GitHub profile data
- **custom_urls** - Custom URL mappings
- **sessions** - User sessions
- **accounts** - OAuth accounts

## 🤖 AI Integration

DevTree uses **Groq AI** with the `llama-3.3-70b-versatile` model for:

- **Profile Summaries** - Professional "About Me" sections
- **Project Descriptions** - Engaging project highlights
- **SEO Content** - Meta descriptions and keywords
- **Skill Analysis** - Technology stack identification

## 🎯 Features Roadmap

### ✅ Completed

- [x] GitHub profile integration
- [x] AI-powered content generation
- [x] Multiple themes and layouts
- [x] Custom URL support
- [x] Dark theme
- [x] Responsive design
- [x] Share functionality
- [x] PR analytics
- [x] Contribution graphs

### 🚧 In Progress

- [ ] LinkedIn OAuth integration
- [ ] Experience & education sections
- [ ] Skills showcase

### 📋 Planned

- [ ] Blog integration
- [ ] Project screenshots
- [ ] Analytics dashboard
- [ ] Export to PDF
- [ ] Custom domains
- [ ] Team portfolios
- [ ] Portfolio templates
- [ ] Video introductions

## 🛠️ Tech Stack

- **Framework** - Next.js 15 (App Router)
- **Language** - TypeScript
- **Styling** - Tailwind CSS
- **Database** - PostgreSQL + Drizzle ORM
- **Authentication** - Better Auth
- **AI** - Groq (Llama 3.3)
- **APIs** - GitHub GraphQL API
- **Deployment** - Vercel (recommended)

## 🌐 Environment Variables

| Variable               | Required | Description                       |
| ---------------------- | -------- | --------------------------------- |
| `GROQ_API_KEY`         | ✅       | Groq AI API key                   |
| `API_KEYS`             | ✅       | Comma-separated internal API keys |
| `DATABASE_URL`         | ✅       | PostgreSQL connection string      |
| `GITHUB_CLIENT_ID`     | ⚠️       | GitHub OAuth client ID            |
| `GITHUB_CLIENT_SECRET` | ⚠️       | GitHub OAuth client secret        |
| `BETTER_AUTH_SECRET`   | ✅       | Secret for auth encryption        |
| `BETTER_AUTH_URL`      | ✅       | Base URL for auth callbacks       |
| `NEXT_PUBLIC_SITE_URL` | ✅       | Public site URL                   |
| `GITHUB_TOKEN`         | ❌       | Personal access token (optional)  |
| `CACHE_ENABLED`        | ❌       | Enable/disable caching            |
| `DEFAULT_CACHE_TTL`    | ❌       | Cache TTL in seconds              |

## 📝 Usage Examples

### Generate a Portfolio

```
https://devtree.com/octocat
```

### Custom URL

```
https://devtree.com/john-doe
```

### With Layout

```
https://devtree.com/octocat?layout=bento
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** - For the amazing AI API
- **GitHub** - For the comprehensive GraphQL API
- **Vercel** - For the excellent hosting platform
- **Next.js** - For the powerful React framework

## 📧 Support

- **Issues** - [GitHub Issues](https://github.com/modamaan/DevTree/issues)
- **Discussions** - [GitHub Discussions](https://github.com/modamaan/DevTree/discussions)
- **Email** - support@devtree.com

## ☕ Support the Project

If you find DevTree useful, consider supporting the project:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://www.buymeacoffee.com/modamaan)

---

**Built with ❤️ by [Mohamed Amaan](https://github.com/modamaan)**

**DevTree** - Turn your GitHub into a stunning portfolio
