const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/create-order', async (req, res) => {
    try {
        const response = await axios.post('https://sandbox.cashfree.com/pg/orders', {
            order_amount: req.body.amount,
            order_currency: "INR",
            customer_details: {
                customer_id: "cust_" + Date.now(),
                customer_phone: "9999999999"
            }
        }, {
            headers: {
                'x-client-id': process.env.CASHFREE_ID,
                'x-client-secret': process.env.CASHFREE_SECRET,
                'x-api-version': '2023-08-01'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));