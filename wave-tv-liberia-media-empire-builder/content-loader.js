// content-loader.js - Enhanced Content Loading
class ContentLoader {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }
    
    init() {
        // Listen for data updates
        document.addEventListener('websiteDataUpdated', (e) => {
            this.loadContent();
        });
        
        // Initial content load
        this.loadContent();
        
        // Update page metadata
        this.updatePageMetadata();
    }
    
    // Get current page
    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }
    
    // Load content based on current page
    loadContent() {
        const data = dataSync.getData();
        if (!data) return;
        
        switch(this.currentPage) {
            case 'index.html':
                this.loadHomepageContent(data.posts);
                break;
            case 'news.html':
            case 'entertainment.html':
            case 'sports.html':
            case 'technology.html':
            case 'education.html':
                this.loadCategoryPageContent();
                break;
            default:
                this.loadGenericContent(data.posts);
        }
    }
    
    // Load homepage content
    loadHomepageContent(posts) {
        this.updateRecentPosts(posts);
        this.updateTrendingPosts(posts);
        this.updateCategoryHighlights(posts);
    }
    
    // Load category page content
    loadCategoryPageContent() {
        // Category-specific content is handled by dataSync
        // This ensures proper filtering for each category page
    }
    
    // Load generic content
    loadGenericContent(posts) {
        this.updateRecentPosts(posts);
    }
    
    // Update recent posts
    updateRecentPosts(posts) {
        const recentPostsContainer = document.getElementById('recent-posts');
        if (!recentPostsContainer) return;
        
        const recentPosts = dataSync.getRecentPosts(5);
        let html = '';
        
        recentPosts.forEach((post, index) => {
            html += `
                <div class="trending-article">
                    <div class="trending-number">${(index + 1).toString().padStart(2, '0')}</div>
                    <div>
                        <h4 class="font-bold text-sm leading-tight mb-1">${post.title}</h4>
                        <div class="text-xs text-gray-500">${this.formatDate(post.date)}</div>
                    </div>
                </div>
            `;
        });
        
        recentPostsContainer.innerHTML = html;
    }
    
    // Update trending posts
    updateTrendingPosts(posts) {
        const trendingContainer = document.getElementById('trending-posts');
        if (!trendingContainer) return;
        
        const trendingPosts = dataSync.getTrendingPosts(5);
        let html = '';
        
        trendingPosts.forEach((post, index) => {
            html += `
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                        ${index + 1}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-sm leading-tight mb-1 truncate">${post.title}</h4>
                        <div class="flex items-center text-xs text-gray-500">
                            <span class="flex items-center mr-3">
                                <i class="far fa-eye mr-1"></i> ${post.views}
                            </span>
                            <span class="flex items-center">
                                <i class="far fa-heart mr-1"></i> ${post.likes}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        trendingContainer.innerHTML = html;
    }
    
    // Update category highlights
    updateCategoryHighlights(posts) {
        CONFIG.CATEGORIES.forEach(category => {
            const container = document.getElementById(`${category.id}-highlight`);
            if (!container) return;
            
            const categoryPosts = dataSync.getPostsByCategory(category.id, 1);
            if (categoryPosts.length > 0) {
                const post = categoryPosts[0];
                container.innerHTML = `
                    <article class="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-40 object-cover">
                        <div class="p-4">
                            <span class="category-badge category-${category.id} text-xs mb-2">${category.name}</span>
                            <h3 class="font-bold text-sm leading-tight mb-2">${post.title}</h3>
                            <a href="${category.id}.html" class="text-blue-600 text-xs font-medium hover:text-blue-800">
                                More ${category.name} <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    </article>
                `;
            }
        });
    }
    
    // Update page metadata
    updatePageMetadata() {
        const data = dataSync.getData();
        if (!data) return;
        
        // Update page title and description based on current page
        if (this.currentPage !== 'index.html') {
            const category = dataSync.currentCategory;
            if (category !== 'all') {
                const categoryName = dataSync.getCategoryName(category);
                const categoryDesc = dataSync.getCategoryDescription(category);
                
                // Update page title
                document.title = `${categoryName} | ${CONFIG.SITE_NAME}`;
                
                // Update meta description
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.name = 'description';
                    document.head.appendChild(metaDesc);
                }
                metaDesc.content = categoryDesc;
            }
        }
    }
    
    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contentLoader = new ContentLoader();
});