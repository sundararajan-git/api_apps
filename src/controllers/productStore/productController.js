import Product from "../../models/productStore/productModel.js";
import { AppError } from "../../utils/appError.js";

export const getProducts = async (req, res, next) => {
  try {

    const products = await Product.find();

    res.status(200).json({ data: products });

  } catch (err) {
    next(err)
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new AppError("Id is required", 400)
    }

    const product = await Product.findById(id);

    res.status(200).json({ data: product });

  } catch (err) {
    next(err)
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description || !image) {
      throw new AppError("All fields are required", 400)
    }

    const product = await Product.create(req.body);

    res.status(200).json({ data: product });

  } catch (err) {
    next(err)
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, id } = req.body;

    if (!name || !price || !description || !image || !id) {
      throw new AppError("All fields are required", 400)
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ data: product });

  } catch (err) {
    next(err)
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new AppError("Id is required", 400)
    }

    const product = await Product.findByIdAndDelete(id);

    res.status(200).json({ data: product });

  } catch (err) {
    next(err)
  }
};
