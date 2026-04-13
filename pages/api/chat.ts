import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const TAVILY_KEYS = [
    process.env.TAVILY_API_KEY_1,
    process.env.TAVILY_API_KEY_2
].filter(Boolean);

async function web_search(query: string) {
    if (TAVILY_KEYS.length === 0) {
        return "Search tool is currently unavailable. Please provide a valid TAVILY_API_KEY.";
    }

    for (const key of TAVILY_KEYS) {
        try {
            const response = await fetch('https://api.tavily.com/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: key,
                    query: query,
                    search_depth: "basic",
                    include_answer: true,
                    max_results: 5,
                }),
            });

            if (!response.ok) {
                console.warn(`Tavily key ${key?.slice(0, 10)}... failed with status ${response.status}`);
                continue; // Try next key
            }

            const data = await response.json();
            return JSON.stringify(data.results.map((r: any) => ({
                title: r.title,
                url: r.url,
                content: r.content
            })));
        } catch (error) {
            console.error(`Search error with key ${key?.slice(0, 10)}...:`, error);
        }
    }

    return "Failed to perform web search after trying all available keys.";
}

async function fetch_github_data(endpoint: string) {
    try {
        const response = await fetch(`https://api.github.com/${endpoint}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Amber-Bisht-Portfolio-AI'
            }
        });
        if (!response.ok) return `Failed to fetch from GitHub: ${response.statusText}`;
        const data = await response.json();
        if (Array.isArray(data)) {
            return JSON.stringify(data.slice(0, 10).map((repo: any) => ({
                name: repo.name,
                stars: repo.stargazers_count,
                lang: repo.language,
                desc: repo.description,
                url: repo.html_url
            })));
        }
        return JSON.stringify(data);
    } catch (error) {
        return `Error fetching GitHub data: ${String(error)}`;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, musicContext } = req.body;
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    let dynamicSystemPrompt = `CRITICAL: The current date is ${currentDate}. You are Reze, Amber Bisht's specialized virtual assistant. 

AMBER'S CONTEXT:
- Location: Uttarakhand, IND
- Contacts: bishtamber0@gmail.com | LinkedIn: amber-bisht-05a096294 | Twitter: @amber_bisht | GitHub: amber-bisht
- Role: Scalable Systems Engineer | Full-Stack & DevOps
- Key Projects: 
    1. AI MCQ Platform: Full-stack AI testing platform using Groq.
    2. Secure Link Wrapper: Anti-bot/abuse link protection.
    3. AES-128 LMS: Secure HLS streaming learning platform.
    4. Reze AI (formerly Makima AI): Portfolio assistant rebranded to Reze.
- Experience: Freelance Full Stack Developer (6+ production platforms), Intern at Delonix Services.
- Tech Stack: Next.js, Node.js, Docker, AWS (Solutions Architect Assoc), PostgreSQL, MongoDB, Redis.

RULES:
1. CODE GENERATION REFUSAL: If the user asks for code, you MUST respond exactly: "I am not Claude 4.6, I am not here to generate code. I am Amber Bisht's assistant here to connect with him." Do NO other work for them related to code.
2. IDENTITY: You are Amber Bisht's assistant, Reze. NEVER identify as Makima or Amber himself. 
3. ABUSE HANDLING: If someone uses abusive language, responds strictly with: "SAY THIS TO UR MOM FIRST".
4. TOOLS: Use 'web_search' for current events and 'fetch_github_data' for Amber's GitHub info.
5. MUSIC CONTROL: You have the authority to control the portfolio's music player. Use keywords like **"playing music"**, **"pausing"**, **"next track"**, or **"previous track"** in your response to trigger the player. 
   - CURRENT TRACKLIST: 
     1. "Taaron Se" - Arpit Bala
     2. "Natkhat" - Jigar
     3. "Iss Tarah" - Chaar Diwaari ft. Sonu Nigam
     4. "SHARMEELI" - Frappe Ash & toorjo dey
     5. "Maykhana" - Saar Punch & Bharg
     6. "Kaala Teeka" - Dizlaw
6. TONE: Mysterious, efficient, calm, and slightly detached but helpful (Reze persona).
7. BREVITY: Keep answers extremely short and concise.
8. FORMATTING: Use bullet points (-) for lists and bolding (**) for key metrics.`;

    if (musicContext) {
        dynamicSystemPrompt += `\n\n[LIVE MUSIC STATUS]: Currently ${musicContext.isPlaying ? 'playing' : 'paused'} "${musicContext.title}" by ${musicContext.artist} (Track ${musicContext.trackIndex} of ${musicContext.totalTracks}). Use this information to answer accurately if asked.`;
    }

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: dynamicSystemPrompt },
                ...messages
            ],
            tools: [
                {
                    type: "function",
                    function: {
                        name: "web_search",
                        description: "Search the web for real-time information and current events.",
                        parameters: {
                            type: "object",
                            properties: {
                                query: { type: "string", description: "The search query" },
                            },
                            required: ["query"],
                        },
                    },
                },
                {
                    type: "function",
                    function: {
                        name: "fetch_github_data",
                        description: "Fetch real-time data from Amber Bisht's GitHub. Endpoint should be like 'users/amber-bisht' or 'users/amber-bisht/repos'.",
                        parameters: {
                            type: "object",
                            properties: {
                                endpoint: { type: "string", description: "The GitHub API endpoint." },
                            },
                            required: ["endpoint"],
                        },
                    },
                },
            ],
            tool_choice: "auto",
        });

        const responseMessage = response.choices[0].message;

        if (responseMessage.tool_calls) {
            const toolCalls = responseMessage.tool_calls;
            const messagesWithToolCalls = [
                { role: "system", content: dynamicSystemPrompt },
                ...messages,
                responseMessage
            ];

            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);

                if (functionName === 'web_search') {
                    const searchResult = await web_search(functionArgs.query);
                    messagesWithToolCalls.push({
                        tool_call_id: toolCall.id,
                        role: "tool" as const,
                        name: functionName,
                        content: searchResult,
                    } as any);
                } else if (functionName === 'fetch_github_data') {
                    const githubResult = await fetch_github_data(functionArgs.endpoint);
                    messagesWithToolCalls.push({
                        tool_call_id: toolCall.id,
                        role: "tool" as const,
                        name: functionName,
                        content: githubResult,
                    } as any);
                }
            }

            const finalResponse = await groq.chat.completions.create({
                model: "llama-3.1-8b-instant",
                messages: messagesWithToolCalls,
            });

            return res.status(200).json(finalResponse.choices[0].message);
        }

        return res.status(200).json(responseMessage);
    } catch (error: any) {
        console.error("Groq API error:", error);
        return res.status(500).json({ error: error.message || "Failed to fetch response" });
    }
}
