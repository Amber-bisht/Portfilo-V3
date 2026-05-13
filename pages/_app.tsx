import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Cinzel } from 'next/font/google';
import Script from 'next/script';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' });

const PochitaFollower = dynamic(() => import('../components/PochitaFollower'), { ssr: false });
const MusicPlayer = dynamic(() => import('../components/MusicPlayer'), { ssr: false });
import data from '../data/data.json';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        console.log('MyApp mounted');
    }, []);

    return (
        <>
            {/* Global Persistent Music Player Logic */}
            <MusicPlayer key="global-music-player" tracks={data.music} isGlobal={true} />
            <main className={`${inter.variable} ${cinzel.variable} font-sans`}>
            {/* Google Analytics - Moved to main thread with lazy loading */}
            <Script
                strategy="lazyOnload"
                src="https://www.googletagmanager.com/gtag/js?id=G-JC7JKNWZ0W"
            />
            <Script strategy="lazyOnload" id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-JC7JKNWZ0W', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>

            {/* Microsoft Clarity - Moved to main thread with lazy loading */}
            <Script strategy="lazyOnload" id="microsoft-clarity">
                {`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "wbklb773xq");
                `}
            </Script>

            <Component {...pageProps} />
            <PochitaFollower />
        </main>
        </>
    );
}

export default MyApp;
