# Amber Bisht - DevOps & Full Stack Portfolio

A high-performance, responsive, and visually stunning portfolio built with **Next.js 16** and **Tailwind CSS 4**. Designed to showcase DevOps expertise, full-stack projects, and freelance work with a premium, dark-themed aesthetic.

## 🚀 Features

-   **Next-Gen Tech Stack**: Built on Next.js 16 (App Router not used here, strictly Pages router for SSG simplicity) and React 19.
-   **Makima-Red Aesthetics**: A custom dark theme with "Makima Red" accents and glassmorphism effects.
-   **Freelance Showcase**: Dedicated `/freelance` page to display contract work and side projects.
-   **GitHub Integration**: Live GitHub contribution graph using `react-github-calendar`, optimized for mobile with swipeable views.
-   **Responsive Design**: Fully responsive layout that adapts seamlessly from desktop to mobile.
-   **SEO Optimized**: Includes Sitemap, Robots.txt, and Open Graph tags for better social sharing.
-   **Static Site Generation (SSG)**: Blazing fast load times and easy deployment to static hosts.

## 🛠 Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/)
-   **Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)
-   **Data Visualization**: `react-github-calendar`

## 📂 Project Structure

```bash
├── components/       # Reusable UI components (Hero, ProjectCard, etc.)
├── data/            # JSON data files (Projects, Profile info)
├── pages/           # Next.js Routes (index, freelance, _app, etc.)
├── public/          # Static assets (images, robots.txt, sitemap.xml)
├── styles/          # Global styles and Tailwind configuration
└── utils/           # Helper functions (Tech Icons mapping)
```

## ⚡ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/amber-bisht/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 📝 Customization

To personalize this portfolio:
1.  Open `data/data.json`.
2.  Update the fields for `about`, `projects`, `experience`, `contact`, and `freelance`.
3.  Replace images in `public/images` or provide external URLs.

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Vercel will detect Next.js and deploy automatically.

---
Made with by [Amber Bisht](https://amberbisht.me)