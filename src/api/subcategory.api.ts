export default async function getAllSubcategories() {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`)
  const {data} = await response.json()
  return data;
}
