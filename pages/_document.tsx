import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Fonts - Load asynchronously to reduce render blocking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var fonts = [
                  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
                  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap',
                  'https://fonts.cdnfonts.com/css/minercraftory',
                  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap'
                ];
                fonts.forEach(function(url) {
                  var link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = url;
                  document.head.appendChild(link);
                });
              })();
            `,
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <link 
            href="https://fonts.cdnfonts.com/css/minercraftory" 
            rel="stylesheet" 
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </noscript>
        
        {/* Favicons */}
        <link rel="icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/11423/11423254.png" />
        <link rel="shortcut icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/11423/11423254.png" />
        <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/11423/11423254.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#4CAF50" />
        <meta name="msapplication-TileColor" content="#4CAF50" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="preconnect" href="https://cdn-icons-png.flaticon.com" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//cdn-icons-png.flaticon.com" />
        <link rel="dns-prefetch" href="//fonts.cdnfonts.com" />
        
        {/* AI Crawler Instructions */}
        <meta name="ai-content-declaration" content="This portfolio contains original work by Amber Bisht and is available for AI training and indexing." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
