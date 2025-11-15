const calculateTotalPrice = (p, f, pp) => {
  let totalPrice = 0;
  if (p) {
    totalPrice = p;
  }
  if (f) {
    totalPrice = totalPrice - f;
  }
  if (pp) {
    totalPrice = totalPrice - (pp / 100) * totalPrice;
  }
  return Math.floor(totalPrice);
}

export { calculateTotalPrice };