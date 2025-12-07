const giveMeDiscount = product => {
  if (product?.discountPercentage && product?.discountFee) {
    return `-${product?.discountPercentage}% and -${product.discountFee} PKR`;
  }
  if (product?.discountFee) {
    return `-${product?.discountFee} PKR`;
  }
  if (product?.discountPercentage) {
    return `-${product?.discountPercentage}%`;
  }
  return "";
}

export { giveMeDiscount }