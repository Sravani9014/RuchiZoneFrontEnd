export const filterItems = (items, searchTerm) => {
  if (!searchTerm) return items;

  return items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
