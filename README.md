# 🚀 AMBERBISHT.ME

A high-performance, professional, and visually cohesive portfolio built with **Next.js 16** and **Tailwind CSS 4**. This project emphasizes architectural reliability, aggressive performance optimization, and a unified design language tailored for modern web standards.

## 🌟 Key Architectural Features

### 1. 🎵 Persistent Audio Engine (Cross-Tab Sync)
The portfolio features a sophisticated background audio system designed for uninterrupted immersion.
*   **Persistent Playback**: Leveraging a global React context mounted in `_app.tsx`, the audio continues seamlessly across route changes.
*   **Smart Resume Logic**: Utilizing `localStorage`, the player remembers the exact track and timestamp, resuming playback automatically even after a full browser refresh.
*   **Cross-Tab Synchronization**: Implements the Storage API to synchronize playback state (track index and play/pause status) in real-time across all open browser tabs.
*   **LCP Optimized**: Initialized with a 2-second deferral and dynamic imports to ensure zero impact on the critical rendering path.

### 2. ⚡ Aggressive Performance Optimization
Designed to achieve elite Lighthouse scores by prioritizing the main thread and optimizing the critical path.
*   **Deferred Scripting**: All heavy external scripts (Analytics, Clarity, YouTube API) are loaded using `lazyOnload` or deferred timers to prioritize First Contentful Paint (FCP).
*   **Dynamic Component Loading**: Heavy UI elements like the Music Player and interactive followers are dynamically imported with SSR disabled, reducing initial bundle weight.
*   **Optimized Image Delivery**: Project screenshots are pre-processed into high-performance WebP formats and utilized with Next.js `priority` loading for immediate Largest Contentful Paint (LCP).
*   **Modern Transpilation**: Targets modern browsers via a strict `browserslist` to eliminate legacy polyfills and minimize JavaScript execution time.

### 3. 🎨 Unified Design System
A cohesive aesthetic that blends professional minimalism with premium cinematic touches.
*   **Refined Typography**: Uses a dual-font system pairing the elegant **Cinzel** for headings with the high-legibility **Inter** for body content.
*   **Standardized UI Components**: All project and blog cards follow a strict design language featuring `rounded-3xl` containers, translucent `neutral-900/50` backgrounds, and dynamic black framing.
*   **Interactive Micro-animations**: Subtle hover effects and custom cursor followers provide an "alive" feel without compromising performance.

### 4. 📈 Build-Time GitHub Statistics (SSG)
*   **Static Site Generation**: Using Next.js `getStaticProps` alongside a Background Revalidation policy (`revalidate: 3600`), the portfolio bakes live contribution data directly into the HTML.
*   **Activity Visualizer**: Integrates a custom-mapped GitHub contribution calendar that respects the global dark theme.

## 🛠 Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-   **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/)
-   **Data Visualization**: `react-activity-calendar`

## 📂 Project Structure

```bash
├── components/       # Optimized UI components (ProjectCard, MusicPlayer, Hero)
├── data/             # Central source of truth (Projects, Experience, Music)
├── pages/            # Next.js Routes & Global App Shell
├── public/           # Optimized WebP assets and static files
└── styles/           # Global design system & Tailwind layers
```

## ⚡ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Amber-bisht/Portfilo-V3
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

4.  **Build for production**:
    ```bash
    npm run build
    npm start
    ```

---
Made by [Amber Bisht](https://amberbisht.me). 