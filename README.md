# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a Postman-inspired UI design with SSG (Static Site Generation) rendering.

## Features

- **Static Site Generation (SSG)** - Fast loading and SEO optimized
- **JSON Data Format** - Portfolio data stored in JSON format
- **Postman-inspired UI** - Clean, modern design with orange accent colors
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **TypeScript** - Full type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

## Project Structure

```
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Projects.tsx    # Projects showcase
│   ├── Experience.tsx  # Work experience
│   ├── Contact.tsx     # Contact information
│   └── Footer.tsx      # Site footer
├── data/               # Portfolio data files
│   └── portfolio.json  # JSON format
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   └── index.tsx      # Main portfolio page
├── public/             # Static assets
│   └── images/        # Project images
└── styles/            # Global styles
    └── globals.css    # Tailwind CSS imports
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customizing Your Portfolio

### Data Format

The portfolio uses JSON format for data storage in `data/portfolio.json`.

### Updating Portfolio Content

Edit the `data/portfolio.json` file:

- **Personal Information**: Update name, tagline, and description
- **Projects**: Add your projects with descriptions, technologies, and links
- **Experience**: Add your work experience with achievements
- **Contact**: Update your contact information and social links

### Adding Project Images

1. Add your project images to the `public/images/` directory
2. Update the `image` field in your data file to point to the correct image path
3. Example: `"image": "/images/my-project.jpg"`

### Building for Production

```bash
npm run build
npm start
```

The built files will be in the `out/` directory, ready for deployment to any static hosting service.

## Deployment

This project is configured for static export and can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS S3**
- Any static hosting service

## Technologies Used

- **Next.js 14** - React framework with SSG
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

## License

MIT License - feel free to use this template for your own portfolio!
