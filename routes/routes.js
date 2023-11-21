export default function shoeApiRoutes(shoeQuery) {

  async function allShoesRoutes(req, res) {
    try {
      const result = await shoeQuery.getAllShoes();
      console.log(result);
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
      console.error('Error in allShoesRoutes:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async function filterBrandAndSize(req, res) {
    try {
      const brandName = req.params.brandname;
      const shoeSize = req.params.size;

      const result = await shoeQuery.getShoesByBrandAndSize(brandName, shoeSize);
      return res.json(result);
    } catch (error) {
      console.error('Error in allShoesRoutes:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async function filterBrandAndColor(req, res) {
    try {
      const brandName = req.params.brandname;
      const shoeColor = req.params.color;

      const result = await shoeQuery.getShoesByBrandAndColor(brandName, shoeColor);
      return res.json(result);
    } catch (error) {
      console.error('Error in allShoesRoutes:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  async function filterSizeAndColor(req, res) {
    try {
      const shoeSize = req.params.size;
      const shoeColor = req.params.color;

      const result = await shoeQuery.getShoesBySizeAndColor(shoeSize, shoeColor);
      return res.json(result);
    } catch (error) {
      console.error('Error in allShoesRoutes:', error);
      res.status(500).send('Internal Server Error');
    }
  }


  

  async function filterBrandAndSizeAndColor(req, res) {
    try {
      const brandName = req.params.brandname;
      const shoeSize = req.params.size;
      const shoeColor = req.params.color;

      const result = await shoeQuery.getShoesByBrandAndSizeAndColor(brandName, shoeSize,shoeColor);
      return res.json(result);
    } catch (error) {
      console.error('Error in allShoesRoutes:', error);
      res.status(500).send('Internal Server Error');
    }
  }



  async function addShoe(req, res) {
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
    filterBrandAndSize,
    filterBrandAndColor,
    filterSizeAndColor,
    filterBrandAndSizeAndColor,
    addShoe
  };
}