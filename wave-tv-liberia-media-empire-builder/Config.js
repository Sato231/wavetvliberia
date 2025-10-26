// config.js - Complete Configuration for Wave Liberia
const CONFIG = {
    // Website settings
    SITE_NAME: 'Wave Liberia',
    SITE_DESCRIPTION: 'Liberia\'s Premier News & Entertainment Hub',
    SITE_URL: window.location.origin,
    
    // Admin settings
    ADMIN_USERNAME: 'admin',
    ADMIN_PASSWORD: 'waveliberia2023',
    
    // Social media links
    SOCIAL_MEDIA: {
        facebook: 'https://facebook.com/waveliberia',
        twitter: 'https://twitter.com/waveliberia',
        instagram: 'https://instagram.com/waveliberia',
        youtube: 'https://youtube.com/waveliberia',
        tiktok: 'https://tiktok.com/@waveliberia'
    },
    
    // Contact information
    CONTACT: {
        email: 'info@waveliberia.com',
        phone: '+231 880 123 4567',
        address: 'Media Plaza, Monrovia, Liberia'
    },
    
    // Default categories with colors and descriptions
    CATEGORIES: [
        { 
            id: 'news', 
            name: 'News', 
            color: '#002868',
            description: 'Latest news and current events from Liberia and around the world'
        },
        { 
            id: 'entertainment', 
            name: 'Entertainment', 
            color: '#BF0A30',
            description: 'Music, movies, celebrities, and entertainment news'
        },
        { 
            id: 'sports', 
            name: 'Sports', 
            color: '#0a66c2',
            description: 'Sports news, matches, and athlete updates'
        },
        { 
            id: 'technology', 
            name: 'Technology', 
            color: '#3B82F6',
            description: 'Tech news, innovations, and digital trends'
        },
        { 
            id: 'education', 
            name: 'Education', 
            color: '#10B981',
            description: 'Educational news, scholarships, and learning resources'
        },
        { 
            id: 'lifestyle', 
            name: 'Lifestyle', 
            color: '#7c3aed',
            description: 'Fashion, health, travel, and lifestyle content'
        }
    ],
    
    // Default website data structure
    DEFAULT_DATA: {
        posts: [],
        design: {
            colors: { primary: '#002868', secondary: '#BF0A30', accent: '#FFFFFF' },
            fonts: { family: 'Poppins', baseSize: '16px' },
            layout: 'standard'
        },
        social: {},
        users: [],
        settings: {}
    }
};

// Make config available globally
window.CONFIG = CONFIG;