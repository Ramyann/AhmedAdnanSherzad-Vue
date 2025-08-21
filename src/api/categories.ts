export async function fetchCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  return res.json();
}
