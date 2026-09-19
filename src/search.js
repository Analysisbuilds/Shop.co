document.addEventListener("DOMContentLoaded", () => {
  // Combine both arrays safely
  const topList = typeof topSellingProducts !== "undefined" ? topSellingProducts : [];
  const newList = typeof newArrivalsProducts !== "undefined" ? newArrivalsProducts : [];
  const allProducts = [...topList, ...newList];

  const initSearch = (inputId, dropdownId) => {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);

    if (!input || !dropdown) return;

    input.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();

      if (!query) {
        dropdown.classList.add("hidden");
        dropdown.innerHTML = "";
        return;
      }

      // Match against item.title
      const matches = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query)
      );

      renderDropdown(matches, dropdown);
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });

    // Re-open when focusing back
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
      const link = document.createElement("a");
      link.href = `product-detail.html?id=${product.id}`;
      link.className = "flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer";

      link.innerHTML = `
        ${product.image ? `<img src="${product.image}" alt="${product.title}" class="w-9 h-9 object-cover rounded-md shrink-0" />` : ""}
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">${product.title}</p>
        </div>
        <span class="text-sm font-bold text-black">$${product.price}</span>
      `;

      dropdown.appendChild(link);
    });

    dropdown.classList.remove("hidden");
  };

  initSearch("desktop-search-input", "desktop-search-dropdown");
  initSearch("mobile-search-input", "mobile-search-dropdown");
});