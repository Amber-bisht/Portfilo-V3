import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData: FAQItem[] = [
        {
            question: "Are you open to full-time roles or freelance contracts?",
            answer: "Yes, I am actively open to both full-time Software Development Engineer (SDE) roles and selective freelance contracts. For freelance engagements, I specialize in web architecture design, DevOps pipeline automation, security audits, and reverse-engineering consulting."
        },
        {
            question: "What is your primary technology stack?",
            answer: "My core stack centers around TypeScript, Next.js, React, Node.js, AWS, GCP, Docker, Kubernetes, and Infrastructure as Code (Terraform, CloudFormation). I also have deep experience with databases like PostgreSQL, Redis, and MongoDB."
        },
        {
            question: "How do you ensure the security of application architectures?",
            answer: "I implement security-first development practices: securing API boundaries, setting up secure session lifecycles, and configuring edge protections (such as Cloudflare/Akamai WAFs, TLS JA3/JA4 fingerprinting, and rate-limiting) to defend against malicious traffic before it ever reaches the application layer."
        },
        {
            question: "What is your typical workflow and turnaround time for freelance projects?",
            answer: "I follow an agile lifecycle: (1) Discovery and specifications mapping, (2) Architectural plan approval, (3) High-performance building with automated test coverage, and (4) Staging validation. Most consulting and mid-sized feature builds take between 1 to 3 weeks."
        },
        {
            question: "How do we initiate a collaboration?",
            answer: "You can reach out directly via the email form below. I typically respond within 12–24 hours to schedule an initial discovery call where we can map out scope, timeline, and deliverables."
        }
    ];

    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            {faqData.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div 
                        key={index} 
                        className="bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-6 text-left font-bold text-white hover:text-makima-red transition-colors duration-300 gap-4 cursor-pointer"
                        >
                            <span className="text-base sm:text-lg">{item.question}</span>
                            <ChevronDown 
                                size={18} 
                                className={`text-gray-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-makima-red' : ''}`} 
                            />
                        </button>
                        <div 
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <p className="p-6 pt-0 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-white/5 bg-black/10">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FAQ;
