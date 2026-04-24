const axios = require('axios');

exports.handler = async (event) => {
  const { amount, customerId } = JSON.parse(event.body);

  const options = {
    method: 'POST',
    url: 'https://sandbox.cashfree.com/pg/orders', // Use production URL for live
    headers: {
      'x-client-id': 'YOUR_CASHFREE_APP_ID',
      'x-client-secret': 'YOUR_CASHFREE_SECRET_KEY',
      'x-api-version': '2023-08-01',
      'Content-Type': 'application/json'
    },
    data: {
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_phone: "9999999999"
      },
      order_meta: {
        return_url: "https://your-site.com/success"
      }
    }
  };

  try {
    const response = await axios.request(options);
    return { statusCode: 200, body: JSON.stringify(response.data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error.response.data) };
  }
};