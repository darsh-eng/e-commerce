export default async function getspecificSubcategory({id}:{id:string}) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.data) {
      throw new Error('No data found');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    throw error;
  }
}