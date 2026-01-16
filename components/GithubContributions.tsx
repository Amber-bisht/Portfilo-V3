import { GitHubCalendar } from 'react-github-calendar';

const GithubContributions = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-makima-red">
                CODE FREQUENCY
            </h2>
            <div className="bg-black border border-white/10 p-4 md:p-8 rounded-xl shadow-lg hover:border-makima-red/40 transition-colors duration-300 w-full max-w-7xl overflow-hidden flex justify-center">
                <GitHubCalendar
                    username="amber-bisht"
                    blockSize={12}
                    blockMargin={5}
                    fontSize={14}
                    theme={{
                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'], // Standard GitHub green
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'], // GitHub Dark Green
                    }}
                    colorScheme='dark'
                    labels={{
                        totalCount: '{{count}} contributions in the last year',
                    }}
                />
            </div>
        </div>
    );
};

export default GithubContributions;
