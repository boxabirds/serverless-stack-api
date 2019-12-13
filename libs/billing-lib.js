export function calculateCost(storage) {
  // Fun with nested ternary operators ?:
  const rate = 
    storage <= 10
    ? 4
    : storage <= 100
      ? 2
      : 1
  return rate * storage * 100
}