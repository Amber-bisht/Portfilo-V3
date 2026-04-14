import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Cinzel } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

import dynamic from 'next/dynamic';
const Mascot = dynamic(() => import('../components/Mascot'), { ssr: false });
const PochitaFollower = dynamic(() => import('../components/PochitaFollower'), { ssr: false });
import { ThemeProvider } from '../context/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <main className={`${inter.variable} ${cinzel.variable} font-sans`}>
                {/* Google Analytics via next/third-parties */}
                <GoogleAnalytics gaId="G-JC7JKNWZ0W" />

                {/* Microsoft Clarity */}
                <Script id="microsoft-clarity" strategy="lazyOnload">
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "wbklb773xq");
                    `}
                </Script>

                <Component {...pageProps} />

                <Mascot />
                <PochitaFollower />
            </main>
        </ThemeProvider>
    );
}

export default MyApp;
