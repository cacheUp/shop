import Order from "../../models/Order";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const order = await Order.find({ user: userId });
  } catch (err) {
    console.error(err);
    res.status(403).send("Please login again");
  }
};
