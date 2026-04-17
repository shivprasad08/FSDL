const STORAGE_KEYS = {
    cart: "veloura_cart",
    wishlist: "veloura_wishlist"
};

let activeCategory = null;
let activeSort = "newest";
let searchQuery = "";
let selectedProduct = null;

let cart = loadFromStorage(STORAGE_KEYS.cart, []);
let wishlist = loadFromStorage(STORAGE_KEYS.wishlist, []);

const elements = {
    navbar: document.getElementById("mainNavbar"),
    shopSection: document.getElementById("shop"),
    catalogSection: document.getElementById("catalogSection"),
    catalogTitle: document.getElementById("catalogTitle"),
    productsContainer: document.getElementById("productsContainer"),
    emptyState: document.getElementById("emptyState"),
    resultCount: document.getElementById("resultCount"),
    sortSelect: document.getElementById("sortSelect"),
    searchInput: document.getElementById("searchInput"),
    wishlistBadge: document.getElementById("wishlistBadge"),
    wishlistBtn: document.getElementById("wishlistBtn"),
    cartBadge: document.getElementById("cartBadge"),
    cartItems: document.getElementById("cartItems"),
    cartItemCount: document.getElementById("cartItemCount"),
    cartSubtotal: document.getElementById("cartSubtotal"),
    checkoutBtn: document.getElementById("checkoutBtn"),
    newsletterForm: document.getElementById("newsletterForm"),
    newsletterEmail: document.getElementById("newsletterEmail"),
    newsletterError: document.getElementById("newsletterError"),
    productModalBody: document.getElementById("productModalBody"),
    toastContainer: document.getElementById("toastContainer")
};

const productModal = new bootstrap.Modal(document.getElementById("productModal"));

function loadFromStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        return fallback;
    }
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
}

function getProductById(productId) {
    return PRODUCTS.find((product) => product.id === productId);
}

function formatCurrency(amount) {
    return `₹${amount.toFixed(2)}`;
}

function renderStars(rating) {
    const rounded = Math.round(rating);
    let output = "";
    for (let index = 1; index <= 5; index += 1) {
        output += `<i class="fa-${index <= rounded ? "solid" : "regular"} fa-star"></i>`;
    }
    return output;
}

function getVisibleProducts() {
    if (!activeCategory) {
        return [];
    }

    return PRODUCTS.filter((product) => {
        const categoryMatch = product.category === activeCategory;
        const searchMatch = product.name.toLowerCase().includes(searchQuery);
        return categoryMatch && searchMatch;
    }).sort((first, second) => {
        if (activeSort === "priceLow") {
            return first.price - second.price;
        }
        if (activeSort === "priceHigh") {
            return second.price - first.price;
        }
        if (activeSort === "rating") {
            return second.rating - first.rating;
        }
        return second.newest - first.newest;
    });
}

function formatCategoryTitle(category) {
    if (category === "men") {
        return "Men's Products";
    }
    if (category === "women") {
        return "Women's Products";
    }
    return "Accessories Products";
}

function renderProducts() {
    const products = getVisibleProducts();
    elements.productsContainer.innerHTML = "";
    elements.emptyState.classList.toggle("d-none", products.length > 0);
    elements.resultCount.textContent = `${products.length} styles found`;
    if (activeCategory) {
        elements.catalogTitle.textContent = formatCategoryTitle(activeCategory);
    }

    products.forEach((product) => {
        const isWishlisted = wishlist.includes(product.id);
        const isNew = product.newest >= 10;
        const hasTopRating = product.rating >= 4.7;
        const oldPrice = product.price + Math.round(product.price * 0.2);
        const productCard = document.createElement("div");
        productCard.className = "col-sm-6 col-lg-4 col-xl-3";
        productCard.innerHTML = `
            <article class="product-card h-100" data-id="${product.id}">
                <div class="product-image-wrap">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-badges">
                        ${isNew ? '<span class="deal-badge">NEW</span>' : '<span class="deal-badge offer">20% OFF</span>'}
                        ${hasTopRating ? '<span class="deal-badge top">TOP RATED</span>' : ""}
                    </div>
                    <button class="wishlist-toggle ${isWishlisted ? "active" : ""}" data-action="toggleWishlist" data-id="${product.id}" aria-label="Toggle wishlist">
                        <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
                    </button>
                    <button class="quick-view-btn" data-action="openModal" data-id="${product.id}">Quick View</button>
                </div>
                <div class="product-body">
                    <span class="product-category text-capitalize">${product.category}</span>
                    <h5 class="product-name" data-action="openModal" data-id="${product.id}">${product.name}</h5>
                    <div class="product-rating">${renderStars(product.rating)} <small>${product.rating}</small></div>
                    <div class="price-stack mt-2">
                        <p class="product-price mb-0">${formatCurrency(product.price)}</p>
                        <small class="old-price">${formatCurrency(oldPrice)}</small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <small class="shipping-note">Free shipping</small>
                        <button class="btn btn-sm btn-dark" data-action="addToCart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </article>
        `;
        elements.productsContainer.appendChild(productCard);
    });
}

function updateCounts() {
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartBadge.textContent = cartItemCount;
    elements.cartItemCount.textContent = cartItemCount;
    elements.wishlistBadge.textContent = wishlist.length;
    elements.wishlistBtn.classList.toggle("active", wishlist.length > 0);
}

function renderCart() {
    if (cart.length === 0) {
        elements.cartItems.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
        elements.cartSubtotal.textContent = formatCurrency(0);
        return;
    }

    let subtotal = 0;
    elements.cartItems.innerHTML = cart.map((item) => {
        const product = getProductById(item.id);
        if (!product) {
            return "";
        }
        const lineTotal = product.price * item.quantity;
        subtotal += lineTotal;
        return `
            <div class="cart-item d-flex gap-2 mb-3" data-id="${item.id}">
                <img src="${product.image}" alt="${product.name}" class="cart-thumb">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${product.name}</h6>
                    <small class="text-muted">${formatCurrency(product.price)}</small>
                    <div class="d-flex align-items-center gap-2 mt-2">
                        <button class="qty-btn" data-action="decreaseQty" data-id="${item.id}">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" data-action="increaseQty" data-id="${item.id}">+</button>
                        <button class="btn btn-sm btn-link text-danger p-0 ms-auto" data-action="removeFromCart" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    elements.cartSubtotal.textContent = formatCurrency(subtotal);
}

function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
        return;
    }

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    saveToStorage();
    updateCounts();
    renderCart();
    showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveToStorage();
    updateCounts();
    renderCart();
}

function changeQuantity(productId, delta) {
    const target = cart.find((item) => item.id === productId);
    if (!target) {
        return;
    }
    target.quantity += delta;
    if (target.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    saveToStorage();
    updateCounts();
    renderCart();
}

function toggleWishlist(productId) {
    const product = getProductById(productId);
    if (!product) {
        return;
    }

    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter((id) => id !== productId);
        showToast(`${product.name} removed from wishlist`);
    } else {
        wishlist.push(productId);
        showToast(`${product.name} added to wishlist`);
    }

    saveToStorage();
    updateCounts();
    renderProducts();
}

function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) {
        return;
    }

    selectedProduct = product;
    elements.productModalBody.innerHTML = `
        <div class="row g-4">
            <div class="col-md-6">
                <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h3>${product.name}</h3>
                <p class="text-muted text-capitalize mb-2">${product.category}</p>
                <div class="product-rating mb-2">${renderStars(product.rating)} <small>${product.rating}</small></div>
                <h4 class="mb-3">${formatCurrency(product.price)}</h4>
                <p>${product.description}</p>
                <div class="mb-3">
                    <label class="form-label">Size</label>
                    <select id="modalSize" class="form-select">${product.sizes.map((size) => `<option value="${size}">${size}</option>`).join("")}</select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Color</label>
                    <div id="modalColors" class="d-flex flex-wrap gap-2">${product.colors.map((color) => `<span class="color-chip">${color}</span>`).join("")}</div>
                </div>
                <div class="mb-3">
                    <label for="modalQty" class="form-label">Quantity</label>
                    <input id="modalQty" class="form-control" type="number" min="1" value="1">
                </div>
                <button id="modalAddToCart" class="btn btn-dark">Add to Cart</button>
            </div>
        </div>
    `;
    productModal.show();
}

function showToast(message) {
    const toastElement = document.createElement("div");
    toastElement.className = "toast align-items-center text-bg-dark border-0";
    toastElement.setAttribute("role", "alert");
    toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    elements.toastContainer.appendChild(toastElement);
    const toast = new bootstrap.Toast(toastElement, { delay: 1800 });
    toast.show();
    toastElement.addEventListener("hidden.bs.toast", () => toastElement.remove());
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    const value = elements.newsletterEmail.value.trim();

    if (!validateEmail(value)) {
        elements.newsletterEmail.classList.add("is-invalid");
        elements.newsletterError.textContent = "Please enter a valid email address.";
        return;
    }

    elements.newsletterEmail.classList.remove("is-invalid");
    elements.newsletterForm.reset();
    showToast("Subscribed successfully");
}

function handleProductActions(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) {
        return;
    }

    const action = actionTarget.getAttribute("data-action");
    const productId = Number(actionTarget.getAttribute("data-id"));

    if (action === "addToCart") {
        addToCart(productId);
    } else if (action === "toggleWishlist") {
        toggleWishlist(productId);
    } else if (action === "openModal") {
        openProductModal(productId);
    }
}

function handleCartActions(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) {
        return;
    }

    const action = actionTarget.getAttribute("data-action");
    const productId = Number(actionTarget.getAttribute("data-id"));

    if (action === "increaseQty") {
        changeQuantity(productId, 1);
    } else if (action === "decreaseQty") {
        changeQuantity(productId, -1);
    } else if (action === "removeFromCart") {
        removeFromCart(productId);
    }
}

function setupEventListeners() {
    elements.shopSection.addEventListener("click", (event) => {
        const actionTarget = event.target.closest("[data-action='openCategory']");
        if (!actionTarget) {
            return;
        }

        activeCategory = actionTarget.dataset.category || "men";
        searchQuery = "";
        elements.searchInput.value = "";
        elements.catalogSection.classList.remove("d-none");
        renderProducts();
        elements.catalogSection.scrollIntoView({ behavior: "smooth" });
    });

    elements.sortSelect.addEventListener("change", (event) => {
        activeSort = event.target.value;
        renderProducts();
    });

    elements.searchInput.addEventListener("input", (event) => {
        searchQuery = event.target.value.trim().toLowerCase();
        renderProducts();
    });

    elements.productsContainer.addEventListener("click", handleProductActions);
    elements.cartItems.addEventListener("click", handleCartActions);
    elements.newsletterForm.addEventListener("submit", handleNewsletterSubmit);

    elements.checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Cart is empty");
            return;
        }
        showToast("Checkout flow simulated successfully");
    });

    document.getElementById("productModalBody").addEventListener("click", (event) => {
        if (event.target.id !== "modalAddToCart" || !selectedProduct) {
            return;
        }
        const qtyField = document.getElementById("modalQty");
        const qty = Math.max(1, Number(qtyField.value) || 1);
        addToCart(selectedProduct.id, qty);
        productModal.hide();
    });

    window.addEventListener("scroll", () => {
        elements.navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
}

function init() {
    setupEventListeners();
    renderCart();
    updateCounts();
}

document.addEventListener("DOMContentLoaded", init);
