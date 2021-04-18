const convertToPesos = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

module.exports = {
  convertToPesos,
};
