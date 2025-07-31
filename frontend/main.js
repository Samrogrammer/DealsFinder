class DealsManager {
    constructor() {
        this.deals = [];
        this.currentCategory = 'all';
        this.currentSort = 'newest';
        this.priceRange = 'all';
        this.init();
    }

    async init() {
        await this.fetchDeals();
        this.setupEventListeners();
        this.render();
    }

    async fetchDeals() {
        // Simulated data - replace with actual API call
        this.deals = [
            {
                id: 1,
                title: "Premium Running Shoes",
                description: "High-performance running shoes for professional athletes",
                original_price: 120,
                deal_price: 89.99,
                image_url: "/api/placeholder/400/300",
                category: "fashion",
                affiliate_link: "#"
            },
            {
                id: 2,
                title: "Organic Vitamins Pack",
                description: "Complete daily vitamins from organic sources",
                original_price: 45,
                deal_price: 32.99,
                image_url: "/api/placeholder/400/300",
                category: "health",
                affiliate_link: "#"
            }
            // Add more sample deals here
        ];
    }

    setupEventListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.closest('.nav-link').dataset.category;
                if (category) {
                    this.currentCategory = category;
                    document.getElementById('category-filter').value = category;
                    this.filterAndRenderDeals();
                }
            });
        });

        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.filterAndRenderDeals();
        });

        document.getElementById('sort-filter').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.filterAndRenderDeals();
        });

        document.getElementById('price-range').addEventListener('change', (e) => {
            this.priceRange = e.target.value;
            this.filterAndRenderDeals();
        });
    }

    filterAndRenderDeals() {
        let filteredDeals = this.deals;

        // Apply category filter
        if (this.currentCategory !== 'all') {
            filteredDeals = filteredDeals.filter(deal => deal.category === this.currentCategory);
        }

        // Apply price range filter
        switch (this.priceRange) {
            case 'under-25':
                filteredDeals = filteredDeals.filter(deal => deal.deal_price < 25);
                break;
            case '25-50':
                filteredDeals = filteredDeals.filter(deal => deal.deal_price >= 25 && deal.deal_price <= 50);
                break;
            case '50-100':
                filteredDeals = filteredDeals.filter(deal => deal.deal_price > 50 && deal.deal_price <= 100);
                break;
            case 'over-100':
                filteredDeals = filteredDeals.filter(deal => deal.deal_price > 100);
                break;
        }

        // Apply sorting
        switch (this.currentSort) {
            case 'price-low':
                filteredDeals.sort((a, b) => a.deal_price - b.deal_price);
                break;
            case 'discount':
                filteredDeals.sort((a, b) => 
                    (b.original_price - b.deal_price) - (a.original_price - a.deal_price));
                break;
            case 'newest':
                // Sort by ID assuming it represents recency
                filteredDeals.sort((a, b) => b.id - a.id);
                break;
        }

        this.render(filteredDeals);
    }

    calculateDiscount(original, deal) {
        return Math.round(((original - deal) / original) * 100);
    }
    render(dealsToRender = this.deals) {
        const dealsGrid = document.getElementById('deals-grid');
        dealsGrid.innerHTML = dealsToRender.map(deal => {
            const discount = this.calculateDiscount(deal.original_price, deal.deal_price);
            return `
                <article class="deal-card">
                    <img src="${deal.image_url}" alt="${deal.title}" class="deal-image">
                    <div class="deal-content">
                        <h3 class="deal-title">${deal.title}</h3>
                        <div class="deal-prices">
                            <span class="original-price">$${deal.original_price}</span>
                            <span class="deal-price">$${deal.deal_price}</span>
                            <span class="discount-badge">-${discount}%</span>
                        </div>
                        <a href="${deal.affiliate_link}" class="deal-button">View Deal</a>
                    </div>
                </article>
            `;
        }).join('');
    }
}

// Initialize the DealsManager
document.addEventListener('DOMContentLoaded', () => {
    new DealsManager();
});
class FashionDealsManager {
    constructor() {
        this.deals = [];
        this.hotDeals = [];
        this.filters = {
            category: 'all',
            gender: 'all',
            priceRange: 'all',
            dealType: 'all',
            sort: 'newest'
        };
        this.isLoading = true;
        this.init();
    }

    async init() {
        try {
            await this.fetchDeals();
            this.setupEventListeners();
            this.hideLoadingIndicators();
            this.filterAndRenderDeals();
            this.renderHotDeals();
        } catch (error) {
            this.handleError(error);
        }
    }

    async fetchDeals() {
        // In a production environment, this would be an actual API call
        // For demonstration, using sample data that mimics affiliate product format
        
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample fashion deals data
        this.deals = [
            {
                id: 1,
                title: "Women's Premium Casual Sneakers",
                description: "Comfortable everyday casual sneakers with memory foam insoles",
                original_price: 89.99,
                deal_price: 59.99,
                image_url: "images/fashion/womens-sneakers.jpg",
                category: "shoes",
                gender: "women",
                dealType: "seasonal",
                rating: 4.5,
                hot_deal: true,
                discount_percent: 33,
                affiliate_link: "https://example.com/affiliate/product/1",
                store: "Amazon",
                date_added: "2025-03-15"
            },
            {
                id: 2,
                title: "Men's Classic Denim Jacket",
                description: "Timeless denim jacket with adjustable waist and premium stitching",
                original_price: 120.00,
                deal_price: 79.95,
                image_url: "images/fashion/mens-jacket.jpg",
                category: "clothing",
                gender: "men",
                dealType: "clearance",
                rating: 4.7,
                hot_deal: true,
                discount_percent: 33,
                affiliate_link: "https://example.com/affiliate/product/2",
                store: "Macy's",
                date_added: "2025-03-18"
            },
            {
                id: 3,
                title: "Designer Leather Crossbody Bag",
                description: "Genuine leather crossbody with adjustable strap and multiple compartments",
                original_price: 199.99,
                deal_price: 139.99,
                image_url: "images/fashion/crossbody-bag.jpg",
                category: "accessories",
                gender: "women",
                dealType: "premium",
                rating: 4.8,
                hot_deal: false,
                discount_percent: 30,
                affiliate_link: "https://example.com/affiliate/product/3",
                store: "Nordstrom",
                date_added: "2025-03-25"
            },
            {
                id: 4,
                title: "Kids Athletic Shoes - Size 2-5",
                description: "Lightweight athletic shoes with breathable mesh and non-slip soles",
                original_price: 65.00,
                deal_price: 39.99,
                image_url: "images/fashion/kids-shoes.jpg",
                category: "shoes",
                gender: "kids",
                dealType: "seasonal",
                rating: 4.3,
                hot_deal: false,
                discount_percent: 38,
                affiliate_link: "https://example.com/affiliate/product/4",
                store: "Footlocker",
                date_added: "2025-03-22"
            },
            {
                id: 5,
                title: "Men's Premium Active Shorts",
                description: "Quick-dry active shorts with hidden pocket and 4-way stretch fabric",
                original_price: 45.00,
                deal_price: 29.99,
                image_url: "images/fashion/mens-shorts.jpg",
                category: "activewear",
                gender: "men",
                dealType: "flash",
                rating: 4.6,
                hot_deal: true,
                discount_percent: 33,
                affiliate_link: "https://example.com/affiliate/product/5",
                store: "Nike",
                date_added: "2025-04-01"
            },
            {
                id: 6,
                title: "Women's Cashmere Blend Sweater",
                description: "Luxurious cashmere blend sweater, perfect for cool evenings",
                original_price: 149.99,
                deal_price: 89.99,
                image_url: "images/fashion/womens-sweater.jpg",
                category: "clothing",
                gender: "women",
                dealType: "seasonal",
                rating: 4.9,
                hot_deal: false,
                discount_percent: 40,
                affiliate_link: "https://example.com/affiliate/product/6",
                store: "J.Crew",
                date_added: "2025-03-29"
            },
            {
                id: 7,
                title: "Unisex Polarized Sunglasses",
                description: "UV400 protection polarized sunglasses with lightweight frame",
                original_price: 95.00,
                deal_price: 49.99,
                image_url: "images/fashion/sunglasses.jpg",
                category: "accessories",
                gender: "unisex",
                dealType: "clearance",
                rating: 4.4,
                hot_deal: false,
                discount_percent: 47,
                affiliate_link: "https://example.com/affiliate/product/7",
                store: "Ray-Ban",
                date_added: "2025-03-27"
            },
            {
                id: 8,
                title: "Kids Winter Parka - Size 6-12",
                description: "Warm winter parka with water-resistant outer shell and cozy lining",
                original_price: 120.00,
                deal_price: 79.99,
                image_url: "images/fashion/kids-parka.jpg",
                category: "outerwear",
                gender: "kids",
                dealType: "seasonal",
                rating: 4.7,
                hot_deal: true,
                discount_percent: 33,
                affiliate_link: "https://example.com/affiliate/product/8",
                store: "GAP Kids",
                date_added: "2025-03-20"
            }
        ];
        
        // Fill hotDeals with items marked as hot_deal
        this.hotDeals = this.deals.filter(deal => deal.hot_deal === true);
        
        // For demo purposes, replace image URLs with placeholder
        this.deals.forEach(deal => {
            deal.image_url = "/api/placeholder/400/300";
        });
        
        this.hotDeals.forEach(deal => {
            deal.image_url = "/api/placeholder/400/300";
        });
    }

    setupEventListeners() {
        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.filterAndRenderDeals();
        });

        // Gender filter
        document.getElementById('gender-filter').addEventListener('change', (e) => {
            this.filters.gender = e.target.value;
            this.filterAndRenderDeals();
        });

        // Price range filter
        document.getElementById('price-range').addEventListener('change', (e) => {
            this.filters.priceRange = e.target.value;
            this.filterAndRenderDeals();
        });

        // Deal type filter
        document.getElementById('deal-type').addEventListener('change', (e) => {
            this.filters.dealType = e.target.value;
            this.filterAndRenderDeals();
        });

        // Sort filter
        document.getElementById('sort-filter').addEventListener('change', (e) => {
            this.filters.sort = e.target.value;
            this.filterAndRenderDeals();
        });

        // Newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]').value;
                this.subscribeToNewsletter(email);
            });
        }
    }

    subscribeToNewsletter(email) {
        // In production, this would send the email to your API
        console.log(`Subscribing ${email} to fashion deals newsletter`);
        
        // Show success message
        const form = document.getElementById('newsletter-form');
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Thanks for subscribing! We'll send you the best deals.`;
        
        form.innerHTML = '';
        form.appendChild(successMsg);
    }

    filterAndRenderDeals() {
        this.showLoadingIndicator();
        
        // Apply filters to get filtered deals
        let filteredDeals = this.deals;

        // Filter by category
        if (this.filters.category !== 'all') {
            filteredDeals = filteredDeals.filter(deal => deal.category === this.filters.category);
        }

        // Filter by gender
        if (this.filters.gender !== 'all') {
            filteredDeals = filteredDeals.filter(deal => deal.gender === this.filters.gender);
        }

        // Filter by price range
        switch (this.filters.priceRange) {
            case 'under-50':
                filteredDeals = filteredDeals.filter(deal => deal.deal_price < 50);
                break;
            case '50-100':
                filteredDeals = filteredDeals.filter(deal => deal.deal_price >= 50 && deal.deal_price <= 100);
                break;
            case '100-200':
                filteredDeals = filteredDeals.filter(deal => deal.deal_price > 100 && deal.deal_price <= 200);
                break;
            case 'over-200':
                filteredDeals = filteredDeals.filter(deal => deal.deal_price > 200);
                break;
        }

        // Filter by deal type
        if (this.filters.dealType !== 'all') {
            filteredDeals = filteredDeals.filter(deal => deal.dealType === this.filters.dealType);
        }

        // Apply sorting
        switch (this.filters.sort) {
            case 'price-low':
                filteredDeals.sort((a, b) => a.deal_price - b.deal_price);
                break;
            case 'price-high':
                filteredDeals.sort((a, b) => b.deal_price - a.deal_price);
                break;
            case 'discount':
                filteredDeals.sort((a, b) => b.discount_percent - a.discount_percent);
                break;
            case 'rating':
                filteredDeals.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
            default:
                // Sort by date_added (most recent first)
                filteredDeals.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
                break;
        }

        // Update results count
        document.getElementById('results-count').textContent = `Showing ${filteredDeals.length} deals`;

        // Render the filtered deals
        this.renderDeals(filteredDeals);
        
        // Hide loading indicator after short delay to avoid UI flicker
        setTimeout(() => this.hideLoadingIndicators(), 300);
    }

    renderDeals(dealsToRender) {
        const dealsGrid = document.getElementById('deals-grid');
        
        if (!dealsToRender || dealsToRender.length === 0) {
            dealsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No deals match your current filters. Try adjusting your criteria.</p>
                </div>
            `;
            return;
        }
        
        dealsGrid.innerHTML = dealsToRender.map(deal => {
            return `
                <article class="deal-card" data-category="${deal.category}" data-gender="${deal.gender}">
                    <div class="deal-image-container">
                        <img src="${deal.image_url}" alt="${deal.title}" class="deal-image" loading="lazy">
                        <div class="deal-store">${deal.store}</div>
                        <div class="deal-badge">${deal.discount_percent}% OFF</div>
                    </div>
                    <div class="deal-content">
                        <h3 class="deal-title">${deal.title}</h3>
                        <div class="deal-rating">
                            ${this.generateStarRating(deal.rating)}
                        </div>
                        <div class="deal-prices">
                            <span class="original-price">$${deal.original_price.toFixed(2)}</span>
                            <span class="deal-price">$${deal.deal_price.toFixed(2)}</span>
                        </div>
                        <a href="${deal.affiliate_link}" class="deal-button" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-shopping-cart"></i> Shop Deal
                        </a>
                    </div>
                </article>
            `;
        }).join('');
    }

    renderHotDeals() {
        const hotDealsContainer = document.getElementById('hot-deals-container');
        
        if (!this.hotDeals || this.hotDeals.length === 0) {
            // Hide the section if no hot deals
            document.querySelector('.hot-deals-section').style.display = 'none';
            return;
        }
        
        hotDealsContainer.innerHTML = this.hotDeals.map(deal => {
            return `
                <div class="hot-deal-card">
                    <div class="hot-deal-image">
                        <img src="${deal.image_url}" alt="${deal.title}" loading="lazy">
                        <div class="hot-deal-badge">HOT DEAL</div>
                    </div>
                    <div class="hot-deal-content">
                        <h3>${deal.title}</h3>
                        <div class="hot-deal-prices">
                            <span class="hot-deal-original">$${deal.original_price.toFixed(2)}</span>
                            <span class="hot-deal-current">$${deal.deal_price.toFixed(2)}</span>
                            <span class="hot-deal-discount">${deal.discount_percent}% OFF</span>
                        </div>
                        <a href="${deal.affiliate_link}" class="hot-deal-button" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-shopping-cart"></i> Shop Now
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let starsHTML = '';
        
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        // Add half star if needed
        if (halfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return `<div class="stars">${starsHTML}</div><span class="rating-number">(${rating})</span>`;
    }

    showLoadingIndicator() {
        document.getElementById('loading-indicator').style.display = 'flex';
        document.getElementById('deals-grid').style.opacity = '0.5';
    }

    hideLoadingIndicators() {
        // Hide all skeleton loaders
        document.querySelectorAll('.skeleton-loader').forEach(loader => {
            loader.style.display = 'none';
        });
        
        // Hide loading indicator
        document.getElementById('loading-indicator').style.display = 'none';
        document.getElementById('deals-grid').style.opacity = '1';
    }

    handleError(error) {
        console.error('Error loading deals:', error);
        
        // Show error message on the page
        const dealsGrid = document.getElementById('deals-grid');
        dealsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>We couldn't load the deals at this time. Please try again later.</p>
                <button onclick="location.reload()" class="retry-button">Try Again</button>
            </div>
        `;
        
        this.hideLoadingIndicators();
    }
}

// Initialize the Fashion Deals Manager when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FashionDealsManager();
});