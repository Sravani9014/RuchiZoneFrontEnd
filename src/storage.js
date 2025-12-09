// storage.js

// Save veg items to localStorage with timestamp
export const saveVegItemsToLocal = (data) => {
  localStorage.setItem(
    "veg_items",
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
  console.log("💾 Veg items saved to localStorage");
};

// Get veg items from localStorage
export const getVegItemsFromLocal = () => {
  const item = localStorage.getItem("veg_items");

  if (!item) return null;

  const parsed = JSON.parse(item);

  // Expire after 10 seconds
  const isExpired = Date.now() - parsed.timestamp > 10000;

  if (isExpired) {
    localStorage.removeItem("veg_items");
    console.log("⏳ Veg items cache expired, removed from localStorage");
    return null;
  }

  console.log("🌿 Loaded veg items from localStorage");
  return parsed.data;
};



export const saveNonVegItemsToLocal = (data) => {
  localStorage.setItem(
    "nonveg_items",
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
  console.log("💾 NonVeg items saved to localStorage");
};

export const getNonVegItemsFromLocal = () => {
  const item = localStorage.getItem("nonveg_items");

  if (!item) return null;

  const parsed = JSON.parse(item);

  // Expire after 10 seconds
  const isExpired = Date.now() - parsed.timestamp > 10000;

  if (isExpired) {
    localStorage.removeItem("nonveg_items");
    console.log("⏳ NonVeg items cache expired, removed from localStorage");
    return null;
  }

  console.log("🍗 Loaded nonveg items from localStorage");
  return parsed.data;
};





