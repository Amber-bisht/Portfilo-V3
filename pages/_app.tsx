import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Cinzel } from 'next/font/google';
import Script from 'next/script';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

import Mascot from '../components/Mascot';
import PochitaFollower from '../components/PochitaFollower';
import { ThemeProvider } from '../context/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <main className={`${inter.variable} ${cinzel.variable} font-sans`}>
                {/* Google Analytics - Reverted to standard strategy for reliability */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-JC7JKNWZ0W"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-JC7JKNWZ0W');
                    `}
                </Script>

                {/* Microsoft Clarity */}
                <Script id="microsoft-clarity" strategy="afterInteractive">
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
