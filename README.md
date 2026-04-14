# 🚀 Next-Gen Cinematic Portfolio

A high-performance, interactive, and visually stunning portfolio built with **Next.js 16** and **Tailwind CSS 4**. This portfolio pushes the boundaries of modern web technologies by blending aggressive performance optimizations, an immersive cinematic mode, and a highly interactive real-time AI companion.

## 🌟 Key Architectural Features

### 1. 🤖 Interactive AI Mascot (Reze)
Unlike static portfolios, this site acts as a living application featuring an integrated AI assistant ("Reze") to answer visitor queries and interact with the UI.
* **Real-time Synchronization**: The AI has active awareness of what you are seeing and hearing on the page.
* **Voice Interaction**: Users can hold conversations with the mascot using seamless web audio inputs.
* **Contextual Control**: The AI is hooked directly into the site's ecosystem (like the Music Player state) and can interact with components on your command.

### 2. 🎵 Persistent Cinematic Audio Player
We've built a global "Cinematic Mode" which pairs a dark, immersive aesthetic with a fully-featured background music player.
* **Persistent State Tracking**: Audio playback isn't tied to a single component. The music player state (current track index and precise timestamp) is dynamically synchronized with Local Storage. 
* **Seamless Navigation**: As you navigate between pages or refresh the browser, the audio picks right back up where it left off without jarring restarts or interruptions.
* **Atmospheric Theming**: Activating the music globally shifts the portfolio aesthetics, dynamically swapping out background compositions and dimming elements to create a premium, focused state.

### 3. ⚡ Partytown Web-Worker Optimization
To achieve Lighthouse PageSpeed scores of 90+ without sacrificing heavy analytics, we employ radical performance techniques to free up the browser's Main Thread.
* **Why `@builder.io/partytown`?**: Extremely heavy session recording scripts (like Microsoft Clarity) and tracking algorithms (Google Tag Manager) normally dominate the browser's Main Thread, causing massive Total Blocking Time (TBT) delays for users opening the site. 
* **The Web Worker Solution**: Partytown acts as a reverse proxy. It intercepts these analytics scripts and forces them to execute entirely inside a background Web Worker process. 
* **The Result**: The UI elements, scroll physics, and heavy React lifecycles execute instantly at 60fps, completely blind to the heavy analytics calculations occurring underneath the surface.

### 4. 📈 Build-Time GitHub Statistics (SSG)
* **Zero-Latency Rendering**: Using Next.js `getStaticProps` alongside a Background Revalidation policy (`revalidate: 3600`), the portfolio pulls live contribution data from the GitHub API and bakes it directly into the server HTML.
* **Visual Graph**: Integrates `react-activity-calendar` natively mapped to our global theme for a sleek, interactive contribution visualizer.

## 🛠 Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Web Workers**: [@builder.io/partytown](https://partytown.builder.io/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)
-   **Data Visualization**: `react-activity-calendar`

## 📂 Project Structure

```bash
├── components/       # Reusable UI components (Hero, AI Mascot, Music Player)
├── data/             # JSON data files (Projects, Profile info)
├── pages/            # Next.js Routes (index, freelance, _app, etc.)
├── public/           # Static assets & Partytown lib configuration
├── styles/           # Global styles and Tailwind configuration
└── utils/            # Helper functions
```

## ⚡ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Amber-bisht/Portfilo-V3
    cd portfolio
    ```

2.  **Install dependencies** *(Note: this ensures Partytown binaries are properly synced)*:
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
    # Note: Our custom postbuild script will automatically securely map the Partytown libraries into your public output folder.
    ```

---
Made by [Amber Bisht](https://amberbisht.me). 