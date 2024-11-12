import React, { useState, useEffect } from 'react';

interface ArticleData {
    imageUrl: string;
    pubDate: string;
    title: string;
    articleLink: string;
    description: string;
    tags: string[];
}

const WebScrapingComponent: React.FC = () => {
    const [articleData, setArticleData] = useState<ArticleData[]>([]);
    
    const [error, setError] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>("adhd");

    const handleScrapeArticles = async (topic: string | null) => {
        setError(null);
        const baseUrl = 'https://magazine.medlineplus.gov/topic';
        const url = topic ? `${baseUrl}/${topic}` : baseUrl;

        try {
            const response = await fetch(`https://health-s-deplo.onrender.com/scrape-articles?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error('Error fetching article data');
            }
            const data: ArticleData[] = await response.json();
            setArticleData(data);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    useEffect(() => {
        handleScrapeArticles(selectedTopic);
    }, [selectedTopic]);

    const topics = [
        { key: 'mental-health', label: 'Mental Health' },
        { key: 'substance-use', label: 'Substance Use Disorder' },
        { key: 'alcohol-use-disorder', label: 'Alcohol Use Disorder' },
        { key: 'anxiety', label: 'Anxiety' },

        { key: 'stress', label: 'Stress' },
        

        { key: 'adhd', label: 'ADHD' },
    ];
    
   
    return (
        <div className="p-4">

            {/* Filter by Topic */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Filter by Topic</h2>
                <select
                    value={selectedTopic ?? ''}
                    onChange={(e) => setSelectedTopic(e.target.value || null)}
                    className="border p-2 w-full mb-4"
                >
                    {topics.map(({ key, label }) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
    ))}
                </select>
            </div>

            {/* Display Article Data */}
            {articleData.length > 0 ? (
                <div>
                    <h3 className="text-lg font-semibold">Article Data</h3>
                    {articleData.map((article, index) => (
                        <div key={index} className="border p-4 mb-4">
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-48 object-cover rounded-md mb-2"
                            />
                            <h3 className="text-lg font-semibold">{article.title}</h3>
                            <p className="text-gray-600">{article.pubDate}</p>
                            <p className="text-gray-700 mb-2">{article.description}</p>
                            <a
                                href={article.articleLink}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read Full Article
                            </a>
                            <div className="mt-2">
                                {article.tags.map((tag, i) => (
                                    <span key={i} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-600">No articles available for the selected topic.</div>
            )}

            {/* Error Handling */}
            {error && (
                <div className="text-red-500">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};


export default WebScrapingComponent;












