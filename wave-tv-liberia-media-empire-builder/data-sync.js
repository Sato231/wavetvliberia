// data-sync.js - Handles data synchronization between dashboard and website
class DataSync {
    constructor() {
        this.storageKey = 'waveLiberiaData';
        this.init();
    }
    
    init() {
        // Load initial data if not exists
        if (!this.getData()) {
            this.setDefaultData();
        }
    }
    
    // Get all website data
    getData() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }
    
    // Save all website data
    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        this.updateWebsite(data);
    }
    
    // Update website with new data
    updateWebsite(data) {
        // This would typically involve updating the DOM
        // For now, we'll just trigger a custom event
        const event = new CustomEvent('websiteDataUpdated', { detail: data });
        document.dispatchEvent(event);
    }
    
    // Set default data structure
    setDefaultData() {
        const defaultData = {
            posts: [
                {
                    id: 1,
                    title: "K-Zee's New Album Breaks Records",
                    content: "<p>Liberian artist K-Zee has released a groundbreaking new album that is breaking records across the country. The album features collaborations with international artists and has been praised for its unique blend of traditional Liberian sounds with modern production.</p>",
                    excerpt: "Liberian artist K-Zee releases groundbreaking album breaking records nationwide.",
                    category: "entertainment",
                    tags: ["music", "album", "liberian-artist"],
                    author: "Complete Control",
                    status: "published",
                    date: "2023-11-15",
                    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                },
                {
                    id: 2,
                    title: "Liberian Designers Shine at Fashion Week",
                    content: "<p>Local fashion designers showcased their latest collections at Monrovia Fashion Week, receiving international acclaim for their innovative designs that incorporate traditional Liberian textiles and patterns.</p>",
                    excerpt: "Liberian fashion designers gain international recognition at Monrovia Fashion Week.",
                    category: "lifestyle",
                    tags: ["fashion", "design", "liberian-culture"],
                    author: "Complete Control",
                    status: "published",
                    date: "2023-11-14",
                    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                },
                {
                    id: 3,
                    title: "National Sports Team Secures Victory",
                    content: "<p>The national team secured a stunning victory in the regional championships, bringing pride to the nation and qualifying for the international tournament next year.</p>",
                    excerpt: "National sports team wins regional championship, qualifies for international tournament.",
                    category: "sports",
                    tags: ["sports", "victory", "national-team"],
                    author: "Complete Control",
                    status: "draft",
                    date: "2023-11-13",
                    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                }
            ],
            design: {
                colors: { primary: '#002868', secondary: '#BF0A30' },
                fonts: { main: 'Poppins' },
                layout: 'standard'
            },
            social: CONFIG.SOCIAL_MEDIA,
            users: [
                { id: 1, name: "Complete Control", email: "admin@waveliberia.com", role: "admin", status: "active", avatar: "https://randomuser.me/api/portraits/men/75.jpg" }
            ]
        };
        
        this.saveData(defaultData);
    }
    
    // Get posts by category
    getPostsByCategory(category) {
        const data = this.getData();
        if (!data || !data.posts) return [];
        
        return data.posts.filter(post => 
            post.category === category && post.status === 'published'
        );
    }
    
    // Get recent posts
    getRecentPosts(limit = 5) {
        const data = this.getData();
        if (!data || !data.posts) return [];
        
        return data.posts
            .filter(post => post.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }
    
    // Add new post
    addPost(postData) {
        const data = this.getData();
        const newPost = {
            id: Date.now(),
            ...postData,
            date: new Date().toISOString().split('T')[0]
        };
        
        data.posts.unshift(newPost);
        this.saveData(data);
        return newPost;
    }
    
    // Update post
    updatePost(postId, postData) {
        const data = this.getData();
        const postIndex = data.posts.findIndex(post => post.id === postId);
        
        if (postIndex !== -1) {
            data.posts[postIndex] = { ...data.posts[postIndex], ...postData };
            this.saveData(data);
            return true;
        }
        
        return false;
    }
    
    // Delete post
    deletePost(postId) {
        const data = this.getData();
        data.posts = data.posts.filter(post => post.id !== postId);
        this.saveData(data);
    }
}

// Create global instance
window.dataSync = new DataSync();