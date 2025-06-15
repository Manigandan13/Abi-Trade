export function convertToCandlestickLike(prices) {
  return prices.map(([timestamp, price]) => {
    const open = price * 0.995;
    const close = price * 1.005;
    const low = Math.min(open, close) * 0.99;
    const high = Math.max(open, close) * 1.01;

    return {
      x: timestamp,
      y: [open, high, low, close],
    };
  });
}

