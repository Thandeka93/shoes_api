export default function shoeApiQuery(db){

    async function getAllShoes () {
      
          const result = await db.any('SELECT * FROM shoes');
          return result;
    }   

    async function getShoesByBrand(brandName) {
        try {
          const result = await db.many('SELECT * FROM shoes WHERE brand = $1', brandName);
          return result;
        } catch (error) {
          console.error('Error fetching shoes by brand:', error);
          throw error;
        }
      }

      async function getShoesBySize(shoeSize) {
        try {
            const result = await db.any('SELECT * FROM shoes WHERE size = $1', shoeSize);  
            return result;
        } catch (error) {
          console.error('Error fetching shoes by brand:', error);
          throw error;
        }
      }

      async function getShoesByBrandAndSize(brandName,shoeSize) {
        try {
            const result = await db.any('SELECT * FROM shoes WHERE brand = $1 AND size = $2', [brandName,shoeSize]);
            return result;
        } catch (error) {
          console.error('Error fetching shoes by brand and size:', error);
          throw error;
        }
      }

      async function getShoesByColor(shoeColor){
        try{
            const result = await db.any('SELECT * FROM shoes WHERE color = $1', shoeColor);
            return result
        } catch (error){
            console.error('Error fetching shoes by color:', error);
            throw error;
        }
      }

      async function getShoesByBrandSizeColor(brandName,shoeSize,shoeColor){
        try{
            const result = await db.any('SELECT * FROM shoes WHERE brand = $1 AND size = $2 AND color = $3', [brandName,shoeSize,shoeColor]);
            return result
        }catch(error){
            console.error('Error fetching shoes by brand, size and color')
        }
      }


return{
    getAllShoes,
    getShoesByBrand,
    getShoesBySize,
    getShoesByBrandAndSize,
    getShoesByColor,
    getShoesByBrandSizeColor
}

}