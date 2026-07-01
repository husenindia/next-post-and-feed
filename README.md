# Next.js Post & Feed

A modern **Post & Feed** application built with **Next.js 16**, demonstrating real-world data mutation using **Server Actions**, **Optimistic UI**, **Cache Revalidation**, and **SQLite**. Users can create posts, upload images, browse the latest feed, and like/unlike posts with an instant user experience.

---

## 🌐 Live Demo

**Live Application:** https://next-post-and-feed-production.up.railway.app/

## 📂 GitHub Repository

**Source Code:** https://github.com/husenindia/next-post-and-feed

---

# 📸 Preview

> Add project screenshots here.

---

# ✨ Features

- 📝 Create a new post
- 📰 Browse all posts in the feed
- ❤️ Like / Unlike posts
- 👤 User-wise Like functionality
- 📊 Live Like Count
- 🖼️ Cloudinary Image Upload
- ⚡ Optimistic UI using `useOptimistic`
- 🔄 Automatic cache refresh using `revalidatePath`
- 🚀 Next.js Server Actions
- 📱 Fully Responsive UI
- 🎨 Modern UI built with Tailwind CSS
- 💾 SQLite Database
- ☁️ Deployed on Railway

---

# 🚀 Next.js Features Demonstrated

This project focuses on modern **Next.js App Router** concepts.

### ✅ App Router

Built completely using the new App Router architecture.

### ✅ Server Components

Server Components are used wherever possible for better performance.

### ✅ Server Actions

Server Actions are used for:

- Creating a Post
- Liking a Post
- Unliking a Post

No REST APIs are required for these operations.

### ✅ useOptimistic

The Like button updates instantly before the server responds, providing a smooth user experience.

### ✅ revalidatePath

After creating a new post or updating likes, the feed automatically refreshes using:

```ts
revalidatePath("/");
```

without manually fetching data again.

### ✅ Loading UI

Route-based loading screens are implemented using Next.js loading files.

### ✅ Image Optimization

All images are rendered using the Next.js `Image` component.

---

# 🛠️ Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- App Router

## Backend

- Next.js Server Actions
- SQLite
- better-sqlite3

## Cloud Storage

- Cloudinary

## Deployment

- Railway Cloud

---

# 📦 Packages Used

- next
- react
- react-dom
- typescript
- tailwindcss
- better-sqlite3
- cloudinary

---

# 📁 Project Structure

```text
next-post-and-feed/
│
├── actions/
│   └── posts-action.tsx          # Server Actions (Create Post, Like/Unlike)
│
├── app/
│   ├── api/
│   │   └── posts/
│   │
│   ├── feed/
│   │
│   ├── new-post/
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── form-submit.tsx
│   ├── header.tsx
│   ├── like-button.tsx
│   ├── navlinks.tsx
│   └── post.tsx
│
├── lib/
│   ├── cloudinary.js
│   ├── format.js
│   └── posts.tsx
│
├── public/
│
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── posts.db
├── README.md
└── tsconfig.json
```

---

# 💾 Database

SQLite is used for local data persistence.

The application stores:

- Users
- Posts
- Likes

Database relationships include:

- One User → Many Posts
- One User → Many Likes
- One Post → Many Likes

---

# ☁️ Cloudinary Integration

Instead of storing uploaded images locally, all images are uploaded to **Cloudinary**.

Benefits:

- Faster delivery
- Optimized images
- CDN support
- No local storage required

---

# ❤️ Like System

Each user can:

- Like a post
- Unlike a post

The application keeps track of:

- Current user's like status
- Total number of likes

The UI updates immediately using **useOptimistic**, while the database is updated through a **Server Action**.

---

# 📱 Responsive Design

The application is fully responsive and works across:

- Desktop
- Laptop
- Tablet
- Mobile

Built entirely with **Tailwind CSS**.

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/husenindia/next-post-and-feed.git
```

Navigate into the project

```bash
cd next-post-and-feed
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🔑 Environment Variables

Create a `.env.local` file.

```env
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET
```

---

# 📚 What You'll Learn

This project demonstrates practical Next.js development including:

- App Router
- Server Components
- Server Actions
- Data Mutation
- Cache Revalidation
- Optimistic Updates
- SQLite Integration
- Cloudinary Image Upload
- Tailwind CSS
- TypeScript
- Responsive Design
- Railway Cloud Deployment

---

# 🚀 Deployment

The project is deployed on **Railway Cloud**.

Live URL:

https://next-post-and-feed-production.up.railway.app/

---

# 👨‍💻 Author

**Husen Telwala**

GitHub: https://github.com/husenindia

---

# ⭐ If you found this project helpful, don't forget to star the repository!
