export default function ShoeCatalogueAPIServices(db) {
  async function getListOfShoes() {
      const getShoeListQuery = `SELECT * FROM shoes ORDER BY id;`

      const shoeList = await db.many(getShoeListQuery)

      return shoeList;
  }

  async function getListOfShoesByBrand(brand) {

      const shoeList = await getListOfShoes();

      let modifiedString;

      if (brand.includes(" ")) {
          modifiedString = brand.replaceAll(" ").toUpperCase();
      } else {
          modifiedString = brand.toUpperCase();
      }

      const filteredList = await shoeList.filter(item => item.brand === modifiedString)

      return filteredList;
  }

  async function getListOfShoesBySize(size) {

      const shoeList = await getListOfShoes();

      const filteredList = await shoeList.filter(item => item.size === Number(size))

      return filteredList;
  }

  async function getListOfShoesByBrandAndSize(brand, size) {
      const shoeList = await getListOfShoes();

      let modifiedString;

      if (brand.includes("-")) {
          modifiedString = brand.replaceAll("-", " ").toUpperCase();
      } else {
          modifiedString = brand.toUpperCase();
      }

      const filteredList = await shoeList.filter(item => item.brand === modifiedString && item.size === Number(size))

      return filteredList;
  }

  async function getListOfShoesByColour(colour) {
      const shoeList = await getListOfShoes();

      let modifiedString;

      if (colour.includes("-")) {
          modifiedString = colour.replaceAll("-", " ").toLowerCase();
      } else {
          modifiedString = colour.toLowerCase();
      }

      const filteredList = await shoeList.filter(item => item.colour.toLowerCase() === modifiedString)

      return filteredList;
  }

  async function getListOfShoesByBrandAndColour(brand, colour) {
      const shoeList = await getListOfShoes();

      let modifiedStringBrand;
      let modifiedStringColour;

      if (brand.includes("-")) {
          modifiedStringBrand = brand.replaceAll("-", " ").toUpperCase();
      } else {
          modifiedStringBrand = brand.toUpperCase();
      }

      if (colour.includes("-")) {
          modifiedStringColour = colour.replaceAll("-", " ").toLowerCase();
      } else {
          modifiedStringColour = colour.toLowerCase();
      }

      const filteredList = await shoeList.filter(item => item.brand === modifiedStringBrand && item.colour.toLowerCase() === modifiedStringColour)

      return filteredList;
  }

  async function getListOfShoesByBrandAndColourAndSize(brand, colour, size) {
      const shoeList = await getListOfShoes();

      let modifiedStringBrand;
      let modifiedStringColour;

      if (brand.includes("-")) {
          modifiedStringBrand = brand.replaceAll("-", " ").toUpperCase();
      } else {
          modifiedStringBrand = brand.toUpperCase();
      }

      if (colour.includes("-")) {
          modifiedStringColour = colour.replaceAll("-", " ").toLowerCase();
      } else {
          modifiedStringColour = colour.toLowerCase();
      }

      const filteredList = await shoeList.filter(item => item.brand === modifiedStringBrand && item.colour.toLowerCase() === modifiedStringColour && item.size === Number(size))

      return filteredList;
  }

  async function getListOfShoesByColourAndSize(colour, size) {
      const shoeList = await getListOfShoes();

      let modifiedStringColour;

      if (colour.includes("-")) {
          modifiedStringColour = colour.replaceAll("-", " ").toLowerCase();
      } else {
          modifiedStringColour = colour.toLowerCase();
      }

      const filteredList = await shoeList.filter(item => item.colour.toLowerCase() === modifiedStringColour && item.size === Number(size))

      return filteredList;
  }

  async function updateStock(shoeId, total) {
      const updateStockQuery = `UPDATE shoes SET in_stock = in_stock - $2 WHERE id = $1;`

      await db.none(updateStockQuery, [shoeId, total]);
  }

  async function addShoe(name, brand, colour, size, price, in_stock, img_src) {
      const addShoeQuery = `INSERT INTO shoes (name, brand, colour, size, price, in_stock, img_src)
      VALUES ($1, $2, $3, $4, $5, $6, $7);`

      await db.none(addShoeQuery, [name, brand, colour, size, price, in_stock, img_src])
  }

  return {
      getListOfShoes,
      getListOfShoesByBrand,
      getListOfShoesBySize,
      getListOfShoesByBrandAndSize,
      getListOfShoesByColour,
      getListOfShoesByBrandAndColour,
      getListOfShoesByBrandAndColourAndSize,
      getListOfShoesByColourAndSize,
      updateStock,
      addShoe
  }
}