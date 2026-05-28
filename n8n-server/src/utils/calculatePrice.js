export const calculatePrice = (price, discount = 0) => {
  const safePrice = Number(price) || 0;
  const safeDiscount = Math.min(Math.max(Number(discount) || 0, 0), 100);

  const finalPrice = safePrice - (safePrice * safeDiscount) / 100;

  return {
    price: safePrice,
    discount: safeDiscount,
    final_price: Number(finalPrice.toFixed(2)),
    price_formatted: `$${finalPrice.toFixed(2)}`,
    original_price_formatted: `$${safePrice.toFixed(2)}`,
  };
};