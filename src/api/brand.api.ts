export default async function getspecificBrand({id}:{id:string}) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
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
    console.error('Error fetching brand:', error);
    throw error;
  }
}