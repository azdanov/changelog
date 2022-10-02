import { UPDATE_STATUS } from "@prisma/client";
import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product routes
 */

router.get("/product", getProducts);

router.get("/product/:id", getProduct);

router.post(
  "/product",
  body("name").trim().notEmpty(),
  handleInputErrors,
  createProduct
);

router.patch(
  "/product/:id",
  body("name").trim().notEmpty(),
  handleInputErrors,
  updateProduct
);

router.delete("/product/:id", deleteProduct);

/**
 * Update routes
 */

router.get("/update", getUpdates);

router.get("/update/:id", getUpdate);

router.post(
  "/update",
  body("productId").trim().notEmpty(),
  body("title").trim().notEmpty(),
  body("body").trim().notEmpty(),
  body("asset").trim().notEmpty(),
  handleInputErrors,
  createUpdate
);

router.patch(
  "/update/:id",
  body("title").trim().notEmpty().optional(),
  body("body").trim().notEmpty().optional(),
  body("status").isIn(Object.values(UPDATE_STATUS)).optional(),
  body("version").trim().notEmpty().optional(),
  handleInputErrors,
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * Update point routes
 */

router.get("/updatepoint", (req, res) => {
  res.json({ message: "get updatepoint" });
});

router.get("/updatepoint/:id", (req, res) => {
  res.json({ message: `get updatepoint ${req.params.id}` });
});

router.post(
  "/updatepoint",
  body("name").trim().notEmpty(),
  body("description").trim().notEmpty(),
  body("updateId").trim().notEmpty(),
  handleInputErrors,
  (req, res) => {
    res.json({ message: "post updatepoint" });
  }
);

router.patch(
  "/updatepoint/:id",
  body("body").trim().notEmpty().optional(),
  body("asset").trim().notEmpty().optional(),
  handleInputErrors,
  (req, res) => {
    res.json({ message: `patch updatepoint ${req.params.id}` });
  }
);

router.delete("/updatepoint/:id", (req, res) => {
  res.json({ message: `delete updatepoint ${req.params.id}` });
});

export default router;
