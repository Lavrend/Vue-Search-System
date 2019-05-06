const filter = (data = [], filterQuery = '', fields = []) => {
  let values = String(filterQuery || '').toLowerCase();
  if (!values) return data;

  values = values.split(' ');

  const filterMethod = (item = {}) => {
    const keys = fields.length ? fields : Object.keys(item);

    return keys.some((key) => {
      const itemValue = String(item[key] || '');
      if (!itemValue) return false;

      return values.some(value => itemValue.toLowerCase().indexOf(value.toLowerCase()) > -1);
    });
  };

  return data.filter(filterMethod);
};

export default filter;
