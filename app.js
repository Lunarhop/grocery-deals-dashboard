// Michigan Grocery Price Comparison Dashboard

// Global data storage
let groceryData = [];
let currentData = [];
let cartItems = [];
let priceChart = null;

// Stores we're tracking
const stores = ['Kroger', 'Aldi', 'Walmart', 'Costco'];
const storeLocations = {
  'Kroger': 'Lapeer',
  'Aldi': 'Lapeer',
  'Walmart': 'Lapeer',
  'Costco': 'Auburn Hills'
};

// DOM Elements
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const dateRange = document.getElementById('dateRange');
const priceTableBody = document.getElementById('priceTableBody');
const cartItemsContainer = document.getElementById('cartItems');
const clearCartBtn = document.getElementById('clearCart');
const trendItemSelect = document.getElementById('trendItemSelect');
const sortNameBtn = document.getElementById('sortName');
const sortPriceBtn = document.getElementById('sortPrice');

// Store total elements
const krogerTotal = document.getElementById('krogerTotal');
const aldiTotal = document.getElementById('aldiTotal');
const walmartTotal = document.getElementById('walmartTotal');
const costcoTotal = document.getElementById('costcoTotal');
const bestTotal = document.getElementById('bestTotal');
const totalSavings = document.getElementById('totalSavings');
const shoppingStrategy = document.getElementById('shoppingStrategy');

// Sample grocery data (fallback if API fails)
const sampleData = [
  {
    "date": "2025-06-19",
    "store": "Kroger",
    "location": "Lapeer",
    "items": [
      {"name": "Milk (Gallon)", "price": 3.85, "unit": "gallon", "category": "Essentials"},
      {"name": "Eggs (Dozen)", "price": 7.05, "unit": "dozen", "category": "Essentials"},
      {"name": "Cheese (8oz)", "price": 4.14, "unit": "8oz", "category": "Essentials"},
      {"name": "Peanut Butter (18oz)", "price": 6.98, "unit": "18oz", "category": "Essentials"},
      {"name": "Dawn Dish Soap (24oz)", "price": 4.89, "unit": "24oz", "category": "Household"},
      {"name": "Toilet Paper (12 rolls)", "price": 14.06, "unit": "12 rolls", "category": "Household"},
      {"name": "Irish Butter (8oz)", "price": 7.58, "unit": "8oz", "category": "Specialty"},
      {"name": "Bacon (1lb)", "price": 7.65, "unit": "lb", "category": "Meat & Deli"}
    ]
  },
  {
    "date": "2025-06-19",
    "store": "Aldi",
    "location": "Lapeer",
    "items": [
      {"name": "Milk (Gallon)", "price": 3.21, "unit": "gallon", "category": "Essentials"},
      {"name": "Eggs (Dozen)", "price": 5.85, "unit": "dozen", "category": "Essentials"},
      {"name": "Cheese (8oz)", "price": 3.68, "unit": "8oz", "category": "Essentials"},
      {"name": "Peanut Butter (18oz)", "price": 5.45, "unit": "18oz", "category": "Essentials"},
      {"name": "Dawn Dish Soap (24oz)", "price": 4.25, "unit": "24oz", "category": "Household"},
      {"name": "Toilet Paper (12 rolls)", "price": 10.95, "unit": "12 rolls", "category": "Household"},
      {"name": "Irish Butter (8oz)", "price": 6.25, "unit": "8oz", "category": "Specialty"},
      {"name": "Bacon (1lb)", "price": 5.99, "unit": "lb", "category": "Meat & Deli"}
    ]
  },
  {
    "date": "2025-06-19",
    "store": "Walmart",
    "location": "Lapeer",
    "items": [
      {"name": "Milk (Gallon)", "price": 3.45, "unit": "gallon", "category": "Essentials"},
      {"name": "Eggs (Dozen)", "price": 6.25, "unit": "dozen", "category": "Essentials"},
      {"name": "Cheese (8oz)", "price": 3.89, "unit": "8oz", "category": "Essentials"},
      {"name": "Peanut Butter (18oz)", "price": 5.85, "unit": "18oz", "category": "Essentials"},
      {"name": "Dawn Dish Soap (24oz)", "price": 4.55, "unit": "24oz", "category": "Household"},
      {"name": "Toilet Paper (12 rolls)", "price": 11.95, "unit": "12 rolls", "category": "Household"},
      {"name": "Irish Butter (8oz)", "price": 6.85, "unit": "8oz", "category": "Specialty"},
      {"name": "Bacon (1lb)", "price": 6.45, "unit": "lb", "category": "Meat & Deli"}
    ]
  },
  {
    "date": "2025-06-19",
    "store": "Costco",
    "location": "Auburn Hills",
    "items": [
      {"name": "Milk (Gallon)", "price": 3.65, "unit": "gallon", "category": "Essentials"},
      {"name": "Eggs (Dozen)", "price": 6.85, "unit": "dozen", "category": "Essentials"},
      {"name": "Cheese (8oz)", "price": 4.05, "unit": "8oz", "category": "Essentials"},
      {"name": "Peanut Butter (18oz)", "price": 6.25, "unit": "18oz", "category": "Essentials"},
      {"name": "Dawn Dish Soap (24oz)", "price": 4.75, "unit": "24oz", "category": "Household"},
      {"name": "Toilet Paper (12 rolls)", "price": 13.25, "unit": "12 rolls", "category": "Household"},
      {"name": "Irish Butter (8oz)", "price": 7.15, "unit": "8oz", "category": "Specialty"},
      {"name": "Bacon (1lb)", "price": 6.85, "unit": "lb", "category": "Meat & Deli"}
    ]
  }
];

// Initialize the application
async function initApp() {
  try {
    // Try to fetch grocery data from API, fallback to sample data
    try {
      const response = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/7e0a5164a6ee445a16c1ff09bc90d118/211d804c-7faa-4c1c-a3e6-eba9ce4a244a/5688b789.json');
      if (response.ok) {
        groceryData = await response.json();
      } else {
        throw new Error('API fetch failed');
      }
    } catch (apiError) {
      console.log('Using sample data due to API error:', apiError);
      groceryData = sampleData;
    }
    
    // Generate historical data for trends
    groceryData = generateHistoricalData(groceryData);
    
    // Setup event listeners
    setupEventListeners();
    
    // Populate item select for trend chart
    populateItemSelect();
    
    // Display initial data
    filterAndDisplayData();
    
    // Initialize empty cart display
    displayCart();
    updateCartTotals();
    
    console.log('Dashboard initialized successfully');
    console.log('Grocery data loaded:', groceryData.length, 'entries');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Use sample data as final fallback
    groceryData = sampleData;
    groceryData = generateHistoricalData(groceryData);
    setupEventListeners();
    populateItemSelect();
    filterAndDisplayData();
    displayCart();
    updateCartTotals();
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Filter change events
  categoryFilter.addEventListener('change', filterAndDisplayData);
  searchInput.addEventListener('input', filterAndDisplayData);
  dateRange.addEventListener('change', filterAndDisplayData);
  
  // Store checkbox events
  stores.forEach(store => {
    const checkbox = document.getElementById(store.toLowerCase());
    if (checkbox) {
      checkbox.addEventListener('change', filterAndDisplayData);
    }
  });
  
  // Sort buttons
  sortNameBtn.addEventListener('click', () => sortData('name'));
  sortPriceBtn.addEventListener('click', () => sortData('price'));
  
  // Cart management
  clearCartBtn.addEventListener('click', clearCart);
  
  // Trend chart item selection
  trendItemSelect.addEventListener('change', updatePriceChart);
}

// Filter and display data based on current selections
function filterAndDisplayData() {
  // Get filter values
  const category = categoryFilter.value;
  const searchTerm = searchInput.value.toLowerCase();
  const isCurrentWeek = dateRange.value === 'current';
  
  // Get selected stores
  const selectedStores = stores.filter(store => {
    const checkbox = document.getElementById(store.toLowerCase());
    return checkbox && checkbox.checked;
  });
  
  // Find most recent date for "current week"
  const dates = [...new Set(groceryData.map(item => item.date))].sort().reverse();
  const currentDate = dates[0]; // Most recent date
  
  // Filter data by date first
  let filteredData = isCurrentWeek 
    ? groceryData.filter(item => item.date === currentDate)
    : groceryData;
  
  // Filter by selected stores
  filteredData = filteredData.filter(item => selectedStores.includes(item.store));
  
  // Transform data for easier use
  currentData = transformDataForDisplay(filteredData);
  
  // Apply category and search filters to the transformed data
  if (category !== 'all') {
    currentData = currentData.filter(item => item.category === category);
  }
  
  if (searchTerm) {
    currentData = currentData.filter(item => 
      item.name.toLowerCase().includes(searchTerm)
    );
  }
  
  // Display the data
  displayPriceTable(currentData);
  
  // Update cart calculations in case store visibility changed
  updateCartTotals();
}

// Transform data from API format to display format
function transformDataForDisplay(data) {
  // Get all unique items across stores
  const allItems = new Set();
  data.forEach(storeData => {
    storeData.items.forEach(item => {
      allItems.add(item.name);
    });
  });
  
  // Create a map of store prices for each item
  const displayItems = [];
  
  allItems.forEach(itemName => {
    const itemData = {
      name: itemName,
      unit: '',
      category: '',
      prices: {}
    };
    
    // Find this item in each store
    data.forEach(storeData => {
      const storeItem = storeData.items.find(i => i.name === itemName);
      if (storeItem) {
        itemData.prices[storeData.store] = storeItem.price;
        // Set unit and category from the first store that has this item
        if (!itemData.unit && storeItem.unit) {
          itemData.unit = storeItem.unit;
        }
        if (!itemData.category && storeItem.category) {
          itemData.category = storeItem.category;
        }
      }
    });
    
    // Add best price and savings info
    const availablePrices = Object.values(itemData.prices).filter(p => p !== undefined);
    if (availablePrices.length > 0) {
      itemData.bestPrice = Math.min(...availablePrices);
      itemData.highestPrice = Math.max(...availablePrices);
      itemData.savings = itemData.highestPrice - itemData.bestPrice;
      itemData.savingsPercent = Math.round((itemData.savings / itemData.highestPrice) * 100);
      
      // Find which store has the best price
      for (const [store, price] of Object.entries(itemData.prices)) {
        if (price === itemData.bestPrice) {
          itemData.bestStore = store;
          break;
        }
      }
      
      displayItems.push(itemData);
    }
  });
  
  return displayItems;
}

// Display data in the price comparison table
function displayPriceTable(items) {
  priceTableBody.innerHTML = '';
  
  if (items.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="8" style="text-align: center; padding: var(--space-16);">No items found matching your filters.</td>`;
    priceTableBody.appendChild(row);
    return;
  }
  
  items.forEach(item => {
    const row = document.createElement('tr');
    
    // Item name and unit
    const itemCell = document.createElement('td');
    itemCell.innerHTML = `
      <div style="font-weight: var(--font-weight-medium);">${item.name}</div>
      <small style="color: var(--color-text-secondary);">${item.unit}</small>
    `;
    row.appendChild(itemCell);
    
    // Price for each store
    stores.forEach(store => {
      const cell = document.createElement('td');
      const price = item.prices[store];
      const isBestPrice = price === item.bestPrice;
      
      if (isBestPrice) {
        cell.className = 'best-price';
      }
      
      cell.textContent = price ? '$' + price.toFixed(2) : '-';
      row.appendChild(cell);
    });
    
    // Best deal column
    const bestDealCell = document.createElement('td');
    bestDealCell.textContent = item.bestStore || '-';
    row.appendChild(bestDealCell);
    
    // Savings column
    const savingsCell = document.createElement('td');
    if (item.savingsPercent > 0) {
      savingsCell.innerHTML = `<span class="savings-percentage">${item.savingsPercent}%</span>`;
    } else {
      savingsCell.textContent = '-';
    }
    row.appendChild(savingsCell);
    
    // Add to cart button
    const actionCell = document.createElement('td');
    const addButton = document.createElement('button');
    addButton.className = 'add-to-cart';
    addButton.textContent = 'Add to Cart';
    addButton.onclick = () => addToCart(item);
    actionCell.appendChild(addButton);
    row.appendChild(actionCell);
    
    priceTableBody.appendChild(row);
  });
}

// Sort the data by name or price
function sortData(sortBy) {
  if (sortBy === 'name') {
    currentData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'price') {
    currentData.sort((a, b) => a.bestPrice - b.bestPrice);
  }
  
  displayPriceTable(currentData);
}

// Add an item to the shopping cart
function addToCart(item) {
  console.log('Adding to cart:', item.name);
  
  // Check if item is already in cart
  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
  
  if (existingItemIndex >= 0) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    cartItems.push({
      ...item,
      quantity: 1
    });
  }
  
  // Update cart display and totals
  displayCart();
  updateCartTotals();
  
  console.log('Cart items:', cartItems.length);
}

// Display the shopping cart items
function displayCart() {
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty. Add items from the price table to see savings!</p>`;
    return;
  }
  
  cartItemsContainer.innerHTML = '';
  
  cartItems.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-unit">${item.unit}</span>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-control">
          <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
          <input type="number" min="1" value="${item.quantity}" class="quantity-input" onchange="setQuantity(${index}, this.value)">
          <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <span class="remove-item" onclick="removeFromCart(${index})">✕</span>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
}

// Update item quantity in cart
function updateQuantity(index, change) {
  if (cartItems[index]) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
    displayCart();
    updateCartTotals();
  }
}

// Set specific quantity
function setQuantity(index, value) {
  const quantity = parseInt(value);
  if (cartItems[index] && quantity >= 1) {
    cartItems[index].quantity = quantity;
    updateCartTotals();
  }
}

// Remove item from cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  displayCart();
  updateCartTotals();
}

// Update cart totals and savings calculations
function updateCartTotals() {
  console.log('Updating cart totals for', cartItems.length, 'items');
  
  if (cartItems.length === 0) {
    krogerTotal.textContent = '$0.00';
    aldiTotal.textContent = '$0.00';
    walmartTotal.textContent = '$0.00';
    costcoTotal.textContent = '$0.00';
    bestTotal.textContent = '$0.00';
    totalSavings.textContent = '$0.00';
    shoppingStrategy.innerHTML = 'Add items to see recommendations';
    return;
  }
  
  // Calculate totals for each store
  const totals = {};
  stores.forEach(store => {
    totals[store] = 0;
  });
  
  // Calculate the best possible combination
  let bestCombinationTotal = 0;
  const bestCombination = {};
  
  cartItems.forEach(item => {
    // Calculate store totals
    stores.forEach(store => {
      if (item.prices[store]) {
        totals[store] += item.prices[store] * item.quantity;
      }
    });
    
    // Find best store for this item
    let bestStore = null;
    let bestPrice = Infinity;
    
    stores.forEach(store => {
      if (item.prices[store] && item.prices[store] < bestPrice) {
        bestPrice = item.prices[store];
        bestStore = store;
      }
    });
    
    if (bestStore) {
      bestCombinationTotal += bestPrice * item.quantity;
      
      if (!bestCombination[bestStore]) {
        bestCombination[bestStore] = [];
      }
      
      bestCombination[bestStore].push({
        name: item.name,
        price: bestPrice,
        quantity: item.quantity
      });
    }
  });
  
  // Find worst store total (for max savings calculation)
  const availableTotals = Object.values(totals).filter(total => total > 0);
  const worstTotal = availableTotals.length > 0 ? Math.max(...availableTotals) : 0;
  const maxSavings = worstTotal - bestCombinationTotal;
  
  // Update the UI
  krogerTotal.textContent = totals.Kroger > 0 ? '$' + totals.Kroger.toFixed(2) : 'N/A';
  aldiTotal.textContent = totals.Aldi > 0 ? '$' + totals.Aldi.toFixed(2) : 'N/A';
  walmartTotal.textContent = totals.Walmart > 0 ? '$' + totals.Walmart.toFixed(2) : 'N/A';
  costcoTotal.textContent = totals.Costco > 0 ? '$' + totals.Costco.toFixed(2) : 'N/A';
  bestTotal.textContent = '$' + bestCombinationTotal.toFixed(2);
  totalSavings.textContent = '$' + maxSavings.toFixed(2);
  
  // Generate shopping strategy recommendation
  generateShoppingStrategy(bestCombination);
  
  console.log('Cart totals updated:', {
    kroger: totals.Kroger,
    aldi: totals.Aldi,
    walmart: totals.Walmart,
    costco: totals.Costco,
    best: bestCombinationTotal,
    savings: maxSavings
  });
}

// Generate shopping strategy based on best combination
function generateShoppingStrategy(bestCombination) {
  if (Object.keys(bestCombination).length === 0) {
    shoppingStrategy.innerHTML = 'No recommendations available.';
    return;
  }
  
  let strategyHTML = '';
  
  for (const [store, items] of Object.entries(bestCombination)) {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    strategyHTML += `
      <div style="margin-bottom: var(--space-16);">
        <h5 style="margin-bottom: var(--space-8); color: var(--color-primary);">
          Shop at ${store} (${storeLocations[store]}):
        </h5>
        <ul style="margin: 0; padding-left: var(--space-16);">
          ${items.map(item => `
            <li style="margin-bottom: var(--space-4);">
              ${item.name} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
            </li>
          `).join('')}
        </ul>
        <div style="font-weight: var(--font-weight-medium); margin-top: var(--space-8);">
          Store Total: $${total.toFixed(2)}
        </div>
      </div>
    `;
  }
  
  shoppingStrategy.innerHTML = strategyHTML;
}

// Clear the shopping cart
function clearCart() {
  cartItems = [];
  displayCart();
  updateCartTotals();
}

// Populate item select dropdown for trend chart
function populateItemSelect() {
  // Clear existing options except the first one
  trendItemSelect.innerHTML = '<option value="">Select an item to track</option>';
  
  // Get unique items from the data
  const uniqueItems = [...new Set(groceryData.flatMap(store => 
    store.items.map(item => item.name)
  ))].sort();
  
  // Add options to select
  uniqueItems.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    trendItemSelect.appendChild(option);
  });
}

// Update price trend chart when item selection changes
function updatePriceChart() {
  const selectedItem = trendItemSelect.value;
  
  if (!selectedItem) {
    // Clear chart if no item selected
    if (priceChart) {
      priceChart.destroy();
      priceChart = null;
    }
    return;
  }
  
  // Get price data for selected item across all dates and stores
  const chartData = {
    labels: [],
    datasets: []
  };
  
  // Get all unique dates and sort them
  const dates = [...new Set(groceryData.map(item => item.date))].sort();
  chartData.labels = dates.map(formatDate);
  
  // Colors for each store
  const storeColors = {
    'Kroger': '#1FB8CD',
    'Aldi': '#FFC185',
    'Walmart': '#B4413C',
    'Costco': '#5D878F'
  };
  
  // Create datasets for each store
  stores.forEach(store => {
    const data = [];
    
    dates.forEach(date => {
      // Find store data for this date
      const storeData = groceryData.find(item => 
        item.store === store && item.date === date
      );
      
      // Find item price in this store on this date
      if (storeData) {
        const itemData = storeData.items.find(item => item.name === selectedItem);
        data.push(itemData ? itemData.price : null);
      } else {
        data.push(null);
      }
    });
    
    // Only add dataset if there's at least one price point
    if (data.some(price => price !== null)) {
      chartData.datasets.push({
        label: store,
        data: data,
        borderColor: storeColors[store],
        backgroundColor: 'transparent',
        pointBackgroundColor: storeColors[store],
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6
      });
    }
  });
  
  // Create or update chart
  const ctx = document.getElementById('priceChart').getContext('2d');
  
  if (priceChart) {
    priceChart.destroy();
  }
  
  priceChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.raw.toFixed(2);
            }
          }
        },
        title: {
          display: true,
          text: 'Price Trends: ' + selectedItem,
          font: {
            size: 16
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return '$' + value.toFixed(2);
            }
          },
          title: {
            display: true,
            text: 'Price ($)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        }
      }
    }
  });
}

// Format date for chart labels
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Generate historical data for trends if not available
function generateHistoricalData(data) {
  // If we already have multiple weeks of data, return as is
  const dates = [...new Set(data.map(item => item.date))];
  if (dates.length >= 4) {
    return data;
  }
  
  // Get the most recent date
  const currentDate = new Date(dates.sort().reverse()[0]);
  
  // Generate data for previous weeks
  const enhancedData = [...data];
  const uniqueStores = [...new Set(data.map(item => item.store))];
  
  for (let i = 1; i <= 3; i++) {
    // Create date for previous week
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - (7 * i));
    const dateString = previousDate.toISOString().split('T')[0];
    
    // For each store, create historical data
    uniqueStores.forEach(store => {
      const currentStoreData = data.find(item => item.store === store);
      
      if (currentStoreData) {
        const historicalItems = currentStoreData.items.map(item => {
          // Create a price variation within +/- 8%
          const variation = 0.92 + (Math.random() * 0.16);
          return {
            ...item,
            price: parseFloat((item.price * variation).toFixed(2))
          };
        });
        
        enhancedData.push({
          date: dateString,
          store: store,
          location: currentStoreData.location,
          items: historicalItems
        });
      }
    });
  }
  
  return enhancedData;
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', initApp);