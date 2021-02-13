const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.BT_MERCHANT_ID,
	publicKey: process.env.BT_PUBLIC_KEY,
	privateKey: process.env.BT_PRIVATE_KEY,
});

exports.getToken = (req, res) => {
	gateway.clientToken.generate({}, (err, response) => {
		// pass clientToken to your front-end
		if (err) {
			return res.status(500).send(err);
		} else {
			return res.send(response);
		}
	});
};

exports.processPayment = (req, res) => {
	let nonceFromTheClient = req.body.paymentMethodNonce;
	let amountFromClient = req.body.amount;

	gateway.transaction.sale(
		{
			amount: amountFromClient,
			paymentMethodNonce: nonceFromTheClient,
			// deviceData: deviceDataFromTheClient,
			options: {
				submitForSettlement: true,
			},
		},
		(err, result) => {
			if (err) {
				return res.status(500).send(error);
			} else {
				return res.send(result);
			}
		}
	);
};
