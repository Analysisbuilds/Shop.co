import { topSellingProducts, newArrivalsProducts } from './products.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");
  const breadcrumbTitle = document.getElementById("breadcrumb-title");

  // Get product ID from URL query parametr (?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = Number(urlParams.get("id"));

  const allProducts = [...topSellingProducts, ...newArrivalsProducts];
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    if (container) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16">
          <h2 class="text-2xl font-bold text-gray-800">Product Not Found</h2>
          <p class="text-gray-500 mt-2">The product you are looking for does not exist.</p>
          <a href="index.html" class="inline-block mt-6 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800">Return to Home</a>
        </div>
      `;
    }
    return;
  }

  // uper > Navigation
  const breadcrumbContainer = document.getElementById("breadcrumb-container");
  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = `
      <nav class="flex items-center gap-2 text-sm text-gray-500 py-4 px-4 sm:px-8 max-w-7xl mx-auto">
        <a href="index.html" class="hover:text-black transition-colors">Home</a>
        <span>&gt;</span>
        <a href="#" class="hover:text-black transition-colors">Shop</a>
        <span>&gt;</span>
        <a href="#" class="hover:text-black transition-colors">Men</a>
        <span>&gt;</span>
        <span class="text-black font-medium truncate">${product.title}</span>
      </nav>
    `;
  }

  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = product.title;
  }

  let quantity = 1;
  let selectedSize = "Large"; 

  // Star Rating Helper
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let html = '';

    for (let i = 0; i < fullStars; i++) {
      html += `
        <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>`;
    }
    if (hasHalfStar) {
      html += `
        <div class="relative w-5 h-5">
          <svg class="absolute w-5 h-5 text-gray-200 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <svg class="absolute w-5 h-5 text-amber-400 fill-current overflow-hidden" style="width: 50%" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>`;
    }
    return html;
  };

  // Injecting UI to container
  container.className = "max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start";

  container.innerHTML = `
    <!-- LARGE SINGLE IMAGE CONTAINER -->
    <div class="bg-[#F0EEED] rounded-[20px] aspect-square flex items-center justify-center p-6 sm:p-12 overflow-hidden w-full">
      <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain max-h-125" />
    </div>

    <!-- PRODUCT DETAILS SIDE -->
    <div class="flex flex-col">
      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight leading-tight">
        ${product.title}
      </h1>

      <!-- Rating -->
      <div class="flex items-center gap-3 mt-3 sm:mt-4">
        <div class="flex items-center gap-1">${renderStars(product.rating)}</div>
        <span class="text-sm font-normal text-black">${product.rating}/<span class="text-gray-500">5</span></span>
      </div>

      <!-- Price & Discounts -->
      <div class="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
        <span class="text-3xl sm:text-4xl font-bold text-black">$${product.price}</span>
        ${product.originalPrice ? `<span class="text-3xl sm:text-4xl font-bold text-gray-300 line-through">$${product.originalPrice}</span>` : ''}
        ${product.discount ? `<span class="text-xs sm:text-sm font-medium text-rose-500 bg-rose-100/70 px-3 py-1 rounded-full">${product.discount}</span>` : ''}
      </div>

      <!-- Description -->
      <p class="text-sm sm:text-base text-gray-500 mt-3 sm:mt-4 leading-relaxed border-b border-gray-200/80 pb-6">
        This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
      </p>

      <!-- Choose Size -->
      <div class="py-6 border-b border-gray-200/80">
        <span class="text-sm text-gray-500 block mb-3  font-normal">Choose Size</span>
        <div class="h-5"></div>
        <div class="flex flex-wrap gap-3" id="size-options">
          <button data-size="Small" class="size-btn px-6 py-3 rounded-full text-xs sm:text-sm font-normal bg-[#F0EEED] text-gray-600 hover:bg-black hover:text-white transition-all">Small</button>
          <button data-size="Medium" class="size-btn px-6 py-3 rounded-full text-xs sm:text-sm font-normal bg-[#F0EEED] text-gray-600 hover:bg-black hover:text-white transition-all">Medium</button>
          <button data-size="Large" class="size-btn px-6 py-3 rounded-full text-xs sm:text-sm font-normal bg-black text-white hover:bg-black transition-all">Large</button>
          <button data-size="X-Large" class="size-btn px-6 py-3 rounded-full text-xs sm:text-sm font-normal bg-[#F0EEED] text-gray-600 hover:bg-black hover:text-white transition-all">X-Large</button>
        </div>
      </div>

      <!-- Quantity Selector & Add to Cart -->

      <div class="flex items-center gap-3 sm:gap-4 mt-6">
        <div class="flex items-center justify-between gap-3 sm:gap-4 bg-[#F0EEED] px-6 py-3 rounded-full text-xs sm:text-sm font-normal shrink-0">
          <button id="qty-decrease" class="text-xl font-bold text-black hover:text-gray-600 focus:outline-none select-none">-</button>
          <span id="qty-count" class="text-base font-bold text-black select-none">${quantity}</span>
          <button id="qty-increase" class="text-xl font-bold text-black hover:text-gray-600 focus:outline-none select-none">+</button>
        </div>

        <button id="add-to-cart-btn" class="flex-1 bg-black text-white text-sm sm:text-base font-medium py-3.5 px-6 rounded-full hover:bg-gray-800 transition-all active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  // Quantity Control (+ and -)

  const qtyDecreaseBtn = document.getElementById("qty-decrease");
  const qtyIncreaseBtn = document.getElementById("qty-increase");
  const qtyCountElem = document.getElementById("qty-count");
  const addToCartBtn = document.getElementById("add-to-cart-btn");

  qtyDecreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyCountElem.textContent = quantity;
    }
  });

  qtyIncreaseBtn.addEventListener("click", () => {
    quantity++;
    qtyCountElem.textContent = quantity;
  });


  // Size Selector Toggle Logic
  const sizeBtns = document.querySelectorAll("#size-options .size-btn");
  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach((b) => {
        b.className = "size-btn px-6 py-3 rounded-full text-xs sm:text-sm font-normal bg-[#F0EEED] text-gray-600 hover:bg-black hover:text-white transition-all";
      });
      btn.className = "size-btn px-6 py-3 rounded-full text-xs sm:text-sm font-normal bg-black text-white transition-all";
      selectedSize = btn.getAttribute("data-size");
    });
  });

  // LocalStorage Cart Syncing

  addToCartBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.id === product.id && item.size === selectedSize);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity, size: selectedSize });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update Header Badge Counter
    const cartCountElem = document.getElementById("cart-count");
    if (cartCountElem) {
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountElem.textContent = totalQuantity;
      cartCountElem.classList.remove("hidden");
    }

    // Temporary Button State Animation

    const originalText = addToCartBtn.textContent;
    addToCartBtn.textContent = "Added to Cart!";
    addToCartBtn.classList.replace("bg-black", "bg-emerald-600");

    setTimeout(() => {
      addToCartBtn.textContent = originalText;
      addToCartBtn.classList.replace("bg-emerald-600", "bg-black");
    }, 1200);
  });
});


