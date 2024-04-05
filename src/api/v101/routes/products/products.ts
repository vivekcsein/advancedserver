import { Router } from "express";
const router = Router();
import { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProduct } from "../../controller/products/productsController.js"


router.route("/")
    .get(getAllProducts)
    .post(createNewProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router.route("/:id")
    .get(getProduct)


export default router;