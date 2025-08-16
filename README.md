# Questify AI 🤖

An intelligent AI-powered interview preparation platform that helps job seekers practice and master their interview skills through personalized mock interviews and real-time feedback.

![Questify AI Banner](./public/banner.png)


## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- **🤖 AI-Powered Question Generation** - Generate tailored interview questions based on job descriptions and resumes
- **📄 Resume Upload & Analysis** - Upload your resume for AI-powered analysis and personalized questions
- **🎯 Mock Interview Sessions** - Practice with realistic interview scenarios
- **📊 Progress Tracking** - Track your interview preparation progress
- **🔐 Secure Authentication** - Clerk-based authentication system
- **☁️ Cloud Storage** - Resume storage using ImageKit CDN

### Advanced Features
- **Real-time Feedback** - Get instant feedback on your responses
- **Job-Specific Preparation** - Tailored questions based on specific job roles
- **Interview History** - Keep track of all your practice sessions
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Shadcn UI** - Accessible UI components

### Backend
- **Convex** - Full-stack TypeScript backend platform
- **Next.js API Routes** - Serverless API endpoints
- **n8n** - Workflow automation for AI processing

### External Services
- **Clerk** - Authentication & user management
- **ImageKit** - Image and file storage CDN

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

## 🏗 Architecture

```
Questify AI/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (routes)/          # Protected routes
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # Reusable UI components
├── convex/               # Convex backend
│   ├── schema.ts         # Database schema
│   ├── interviews.ts     # Interview operations
│   └── users.ts          # User operations
├── lib/                  # Utility functions
├── public/               # Static assets
└── context/              # React contexts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Convex account
- Clerk account
- ImageKit account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/questify-ai.git
   cd questify-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Convex
   CONVEX_DEPLOYMENT=your_convex_deployment_url

   # ImageKit
   IMAGEKIT_URL_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_URL_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

   # n8n Webhook
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/generate-interview-question
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
questify-ai/
├── 📁 app/
│   ├── 📁 (auth)/
│   │   ├── 📁 sign-in/
│   │   └── 📁 sign-up/
│   ├── 📁 (routes)/
│   │   ├── 📁 _components/
│   │   │   ├── 📄 CreateDialog.tsx
│   │   │   └── 📄 JobDescription.tsx
│   │   └── 📁 interview/
│   │       └── 📁 [interviewId]/
│   │           └── 📄 page.tsx
│   ├── 📁 api/
│   │   └── 📁 generate-interview-questions/
│   │       └── 📄 route.tsx
│   ├── 📄 layout.tsx
│   ├── 📄 page.tsx
│   └── 📄 globals.css
├── 📁 components/
│   └── 📁 ui/
│       ├── 📄 HeroSection.tsx
│       ├── 📄 Navbar.tsx
│       ├── 📄 button.tsx
│       └── 📄 dialog.tsx
├── 📁 convex/
│   ├── 📄 schema.ts
│   ├── 📄 interviews.ts
│   ├── 📄 users.ts
│   └── 📁 _generated/
├── 📁 lib/
│   └── 📄 utils.ts
├── 📁 public/
│   ├── 📄 images/
│   └── 📄 icons/
├── 📁 context/
│   └── 📄 UserDetailContext.tsx
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
└── 📄 README.md
```

## 🔌 API Endpoints

### Generate Interview Questions
- **POST** `/api/generate-interview-questions`
- **Description**: Generate personalized interview questions based on resume and job description
- **Request Format**: FormData with:
  - `resume` (optional): Resume file
  - `jobDesc`: Job description text
  - `jobTitle`: Job title
- **Response**:
  ```json
  {
    "questions": [...],
    "resumeUrl": "https://ik.imagekit.io/..."
  }
  ```

## 🗄 Database Schema

### Users Table
```typescript
{
  name: string,
  imageUrl: string,
  email: string
}
```

### Interview Sessions Table
```typescript
{
  user_id: reference("users"),
  interviewQuestions: any[],
  resumeUrl: string | null,
  status: string,
  jobTitle: string | null,
  jobDesc: string | null
}
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `CONVEX_DEPLOYMENT` | Convex deployment URL | ✅ |
| `IMAGEKIT_URL_PUBLIC_KEY` | ImageKit public key | ✅ |
| `IMAGEKIT_URL_PRIVATE_KEY` | ImageKit private key | ✅ |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | ✅ |
| `N8N_WEBHOOK_URL` | n8n webhook URL | ✅ |

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📸 Screenshots

### n8n Workflow
![Workflow Automation](link)

### Landing Page
![Landing Page](./public/screenshots/landing.png)

### Interview Creation
![Create Interview](./public/screenshots/create-interview.png)

### Interview Session
![Interview Session](./public/screenshots/interview-session.png)

### Results Dashboard
![Results](./public/screenshots/results.png)

## 🛣 Roadmap

- [ ] **Voice Recognition** - Practice with voice-based interviews
- [ ] **Video Recording** - Record and review your responses
- [ ] **AI Feedback** - Detailed AI-powered feedback on answers
- [ ] **Interview Analytics** - Advanced performance analytics
- [ ] **Mobile App** - Native mobile applications
- [ ] **Team Collaboration** - Practice with peers
- [ ] **Interview Templates** - Pre-built interview templates
- [ ] **Integration** - LinkedIn and job board integrations

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Convex](https://convex.dev/)
- Authentication by [Clerk](https://clerk.com/)
- Icons by [React Icons]([https://tabler-icons.io/](https://react-icons.github.io/react-icons/))
- Animations by [Framer Motion](https://framer.com/motion/)

---

<div align="center">
  <p>Built with ❤️ by the Questify AI Team</p>
  <p>
    <a href="https://github.com/AnandMukherjee2004/questify-ai">GitHub</a> •
  </p>
</div>
