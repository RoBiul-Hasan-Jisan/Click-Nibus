const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/checkout/create-session
// body: { items: [{ name, price, quantity, image }], metadata }
async function createSession(req, res) {
  try {
    const { items, metadata } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "No items provided" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata,
      customer_email: req.dbUser?.email,
    });

    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("[stripe] session creation failed:", err.message);
    res.status(500).json({ message: "Could not create checkout session" });
  }
}

module.exports = { createSession };
