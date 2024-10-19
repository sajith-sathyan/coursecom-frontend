const stripe = require('stripe')('sk_test_51P5cjSSDtBrdUAuUOluwokEDq8BDJiy6jJdvWijKkbFyg6OtJ4R94d7hOspylaWuMLB9usgGoctVtojvPN2XdIYj00eOpuv79S');

module.exports.checkout = async (req, res) => {
    console.log("checkout called");
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: "req.body.name",
                  },
                  unit_amount:100*100,
                },
                quantity: 1, // Add quantity here
              },
            ],
            mode: "payment",
            success_url:  "http://localhost:3000",
            cancel_url: "http://localhost:3000",
            customer_email: "triangle4business@gmail.com",
            billing_address_collection: 'required',
            metadata: {
                customer_name: req.body.customer_name, 
                customer_address: req.body.customer_address 
            }
        });
        res.json({ url: session.url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
