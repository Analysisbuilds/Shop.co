document.addEventListener("DOMContentLoaded", () => {
  // Grab array from products.js (supports variable named 'products' or 'productsData')
  const allProducts = typeof products !== "undefined" ? products : (typeof productsData !== "undefined" ? productsData : []);

  const initSearch = (inputId, dropdownId) => {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);

    if (!input || !dropdown) return;

    input.addEventListener("input", (e) => {
      const searchTerm = e.target.value.trim().toLowerCase();

      // Clear dropdown if input is empty
      if (!searchTerm) {
        dropdown.classList.add("hidden");
        dropdown.innerHTML = "";
        return;
      }

      // Filter products matching name/title/category
      const matches = allProducts.filter((item) => {
        const title = (item.name || item.title || "").toLowerCase();
        const category = (item.category || "").toLowerCase();
        return title.includes(searchTerm) || category.includes(searchTerm);
      });

      renderDropdown(matches, dropdown);
    });

    // Close dropdown on click outside
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
        <div class="px-4 py-3 text-sm text-gray-500 text-center">
          No matching products found
        </div>
      `;
      dropdown.classList.remove("hidden");
      return;
    }

    items.forEach((product) => {
      const title = product.name || product.title || "Product";
      const image = product.image || product.img || "";
      const price = product.price ? `$${product.price}` : "";
      const id = product.id || "#";

      const link = document.createElement("a");
      link.href = `product-detail.html?id=${id}`;
      link.className = "flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer";

      link.innerHTML = `
        ${image ? `<img src="${image}" alt="${title}" class="w-9 h-9 object-cover rounded-md shrink-0" />` : ""}
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">${title}</p>
          ${product.category ? `<p class="text-xs text-gray-400 capitalize">${product.category}</p>` : ""}
        </div>
        ${price ? `<span class="text-sm font-bold text-black">${price}</span>` : ""}
      `;

      dropdown.appendChild(link);
    });

    dropdown.classList.remove("hidden");
  };

  // Initialize Desktop & Mobile Search
  initSearch("desktop-search-input", "desktop-search-dropdown");
  initSearch("mobile-search-input", "mobile-search-dropdown");
});