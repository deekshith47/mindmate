import React, { useState } from 'react';
import { ExternalLinkIcon } from '../components/icons/Icons';

type Category = 'All' | 'Crisis' | 'Articles' | 'Videos' | 'Podcasts';

const resources = [
    { title: '988 Suicide & Crisis Lifeline', category: 'Crisis', link: 'https://988lifeline.org/' },
    { title: 'Crisis Text Line', category: 'Crisis', link: 'https://www.crisistextline.org/' },
    { title: 'NIMH: Mental Health Information', category: 'Articles', link: 'https://www.nimh.nih.gov/health' },
    { title: 'APA: Psychology Topics', category: 'Articles', link: 'https://www.apa.org/topics' },
    { title: 'Mindful.org - Healthy Mind, Healthy Life', category: 'Articles', link: 'https://www.mindful.org/' },
    { title: 'Guided Breathing Exercise Video', category: 'Videos', link: 'https://www.youtube.com/watch?v=uxayUBd6T7M' },
    { title: 'TED Talk: The Power of Vulnerability', category: 'Videos', link: 'https://www.ted.com/talks/brene_brown_the_power_of_vulnerability' },
    { title: 'The Happiness Lab Podcast', category: 'Podcasts', link: 'https://www.pushkin.fm/podcasts/the-happiness-lab-with-dr-laurie-santos' },
    { title: 'Therapy for Black Girls Podcast', category: 'Podcasts', link: 'https://therapyforblackgirls.com/podcast/' },
];

const categories: Category[] = ['All', 'Crisis', 'Articles', 'Videos', 'Podcasts'];

const ResourcesPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const filteredResources = activeCategory === 'All'
        ? resources
        : resources.filter(r => r.category === activeCategory);

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Resources</h1>
            <p className="text-gray-400">A curated list of helpful resources. If you are in crisis, please seek immediate help.</p>

            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                            activeCategory === category ? 'bg-violet-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                    <a
                        key={resource.title}
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-700/50 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${resource.category === 'Crisis' ? 'text-red-400' : 'text-violet-400'}`}>
                                    {resource.category}
                                </span>
                                <h3 className="text-lg font-bold text-white mt-1">{resource.title}</h3>
                            </div>
                            <ExternalLinkIcon className="h-5 w-5 text-gray-500 shrink-0 ml-2" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ResourcesPage;
