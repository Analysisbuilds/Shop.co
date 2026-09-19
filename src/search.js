// Importing product arrays from product.js
import { topSellingProducts, newArrivalsProducts } from './products.js';

// Combine both arrays into one master list
const allProducts = [...topSellingProducts, ...newArrivalsProducts];

document.addEventListener("DOMContentLoaded", () => {
  const initSearch = (inputId, dropdownId) => {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);

    if (!input || !dropdown) return;

    input.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();

      // Hide dropdown if input is empty
      if (!query) {
        dropdown.classList.add("hidden");
        dropdown.innerHTML = "";
        return;
      }

      // Filter products matching name (Tittle) usre input
      const matches = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query)
      );

      renderDropdown(matches, dropdown);
    });

    // Close dropdown 
    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });

    // Re-open dropdown when focusing back into non-empty input
    input.addEventListener("focus", () => {
      if (input.value.trim().length > 0 && dropdown.children.length > 0) {
        dropdown.classList.remove("hidden");
      }
    });
  };

const renderDropdown = (items, dropdown) => {
  dropdown.innerHTML = "";

  if (items.length === 0) {
    dropdown.innerHTML = `
      <div class="px-4 py-3 text-xs text-gray-500 text-center">
        No matching products found
      </div>
    `;
    dropdown.classList.remove("hidden");
    return;
  }

  items.forEach((product) => {
    const link = document.createElement("a");
    link.href = `product-detail.html?id=${product.id}`;

    //  padding (2 by 3) and clear layout
    link.className = "flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0";

    link.innerHTML = `
      ${product.image ? `
        <div class="w-10 h-10 bg-gray-100 rounded-md overflow-hidden shrink-0 flex items-center justify-center p-1">
          <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain" />
        </div>
      ` : ""}
      <div class="flex-1 min-w-0">
        <p class="text-xs sm:text-sm font-medium text-gray-900 truncate">${product.title}</p>
      </div>
      <span class="text-xs sm:text-sm font-bold text-black ml-auto">$${product.price}</span>
    `;

    dropdown.appendChild(link);
  });

  dropdown.classList.remove("hidden");
};

  // Init... Desktop & Mobile search bars
  initSearch("desktop-search-input", "desktop-search-dropdown");
  initSearch("mobile-search-input", "mobile-search-dropdown");
});