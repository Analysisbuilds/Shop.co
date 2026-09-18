import { newArrivalsProducts, topSellingProducts } from '../src/Products.js';
const closeAnnouncementBtn = document.getElementById('close-announcement');
const announcementBar = document.getElementById('announcement-bar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (closeAnnouncementBtn && announcementBar) {
  closeAnnouncementBtn.addEventListener('click', () => {
    announcementBar.classList.add('hidden');
  });
}


if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCartUI() {
  localStorage.setItem('cart', JSON.stringify(cart));
  
  const cartCountElem = document.getElementById('cart-count');
  if (cartCountElem) {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity > 0) {
      cartCountElem.textContent = totalQuantity;
      cartCountElem.classList.remove('hidden');
    } else {
      cartCountElem.textContent = '0';
      cartCountElem.classList.add('hidden');
    }
  }
}

function addToCart(productId) {
  // Always refresh cart state from localStorage 
  cart = JSON.parse(localStorage.getItem('cart')) || [];

  const allProducts = [...newArrivalsProducts, ...topSellingProducts];
  const product = allProducts.find(p => p.id === productId);

  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

//Generate Star Rating SVG Icons
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let starsHTML = '';

  for (let i = 0; i < fullStars; i++) {
    starsHTML += `
      <svg class="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>`;
  }

  if (hasHalfStar) {
    starsHTML += `
      <div class="relative w-4 h-4">
        <svg class="absolute w-4 h-4 text-gray-200 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <svg class="absolute w-4 h-4 text-amber-400 fill-current overflow-hidden" style="width: 50%" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>`;
  }

  return starsHTML;
}

// Rendering Product Cards
function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return; // 2 Safely exits if the container doesn't exist

  container.innerHTML = products.map(product => `
    <div class="flex flex-col group cursor-pointer">
      <div class="bg-[#F0EEED] rounded-2xl sm:rounded-[20px] aspect-square flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div class="mt-4 flex flex-col grow">
        <h3 class="text-sm sm:text-base font-bold text-black line-clamp-1">
          ${product.title}
        </h3>

        <div class="flex items-center gap-2 mt-1.5">
          <div class="flex items-center gap-0.5">
            ${renderStars(product.rating)}
          </div>
          <span class="text-xs sm:text-sm text-gray-500 font-normal">
            ${product.rating}/<span class="text-gray-400">5</span>
          </span>
        </div>

        <div class="flex items-center gap-2.5 mt-2">
          <span class="text-lg sm:text-2xl font-bold text-black">$${product.price}</span>
          ${product.originalPrice ? `<span class="text-lg sm:text-2xl font-bold text-gray-400 line-through">$${product.originalPrice}</span>` : ''}
          ${product.discount ? `<span class="text-xs sm:text-sm font-medium text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">${product.discount}</span>` : ''}
        </div>

        <!-- Add to Cart Button -->
        <button 
          data-id="${product.id}"
          class="add-to-cart-btn mt-3 w-full bg-black text-white text-xs sm:text-sm font-medium py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Event Listener for Add to Cart Buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const productId = Number(e.target.getAttribute('data-id'));
    addToCart(productId);

    //  Feedback
    const originalText = e.target.textContent;
    e.target.textContent = 'Added!';
    e.target.classList.replace('bg-black', 'bg-emerald-600');

    setTimeout(() => {
      e.target.textContent = originalText;
      e.target.classList.replace('bg-emerald-600', 'bg-black');
    }, 1000);
  }
});

//  Cart Count when active/focused {Sync}
window.addEventListener('pageshow', () => {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartUI();
});

// Init................
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(newArrivalsProducts, 'new-arrivals-grid');
  renderProducts(topSellingProducts, 'top-selling-grid');
  updateCartUI();
});