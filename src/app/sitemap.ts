import { MetadataRoute } from 'next';
import mbtiData from '@/data/mbti_guides.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const mbtis = Object.keys(mbtiData);
    const baseUrl = 'https://type-bridge.vercel.app';

    const guideUrls = mbtis.map((mbti) => ({
        url: `${baseUrl}/guide/${mbti.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        ...guideUrls,
    ];
}
