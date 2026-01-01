import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Cinzel } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={`${inter.variable} ${cinzel.variable} font-sans`}>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;
