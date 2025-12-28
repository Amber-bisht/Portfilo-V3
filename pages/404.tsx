import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Custom404() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 selection:bg-white selection:text-black font-sans">
      <div className="relative">
        <h1 className="text-[12rem] sm:text-[16rem] font-black text-neutral-900 select-none leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl sm:text-3xl font-bold text-white mb-2">Page Not Found</p>
          <div className="w-16 h-1 bg-orange-500 rounded-full mb-6"></div>
        </div>
      </div>

      <p className="text-neutral-400 max-w-md text-center mb-8 font-light">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-all duration-200"
      >
        <Home className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
    </div>
  );
}
