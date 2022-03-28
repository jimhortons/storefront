export async function getProduct(uid) {
  const response = await fetch(`https://shoeshine8k-default-rtdb.firebaseio.com/products/${uid}.json`);
  const product = await response.json();
  return product;
}
