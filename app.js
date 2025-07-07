// Grocery data from the provided JSON
const groceryData = {
  "stores": [
    {
      "name": "Kroger",
      "location": "Lapeer, MI",
      "address": "540 S Main St, Lapeer, MI 48446",
      "distance": "15 miles",
      "type": "Traditional Grocery"
    },
    {
      "name": "Aldi", 
      "location": "Lapeer, MI",
      "address": "815 East St, Lapeer, MI 48446",
      "distance": "15 miles",
      "type": "Discount Grocery"
    },
    {
      "name": "Walmart",
      "location": "Lapeer, MI", 
      "address": "555 E Genesee St, Lapeer, MI 48446",
      "distance": "15 miles",
      "type": "Supercenter"
    },
    {
      "name": "Costco",
      "location": "Auburn Hills, MI",
      "address": "400 Brown Rd, Auburn Hills, MI 48326", 
      "distance": "45 miles",
      "type": "Warehouse Club"
    },
    {
      "name": "Sam's Club",
      "location": "Auburn Hills, MI",
      "address": "4350 Joslyn Rd, Auburn Hills, MI 48326",
      "distance": "45 miles", 
      "type": "Warehouse Club"
    },
    {
      "name": "GFS (Burton)",
      "location": "Burton, MI",
      "address": "2170 S Center Rd, Burton, MI 48519",
      "distance": "35 miles",
      "type": "Foodservice Wholesale"
    },
    {
      "name": "GFS (Rochester)", 
      "location": "Rochester, MI",
      "address": "Rochester, MI",
      "distance": "50 miles",
      "type": "Foodservice Wholesale"
    }
  ],
  "items": [
    {
      "name": "Milk (Gallon)",
      "category": "Essentials",
      "unit": "Gallon",
      "prices": {
        "Kroger": {"price": 3.59, "regular_price": 3.59, "on_sale": false},
        "Aldi": {"price": 2.88, "regular_price": 2.88, "on_sale": false},
        "Walmart": {"price": 2.89, "regular_price": 2.89, "on_sale": false},
        "Costco": {"price": 4.22, "regular_price": 4.22, "on_sale": false, "note": "2-pack"},
        "Sam's Club": {"price": 3.63, "regular_price": 4.07, "on_sale": true, "note": "2-pack"},
        "GFS (Burton)": {"price": 3.11, "regular_price": 3.11, "on_sale": false},
        "GFS (Rochester)": {"price": 3.00, "regular_price": 3.43, "on_sale": true}
      }
    },
    {
      "name": "Eggs (Dozen)",
      "category": "Essentials", 
      "unit": "Dozen",
      "prices": {
        "Kroger": {"price": 2.99, "regular_price": 2.99, "on_sale": false},
        "Aldi": {"price": 2.49, "regular_price": 2.49, "on_sale": false},
        "Walmart": {"price": 2.68, "regular_price": 2.68, "on_sale": false},
        "Costco": {"price": 3.89, "regular_price": 3.89, "on_sale": false},
        "Sam's Club": {"price": 3.45, "regular_price": 3.45, "on_sale": false},
        "GFS (Burton)": {"price": 2.19, "regular_price": 2.89, "on_sale": true},
        "GFS (Rochester)": {"price": 2.33, "regular_price": 2.33, "on_sale": false}
      }
    },
    {
      "name": "Dawn Dish Soap (22oz)",
      "category": "Household",
      "unit": "22oz bottle", 
      "prices": {
        "Kroger": {"price": 3.49, "regular_price": 3.49, "on_sale": false},
        "Aldi": {"price": 2.99, "regular_price": 2.99, "on_sale": false},
        "Walmart": {"price": 3.27, "regular_price": 3.27, "on_sale": false},
        "Costco": {"price": 3.89, "regular_price": 3.89, "on_sale": false},
        "Sam's Club": {"price": 3.67, "regular_price": 3.67, "on_sale": false},
        "GFS (Burton)": {"price": 2.89, "regular_price": 3.49, "on_sale": true},
        "GFS (Rochester)": {"price": 2.95, "regular_price": 2.95, "on_sale": false}
      }
    },
    {
      "name": "Irish Butter (8oz)",
      "category": "Specialty",
      "unit": "8oz block",
      "prices": {
        "Kroger": {"price": 5.49, "regular_price": 5.49, "on_sale": false},
        "Aldi": {"price": 4.29, "regular_price": 4.29, "on_sale": false},
        "Walmart": {"price": 4.98, "regular_price": 4.98, "on_sale": false},
        "Costco": {"price": 5.99, "regular_price": 5.99, "on_sale": false},
        "Sam's Club": {"price": 5.79, "regular_price": 5.79, "on_sale": false},
        "GFS (Burton)": {"price": 4.49, "regular_price": 4.49, "on_sale": false},
        "GFS (Rochester)": {"price": 3.99, "regular_price": 5.29, "on_sale": true}
      }
    },
    {
      "name": "Bacon (12oz)",
      "category": "Meat & Deli",
      "unit": "12oz package",
      "prices": {
        "Kroger": {"price": 6.49, "regular_price": 6.49, "on_sale": false},
        "Aldi": {"price": 4.99, "regular_price": 4.99, "on_sale": false},
        "Walmart": {"price": 5.68, "regular_price": 5.68, "on_sale": false},
        "Costco": {"price": 7.99, "regular_price": 7.99, "on_sale": false},
        "Sam's Club": {"price": 4.89, "regular_price": 6.99, "on_sale": true},
        "GFS (Burton)": {"price": 5.29, "regular_price": 5.29, "on_sale": false},
        "GFS (Rochester)": {"price": 5.89, "regular_price": 5.89, "on_sale": false}
      }
    }
  ],
  "last_updated": "June 19, 2025, 7:07 AM EDT"
};

// Global state
let activeStores = ['Kroger', 'Aldi', 'Walmart', 'Costco', 'Sam\'s Club', 'GFS (Burton)', 'GFS (Rochester)'];
let activeCategory = 'all';
let currentView = 'table';
let currentSort = 'name';

// DOM elements
const currentDateEl = document.getElementById('current-date');
const lastUpdatedEl = document.getElementById('last-updated');
const storeToggles = document.querySelectorAll('.store-toggle');
const categoryFilter = document.getElementById('category-filter');
const viewButtons = document.querySelectorAll('.view-btn');
const tableView = document.getElementById('table-view');
const cardView = document.getElementById('card-view');
const sortSelect = document.getElementById('sort-select');
const bestDealsGrid = document.getElementById('best-deals-grid');
const priceTableBody = document.getElementById('price-table-body');
const cardsGrid = document.getElementById('cards-grid');
const calculatorItems = document.getElementById('calculator-items');
const savingsTotal = document.getElementById('savings-total');
const savingsDetails = document.getElementById('savings-details');
const comparisonStore = document.getElementById('comparison-store');
const addAlertBtn = document.getElementById('add-alert-btn');

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    renderData();
});

function initializeDashboard() {
    // Set current date
    const now = new Date();
    currentDateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Set last updated
    lastUpdatedEl.textContent = groceryData.last_updated;
}

function setupEventListeners() {
    // Store toggles
    storeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const store = this.dataset.store;
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                if (!activeStores.includes(store)) {
                    activeStores.push(store);
                }
            } else {
                activeStores = activeStores.filter(s => s !== store);
            }
            renderData();
        });
    });
    
    // Category filter
    categoryFilter.addEventListener('change', function() {
        activeCategory = this.value;
        renderData();
    });
    
    // View toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            currentView = view;
            
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (view === 'table') {
                tableView.classList.remove('hidden');
                cardView.classList.add('hidden');
                viewButtons[0].classList.add('btn--primary');
                viewButtons[0].classList.remove('btn--outline');
                viewButtons[1].classList.add('btn--outline');
                viewButtons[1].classList.remove('btn--primary');
            } else {
                tableView.classList.add('hidden');
                cardView.classList.remove('hidden');
                viewButtons[1].classList.add('btn--primary');
                viewButtons[1].classList.remove('btn--outline');
                viewButtons[0].classList.add('btn--outline');
                viewButtons[0].classList.remove('btn--primary');
            }
        });
    });
    
    // Sort select
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        renderData();
    });
    
    // Comparison store for calculator
    comparisonStore.addEventListener('change', updateSavingsCalculator);
    
    // Add alert button
    addAlertBtn.addEventListener('click', function() {
        const item = document.getElementById('alert-item').value;
        const price = document.getElementById('alert-price').value;
        const store = document.getElementById('alert-store').value;
        
        if (item && price) {
            // Mock alert creation - in real app this would save to backend
            alert(`Price alert created for ${item} when below $${price} ${store ? 'at ' + store : 'at any store'}`);
            
            // Clear form
            document.getElementById('alert-item').value = '';
            document.getElementById('alert-price').value = '';
            document.getElementById('alert-store').value = '';
        }
    });
}

function renderData() {
    const filteredItems = getFilteredItems();
    const sortedItems = sortItems(filteredItems);
    
    renderTable(sortedItems);
    renderCards(sortedItems);
    renderBestDeals();
    renderCalculatorItems();
}

function getFilteredItems() {
    return groceryData.items.filter(item => {
        return activeCategory === 'all' || item.category === activeCategory;
    });
}

function sortItems(items) {
    return [...items].sort((a, b) => {
        switch (currentSort) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'category':
                return a.category.localeCompare(b.category);
            case 'lowest-price':
                const aMin = Math.min(...Object.values(a.prices).map(p => p.price));
                const bMin = Math.min(...Object.values(b.prices).map(p => p.price));
                return aMin - bMin;
            case 'highest-savings':
                const aSavings = getMaxSavings(a);
                const bSavings = getMaxSavings(b);
                return bSavings - aSavings;
            default:
                return 0;
        }
    });
}

function getMaxSavings(item) {
    let maxSavings = 0;
    Object.values(item.prices).forEach(price => {
        if (price.on_sale) {
            const savings = price.regular_price - price.price;
            maxSavings = Math.max(maxSavings, savings);
        }
    });
    return maxSavings;
}

function renderTable(items) {
    priceTableBody.innerHTML = '';
    
    items.forEach(item => {
        const row = document.createElement('tr');
        
        // Get price info
        const prices = Object.entries(item.prices);
        const minPrice = Math.min(...prices.map(([_, p]) => p.price));
        const maxPrice = Math.max(...prices.map(([_, p]) => p.price));
        const bestStore = prices.find(([_, p]) => p.price === minPrice)[0];
        
        row.innerHTML = `
            <td>
                <strong>${item.name}</strong>
                <div class="item-category">${item.category}</div>
            </td>
            <td class="item-category">${item.category}</td>
            ${['Kroger', 'Aldi', 'Walmart', 'Costco', 'Sam\'s Club', 'GFS (Burton)', 'GFS (Rochester)'].map(store => {
                const priceData = item.prices[store];
                const isActive = activeStores.includes(store);
                const isBest = priceData.price === minPrice && isActive;
                const isWorst = priceData.price === maxPrice && isActive;
                const classes = ['price-cell'];
                
                if (isBest) classes.push('price-best');
                if (isWorst && prices.length > 1) classes.push('price-worst');
                if (priceData.on_sale) classes.push('price-sale');
                if (!isActive) classes.push('text-secondary');
                
                return `
                    <td class="${classes.join(' ')}" style="${!isActive ? 'opacity: 0.3;' : ''}">
                        $${priceData.price.toFixed(2)}
                        ${priceData.note ? `<br><small>${priceData.note}</small>` : ''}
                    </td>
                `;
            }).join('')}
            <td class="text-center">
                <strong class="text-success">${bestStore}</strong><br>
                <span class="text-success">$${minPrice.toFixed(2)}</span>
            </td>
        `;
        
        priceTableBody.appendChild(row);
    });
}

function renderCards(items) {
    cardsGrid.innerHTML = '';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        const prices = Object.entries(item.prices);
        const minPrice = Math.min(...prices.map(([_, p]) => p.price));
        const bestStore = prices.find(([_, p]) => p.price === minPrice)[0];
        
        card.innerHTML = `
            <div class="item-card-header">
                <h4 class="item-name">${item.name}</h4>
                <span class="item-category-badge">${item.category}</span>
            </div>
            <div class="store-prices">
                ${prices.map(([store, priceData]) => {
                    const isActive = activeStores.includes(store);
                    const isBest = priceData.price === minPrice && isActive;
                    
                    return `
                        <div class="store-price-row ${isBest ? 'price-best' : ''}" style="${!isActive ? 'opacity: 0.3;' : ''}">
                            <span class="store-name">
                                ${store}
                                ${priceData.on_sale ? ' 🏷️' : ''}
                                ${priceData.note ? ` (${priceData.note})` : ''}
                            </span>
                            <span class="store-price ${isBest ? 'text-success' : ''}">
                                $${priceData.price.toFixed(2)}
                            </span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        cardsGrid.appendChild(card);
    });
}

function renderBestDeals() {
    const deals = [];
    
    groceryData.items.forEach(item => {
        Object.entries(item.prices).forEach(([store, priceData]) => {
            if (priceData.on_sale && activeStores.includes(store)) {
                const savings = priceData.regular_price - priceData.price;
                const savingsPercent = (savings / priceData.regular_price) * 100;
                
                deals.push({
                    item: item.name,
                    category: item.category,
                    store,
                    currentPrice: priceData.price,
                    regularPrice: priceData.regular_price,
                    savings,
                    savingsPercent,
                    note: priceData.note
                });
            }
        });
    });
    
    // Sort by savings amount and take top 5
    deals.sort((a, b) => b.savings - a.savings);
    const topDeals = deals.slice(0, 5);
    
    bestDealsGrid.innerHTML = '';
    
    topDeals.forEach(deal => {
        const card = document.createElement('div');
        card.className = 'deal-card';
        
        card.innerHTML = `
            <div class="deal-header">
                <div>
                    <div class="deal-item-name">${deal.item}</div>
                    <div class="deal-category">${deal.category}</div>
                </div>
                <div class="deal-store">${deal.store}</div>
            </div>
            <div class="deal-price">
                <span class="current-price">$${deal.currentPrice.toFixed(2)}</span>
                <span class="regular-price">$${deal.regularPrice.toFixed(2)}</span>
            </div>
            <div class="deal-savings">
                Save $${deal.savings.toFixed(2)} (${deal.savingsPercent.toFixed(0)}% off)
            </div>
            ${deal.note ? `<div class="deal-note">${deal.note}</div>` : ''}
        `;
        
        bestDealsGrid.appendChild(card);
    });
}

function renderCalculatorItems() {
    calculatorItems.innerHTML = '';
    
    groceryData.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'calculator-item';
        
        div.innerHTML = `
            <input type="checkbox" id="calc-${item.name}" data-item="${item.name}">
            <label for="calc-${item.name}">${item.name} (${item.category})</label>
        `;
        
        calculatorItems.appendChild(div);
        
        // Add event listener for checkbox
        div.querySelector('input').addEventListener('change', updateSavingsCalculator);
    });
}

function updateSavingsCalculator() {
    const checkedItems = Array.from(calculatorItems.querySelectorAll('input:checked'))
        .map(input => input.dataset.item);
    
    const comparisonStoreValue = comparisonStore.value;
    
    if (checkedItems.length === 0) {
        savingsTotal.textContent = '$0.00';
        savingsDetails.innerHTML = '<p>Select items to see potential savings</p>';
        return;
    }
    
    let totalSavings = 0;
    let totalBestPrice = 0;
    let totalComparisonPrice = 0;
    const details = [];
    
    checkedItems.forEach(itemName => {
        const item = groceryData.items.find(i => i.name === itemName);
        if (!item) return;
        
        // Find best price among active stores
        const activePrices = Object.entries(item.prices)
            .filter(([store]) => activeStores.includes(store))
            .map(([store, price]) => ({ store, ...price }));
        
        const bestPrice = Math.min(...activePrices.map(p => p.price));
        const bestStore = activePrices.find(p => p.price === bestPrice).store;
        
        const comparisonPrice = item.prices[comparisonStoreValue]?.price || bestPrice;
        
        totalBestPrice += bestPrice;
        totalComparisonPrice += comparisonPrice;
        
        const itemSavings = comparisonPrice - bestPrice;
        if (itemSavings > 0) {
            details.push(`${itemName}: Save $${itemSavings.toFixed(2)} at ${bestStore}`);
        }
    });
    
    totalSavings = totalComparisonPrice - totalBestPrice;
    
    savingsTotal.textContent = `$${totalSavings.toFixed(2)}`;
    
    if (details.length > 0) {
        savingsDetails.innerHTML = `
            <p><strong>Savings breakdown:</strong></p>
            <ul>${details.map(d => `<li>${d}</li>`).join('')}</ul>
            <p>Total if shopping at ${comparisonStoreValue}: $${totalComparisonPrice.toFixed(2)}</p>
            <p>Total with best deals: $${totalBestPrice.toFixed(2)}</p>
        `;
    } else {
        savingsDetails.innerHTML = `<p>${comparisonStoreValue} already has the best prices for selected items!</p>`;
    }
}