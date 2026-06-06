import type { NextApiRequest, NextApiResponse } from 'next';
import rawData from '../../data/data.json';

const SITE = 'https://amberbisht.me';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// In-memory GitHub stats cache (survives warm Lambda/Node instances)
let githubCache: { stats: any; ts: number } | null = null;

/** Fetch GitHub stats, served from cache if fresh */
async function getGithubStats(username: string) {
    const now = Date.now();
    if (githubCache && now - githubCache.ts < CACHE_TTL) {
        return githubCache.stats;
    }

    try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
            headers: { 'User-Agent': 'portfolio-site' },
        });
        const json = await res.json();

        const stats = {
            public_repos: json.public_repos ?? rawData.about.fallbackRepos,
            followers: json.followers ?? rawData.about.fallbackFollowers,
            top_language: rawData.about.topLang,
            profile_url: `https://github.com/${username}`,
            avatar_url: json.avatar_url ?? null,
            bio: json.bio ?? null,
        };

        githubCache = { stats, ts: now };
        return stats;
    } catch {
        // Return fallback values on network error
        return {
            public_repos: rawData.about.fallbackRepos,
            followers: rawData.about.fallbackFollowers,
            top_language: rawData.about.topLang,
            profile_url: rawData.contact.github,
            avatar_url: null,
            bio: null,
        };
    }
}

/** Prepend domain to any relative image path */
function absImg(path: string): string {
    if (!path || path.startsWith('http')) return path;
    return `${SITE}${path}`;
}

/** Build the cleaned, AI-ready profile object */
async function buildProfile() {
    const d = JSON.parse(JSON.stringify(rawData));

    // Remove music — not relevant for AI evaluation
    delete d.music;

    // about.image + strip internal fallback fields
    d.about.image = absImg(d.about.image);
    delete d.about.fallbackRepos;
    delete d.about.fallbackFollowers;
    delete d.about.topLang;

    // seo.ogImage
    d.seo.ogImage = absImg(d.seo.ogImage);

    // certifications[].image
    if (Array.isArray(d.certifications)) {
        d.certifications = d.certifications.map((c: any) => ({
            ...c,
            image: absImg(c.image),
        }));
    }

    // projects[].image
    if (Array.isArray(d.projects)) {
        d.projects = d.projects.map((p: any) => ({
            ...p,
            image: absImg(p.image),
        }));
    }

    // freelance[].image
    if (Array.isArray(d.freelance)) {
        d.freelance = d.freelance.map((p: any) => ({
            ...p,
            image: absImg(p.image),
        }));
    }

    // techStack — strip icon keys (React Icons identifiers, useless for AI)
    if (d.techStack && typeof d.techStack === 'object') {
        for (const category of Object.keys(d.techStack)) {
            if (Array.isArray(d.techStack[category])) {
                d.techStack[category] = d.techStack[category].map(
                    ({ icon, ...rest }: any) => rest
                );
            }
        }
    }

    // Inject live GitHub stats (cached 1hr)
    const username = rawData.contact.github.replace('https://github.com/', '');
    d.github_stats = await getGithubStats(username);

    return d;
}

/**
 * GET /api/profile
 * Returns the full portfolio data — images with absolute URLs,
 * live GitHub stats (1hr cache), music stripped.
 * Paste the URL into ChatGPT / Claude for instant AI context.
 */
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    const profile = await buildProfile();

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).json(profile);
}
