// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      "mongodb+srv://bradb26:Trophybox1@cluster0-rrbed.mongodb.net/portfolio-bball?retryWrites=true",
    JWT_SECRET: "<insert-jwt-secret>",
    CLOUDINARY_URL: "<insert-cloudinary-url>",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
