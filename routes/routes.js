export default function shoeApiRoutes(shoeQuery) {

    async function allShoesRoutes(req, res) {
      try {
        const result = await shoeQuery.getAllShoes();
        return res.json(result);
      } catch (error) {
        console.error('Error in allShoesRoutes:', error);
        res.status(500).send('Internal Server Error');
      }
    }

    async function filterBrand(req, res) {
        try {   
             const brandName = req.params.brandname;
          const result = await shoeQuery.getShoesByBrand(brandName);
          return res.json(result);
        } catch (error) {
          console.error('Error in allShoesRoutes:', error);
          res.status(500).send('Internal Server Error');
        }
      }

      async function filterSize(req, res) {
        try {   
            const shoeSize = req.params.size;
          const result = await shoeQuery.getShoesBySize(shoeSize);
          return res.json(result);
        } catch (error) {
          console.error('Error in allShoesRoutes:', error);
          res.status(500).send('Internal Server Error');
        }
      }

      async function filterColor(req, res) {
        try {
          const shoeColor = req.params.color;
          const result = await shoeQuery.getShoesByColor(shoeColor);
          return res.json(result);
        } catch (error) {
          console.error('Error fetching shoes by color:', error);
          res.status(500).send('Internal Server Error');
        }
    }

    async function filterBrandSizeColor(req, res){
        try{
            const brandName = req.params.brandname;
            const shoeSize = req.params.size;
            const shoeColor = req.params.color;
            const result = await shoeQuery.getShoesByBrandSizeColor(brandName,shoeSize,shoeColor);
            return res.json(result);
        }catch (error){
            console.error('Error fetching shoes by brand, size and color:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async function addToStock (req, res) {
      try {
        const { color, brand, price, size, in_stock, image_url } = req.body;
        const shoeInfo = [color, brand, price, size, in_stock, image_url];
    
        await shoeQuery.addShoeToStock(shoeInfo);
    
        res.status(201).json({ message: 'New shoe added to the stock' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }

  
    return {
      allShoesRoutes,
      filterBrand,
      filterSize,
      filterColor,
      filterBrandSizeColor,
      addToStock
    };
  }