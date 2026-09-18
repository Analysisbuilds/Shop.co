// Global Cart State from LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const DELIVERY_FEE = 15;

// Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const emptyCartView = document.getElementById('empty-cart-view');
const cartContentView = document.getElementById('cart-content-view');

// Summary Price Elements
const subtotalElem = document.getElementById('summary-subtotal');
const discountElem = document.getElementById('summary-discount');
const deliveryElem = document.getElementById('summary-delivery');
const totalElem = document.getElementById('summary-total');

// Update Header Cart Count Badge
function updateHeaderCartBadge() {
  const cartCountElem = document.getElementById('cart-count');
  if (!cartCountElem) return;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity > 0) {
    cartCountElem.textContent = totalQuantity;
    cartCountElem.classList.remove('hidden');
  } else {
    cartCountElem.textContent = '0';
    cartCountElem.classList.add('hidden');
  }
}

// Render Cart Items and Calculations
function renderCart() {
  updateHeaderCartBadge();

  if (!cart || cart.length === 0) {
    emptyCartView.classList.remove('hidden');
    cartContentView.classList.add('hidden');
    return;
  }

  emptyCartView.classList.add('hidden');
  cartContentView.classList.remove('hidden');

  // Render Items List
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
      <!-- Item Image -->
      <div class="w-24 h-24 sm:w-32 sm:h-32 bg-[#F0EEED] rounded-xl flex items-center justify-center p-2 shrink-0">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-contain" />
      </div>

      <!-- Item Info -->
      <div class="flex flex-col justify-between grow self-stretch">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-black leading-tight">${item.title}</h3>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">Size: <span class="text-gray-700">Large</span></p>
            <p class="text-xs sm:text-sm text-gray-500">Color: <span class="text-gray-700">Standard</span></p>
          </div>
          
          <!-- Delete Trash Button -->
          <button 
            data-id="${item.id}" 
            class="delete-item-btn text-rose-500 hover:text-rose-700 p-1 transition-colors"
            aria-label="Remove item"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="flex justify-between items-center mt-2">
          <span class="text-lg sm:text-2xl font-bold text-black">$${item.price}</span>

          <!-- Quantity Stepper Buttons -->
          <div class="flex items-center gap-3 bg-[#F0F0F0] px-3 sm:px-4 py-1.5 rounded-full">
            <button 
              data-id="${item.id}" 
              class="decrease-qty-btn text-black font-bold text-lg hover:text-gray-600 transition-colors"
            >
              &minus;
            </button>
            <span class="text-sm font-medium text-black min-w-4 text-center">${item.quantity}</span>
            <button 
              data-id="${item.id}" 
              class="increase-qty-btn text-black font-bold text-lg hover:text-gray-600 transition-colors"
            >
              &#43;
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Calculate Totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.20); // 20% discount calculation
  const total = subtotal - discount + (subtotal > 0 ? DELIVERY_FEE : 0);

  // Update Summary UI
  subtotalElem.textContent = `$${subtotal}`;
  discountElem.textContent = `-$${discount}`;
  deliveryElem.textContent = subtotal > 0 ? `$${DELIVERY_FEE}` : '$0';
  totalElem.textContent = `$${total}`;
}

// Persist Cart Changes to LocalStorage
function saveAndRefresh() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Event Delegation for Quantity & Delete Buttons
document.addEventListener('click', (e) => {
  const target = e.target;

  // Increase Quantity (+)
  if (target.classList.contains('increase-qty-btn')) {
    const id = Number(target.getAttribute('data-id'));
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
      saveAndRefresh();
    }
  }

  // Decrease Quantity (-)
  if (target.classList.contains('decrease-qty-btn')) {
    const id = Number(target.getAttribute('data-id'));
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
      saveAndRefresh();
    }
  }

  // Delete Item (Trash Bin)
  if (target.classList.contains('delete-item-btn')) {
    const id = Number(target.getAttribute('data-id'));
    cart = cart.filter(i => i.id !== id);
    saveAndRefresh();
  }
});

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});