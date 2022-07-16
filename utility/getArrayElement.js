exports.findItem = (array, inputData) => {
  const item = array.find(item => item.id == inputData);
  return item;
};

exports.filterItems = (array, inputData) => {
  const items = array.filter(item => item.kota_id == inputData);
  return items;
};