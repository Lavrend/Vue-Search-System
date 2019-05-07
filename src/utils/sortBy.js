const sortByKey = key => (a, b) => {
  if (a[key] > b[key]) return 1;
  if (b[key] > a[key]) return -1;

  return 0;
};

const sortBy = (items = [], key = '', sort = 'asc') => {
  if (!items.length || sort === 'none') return items;

  const newItems = [...items];
  const sorted = newItems.sort(sortByKey(key));

  return sort === 'desc' ? sorted.reverse() : sorted;
};

export default sortBy;
