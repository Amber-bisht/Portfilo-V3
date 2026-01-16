import { GitHubCalendar } from 'react-github-calendar';
import { useState, useEffect } from 'react';
import { Book, Users, Code } from 'lucide-react';

const GithubContributions = () => {
    const [stats, setStats] = useState({
        repos: 33,
        followers: 5,
        topLang: "TypeScript"
    });

    useEffect(() => {
        fetch('https://api.github.com/users/amber-bisht')
            .then(res => res.json())
            .then(data => {
                if (data.public_repos) {
                    setStats(prev => ({
                        ...prev,
                        repos: data.public_repos,
                        followers: data.followers
                    }));
                }
            })
            .catch(err => console.error("Failed to fetch github stats", err));
    }, []);

    return (
        <div className="w-full h-full flex flex-row items-center md:justify-between gap-6 px-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Calendar Section */}
            <div className="min-w-full md:min-w-0 md:flex-1 flex flex-col items-center justify-center snap-center">
                <GitHubCalendar
                    username="amber-bisht"
                    blockSize={13}
                    blockMargin={4}
                    fontSize={12}
                    transformData={(data) => {
                        const threeMonthsAgo = new Date();
                        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                        return data.filter(day => new Date(day.date) > threeMonthsAgo);
                    }}
                    theme={{
                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    colorScheme='dark'
                    renderColorLegend={() => <></>}
                    labels={{
                        totalCount: '{{count}} contributions in the last 3 months',
                        legend: {
                            less: '',
                            more: '',
                        },
                    }}
                />
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <span>Less</span>
                    <div className="flex gap-1">
                        {['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'].map((color) => (
                            <div key={color} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                        ))}
                    </div>
                    <span>More</span>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col gap-4 min-w-full md:min-w-[140px] md:border-l border-white/10 pl-0 md:pl-6 py-2 snap-center items-center md:items-start justify-center">
                <div className="flex items-center gap-3 group w-full md:w-auto justify-center md:justify-start">
                    <div className="p-2 bg-white/5 rounded-lg text-gray-300 group-hover:text-makima-red group-hover:bg-makima-red/10 transition-colors">
                        <Book size={18} />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-white leading-none">{stats.repos}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Public Repos</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 group w-full md:w-auto justify-center md:justify-start">
                    <div className="p-2 bg-white/5 rounded-lg text-gray-300 group-hover:text-makima-red group-hover:bg-makima-red/10 transition-colors">
                        <Code size={18} />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-white leading-none">{stats.topLang}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Top Language</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 group w-full md:w-auto justify-center md:justify-start">
                    <div className="p-2 bg-white/5 rounded-lg text-gray-300 group-hover:text-makima-red group-hover:bg-makima-red/10 transition-colors">
                        <Users size={18} />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-white leading-none">{stats.followers}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GithubContributions;
