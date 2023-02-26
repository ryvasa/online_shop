import Product from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const response = await product.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json("Product not found");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const qSort = req.query.sort;
    const qCategory = req.query.category;
    const qColors = req.query.color;
    const qSizes = req.query.size;

    try {
      let query = {};

      if (qCategory) {
        query.categories = {
          $in: [qCategory],
        };
      }

      if (qColors) {
        query.colors = {
          $in: [qColors],
        };
      }

      if (qSizes) {
        query.sizes = {
          $in: [qSizes],
        };
      }

      let sortOption = {};

      if (qSort === "newest") {
        sortOption = { createdAt: -1 };
      } else if (qSort === "highest_price") {
        sortOption = { price: -1 };
      } else if (qSort === "lowest_price") {
        sortOption = { price: 1 };
      }

      const products = await Product.find(query).sort(sortOption);

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found!");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const productOrder = async (req, res) => {
  try {
    const data = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, data);
    if (!product) {
      return res.status(404).json("Product not found!");
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
