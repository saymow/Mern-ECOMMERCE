import { Router } from "express";

import productRoutes from "./products.routes";
import userRoutes from "./user.routes";
import orderRoutes from "./order.routes";

const routes = Router();

routes.use("/products", productRoutes);
routes.use("/users", userRoutes);
routes.use("/orders", orderRoutes);

routes.get("/config/paypal", (req, res) => {
  console.log(process.env.PAYPAL_CLIENT_ID);
  res.send(process.env.PAYPAL_CLIENT_ID);
});

export default routes;
