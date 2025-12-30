const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend/public directory
app.use(express.static('../frontend/public'));

// Route for root to serve index.html
app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Database setup
const db = new sqlite3.Database('./ecommerce.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    description TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_uuid TEXT,
    product_code TEXT,
    total_amount REAL,
    status TEXT
  )`, (err) => {
    if (err) {
      console.error(err);
    } else {
      // Sample products
      const sampleProducts = [
        { name: 'Printer 1', price: 100, description: 'A great printer' },
        { name: 'Printer 2', price: 200, description: 'Another printer' },
        // Add more
      ];
      // Insert sample products if table is empty
      db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (err) {
          console.error(err);
        } else if (row.count === 0) {
          sampleProducts.forEach(product => {
            db.run(`INSERT INTO products (name, price, description) VALUES (?, ?, ?)`, [product.name, product.price, product.description]);
          });
        }
      });
    }
  });
});

// Routes
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Checkout endpoint
app.post('/checkout', (req, res) => {
  console.log('Checkout request received', req.body);
  if (!req.body) {
    return res.status(400).send('Invalid request body');
  }
  const { amount, tax_amount = 0, product_service_charge = 0, product_delivery_charge = 0, transaction_uuid, product_code = 'EPAYTEST' } = req.body;

  const total_amount = parseFloat(amount) + parseFloat(tax_amount) + parseFloat(product_service_charge) + parseFloat(product_delivery_charge);

  // Generate signature
  const secret = '8gBm/:&EnhH.1/q'; // Test secret
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const signature = crypto.createHmac('sha256', secret).update(message).digest('base64');

  // Save order
  db.run(`INSERT INTO orders (transaction_uuid, product_code, total_amount, status) VALUES (?, ?, ?, ?)`, [transaction_uuid, product_code, total_amount, 'PENDING'], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Generate HTML form for eSewa
  const formHtml = `
    <!DOCTYPE html>
    <html>
    <head><title>eSewa Payment</title></head>
    <body style="text-align: center; padding: 50px;">
      <h2>Redirecting to eSewa...</h2>
      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
        <input type="hidden" name="amount" value="${amount}">
        <input type="hidden" name="tax_amount" value="${tax_amount}">
        <input type="hidden" name="total_amount" value="${total_amount}">
        <input type="hidden" name="transaction_uuid" value="${transaction_uuid}">
        <input type="hidden" name="product_code" value="${product_code}">
        <input type="hidden" name="product_service_charge" value="${product_service_charge}">
        <input type="hidden" name="product_delivery_charge" value="${product_delivery_charge}">
        <input type="hidden" name="success_url" value="http://localhost:${PORT}/success">
        <input type="hidden" name="failure_url" value="http://localhost:${PORT}/failure">
        <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code">
        <input type="hidden" name="signature" value="${signature}">
        <button type="submit" style="padding: 10px 20px; font-size: 16px;">Proceed to eSewa Payment</button>
      </form>
    </body>
    </html>
  `;

  res.send(formHtml);
});

// Success callback
app.get('/success', (req, res) => {
  const data = req.query.data;
  if (!data) return res.status(400).send('No data');

  // Decode base64
  const decoded = Buffer.from(data, 'base64').toString('utf-8');
  const response = JSON.parse(decoded);

  // Verify signature
  const signedFields = response.signed_field_names.split(',');
  let message = '';
  signedFields.forEach(field => {
    message += `${field}=${response[field]},`;
  });
  message = message.slice(0, -1); // Remove last comma

  const expectedSignature = crypto.createHmac('sha256', '8gBm/:&EnhH.1/q').update(message).digest('base64');

  if (expectedSignature === response.signature) {
    // Update order status
    db.run(`UPDATE orders SET status = 'COMPLETE' WHERE transaction_uuid = ?`, [response.transaction_uuid]);
    res.send('Payment successful!');
  } else {
    res.send('Payment verification failed!');
  }
});

// Failure callback
app.get('/failure', (req, res) => {
  res.send('Payment failed or canceled.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});