document.getElementById("themeToggle").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

fetch("drink.json")
  .then((res) => res.json())
  .then((data) => {
    const main = document.querySelector("main");
    const categoryList = document.getElementById("category-list");
    const categories = {};

    data.forEach((item) => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    Object.entries(categories).forEach(([cat, drinks]) => {
      const id = cat.toLowerCase().replace(/\\s+/g, "-");
      const anchor = document.createElement("a");
      anchor.href = `#${id}`;
      anchor.className =
        "inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium text-gongcha-red border-gongcha-red hover:bg-gongcha-red/10 dark:text-white dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 transition";
      anchor.textContent = cat;
      categoryList.appendChild(anchor);

      const section = document.createElement("section");
      section.id = id;
      section.className = "scroll-mt-24 py-6";
      section.innerHTML = `<h2 class="text-xl font-bold text-gongcha-red dark:text-white mb-4">${cat}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>`;
      const grid = section.querySelector("div");

      drinks.forEach((drink) => {
        grid.innerHTML += `
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md transition-all transform hover:scale-102 active:scale-101 hover:shadow-lg fade-in-up">
            <div class="h-40 flex items-center justify-center">
              <img src="${drink.image}" loading="lazy" class="h-full object-contain mx-auto" alt="${drink.name}">

            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-800 dark:text-white min-h-[3rem]">${drink.name}</h3>

<div class="mt-2 text-sm text-gray-600 dark:text-gray-300 flex gap-4">
  <div class="flex items-center">
    <span class="bg-gray-200 dark:bg-gray-700 text-gongcha-red px-2 py-0.5 rounded-full text-xs font-bold">M</span>
    <span class="pl-1">$${drink.price_m.toFixed(2)}</span>
  </div>
  <div class="flex items-center">
    <span class="bg-gray-200 dark:bg-gray-700 text-gongcha-red px-2 py-0.5 rounded-full text-xs font-bold">L</span>
    <span class="pl-1">$${drink.price_l.toFixed(2)}</span>
  </div>
</div>



            </div>
          </div>`;
      });

      main.appendChild(section);
    });
  });


window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  if (splash) splash.style.display = "none";
});
