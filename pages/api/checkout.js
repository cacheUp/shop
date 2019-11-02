import Stripe from "stripe";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import calculateCartTotal from "../../utils/calculateCartTotal";
import Order from "../../models/Order";
import Product from "../../models/Product";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentData } = req.body;

  try {
    console.log("hit");
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });
    console.log(cart, "cart");

    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);

    console.log("totals", cartTotal, stripeTotal);

    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1
    });

    const isExistingCustomer = prevCustomer.data.length > 0;
    let newCustomer;

    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      });
    }

    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;

    console.log("customer", customer);

    const charge = await stripe.charges.create(
      {
        currency: "USD",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`
      },
      { idempotency_key: uuidv4() }
    );
    console.log("charge", charge);
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products
    }).save();

    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });
    res.status(200).send("Checkout success");
  } catch (err) {
    console.error(err);
  }
};
