export default function ShoeCatalogueAPIRoutes(shoeCatalogueAPIServices) {
  async function getAllShoes(req, res) {

      try {
          const data = await shoeCatalogueAPIServices.getListOfShoes();
          
          res.json(data)
      }

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }

  }

  async function getShoesByBrand(req, res) {
      const brand = req.params.brandname;

      try {
          const data = await shoeCatalogueAPIServices.getListOfShoesByBrand(brand)

          res.json(data)
      }

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }


  }

  async function getShoesBySize(req, res) {
      const size = req.params.size;

      try {
          const data = await shoeCatalogueAPIServices.getListOfShoesBySize(size)

          res.json(data)
      } 

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }


  }

  async function getShoesByBrandAndSize(req, res) {
      const brand = req.params.brandname;
      const size = req.params.size;

      try {
          const data = await shoeCatalogueAPIServices.getListOfShoesByBrandAndSize(brand, size)
          
          res.json(data)
      }

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }


  }

  async function getShoesByColour(req, res) {
      const colour = req.params.colour;

      try {
          const data = await shoeCatalogueAPIServices.getListOfShoesByColour(colour);

          res.json(data)
      }

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }

  }

  async function getShoesByBrandAndColour(req, res) {
      const brand = req.params.brandname;
      const colour = req.params.colour;

      try {
          const data = await shoeCatalogueAPIServices.getListOfShoesByBrandAndColour(brand, colour);

          res.json(data)
      }

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }
  }

  async function getShoesByBrandAndColourAndSize(req, res) {
      const brand = req.params.brandname;
      const colour = req.params.colour;
      const size = req.params.size;

      try {
          const data = await shoeCatalogueAPIServices.getListOfShoesByBrandAndColourAndSize(brand, colour, size)

          res.json(data)
      }

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }
  }

  async function getShoesByColourAndSize(req, res) {
      const colour = req.params.colour;
      const size = req.params.size;

      try {
          const data = await shoeCatalogueAPIServices.getListOfShoesByColourAndSize(colour, size);

          res.json(data)
      }

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }
  }

  async function updateShoeStock(req, res) {
      const shoeId  = req.params.id;
      const total = req.body.total;

      try {
          await shoeCatalogueAPIServices.updateStock(shoeId, total);

          res.json({
              status: "success"
          })
      }

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }

  }

  async function addNewShoe(req, res) {
      const { name, brand, colour, size, price, in_stock, img_src } = req.body;

      try {
          await shoeCatalogueAPIServices.addShoe(name, brand, colour, size, price, in_stock, img_src)
          
          res.json({
              status: "success"
          })
      } 

      catch(err) {
          res.json({
              status: "error",
              error: err.stack
          })
      }
  }

  return {
      getAllShoes,
      getShoesByBrand,
      getShoesBySize,
      getShoesByBrandAndSize,
      getShoesByColour,
      getShoesByBrandAndColour,
      getShoesByBrandAndColourAndSize,
      getShoesByColourAndSize,
      updateShoeStock,
      addNewShoe
  }
}