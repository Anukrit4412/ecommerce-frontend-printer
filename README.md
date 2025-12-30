# Print World - E-Commerce Website for Printers

An interactive e-commerce platform for buying printers, built with a modern web stack. This project features a responsive frontend, a robust backend with payment integration, and a user-friendly shopping experience.

## 🚀 Features

- **Product Catalog**: Browse a variety of printers including Laser, Inkjet, and Mobile printers.
- **Shopping Cart**: Add products to cart with real-time updates and toast notifications.
- **Secure Checkout**: Integrated with eSewa payment gateway for secure transactions.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **User Authentication**: Login functionality for user accounts.
- **Dynamic Navigation**: Seamless navigation between pages without reload issues.
- **Blog & Research**: Informational pages about printing technology and research.
- **About Us**: Company information and team details.

## 🛠️ Technologies Used

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **SQLite**: Lightweight database for product storage
- **eSewa API**: Payment gateway integration
- **Crypto**: For HMAC signature verification

### Frontend
- **HTML5**: Structure and content
- **CSS3**: Styling and responsive design
- **JavaScript**: Client-side interactivity
- **LocalStorage**: Client-side cart persistence

### Development Tools
- **Git**: Version control
- **GitHub**: Repository hosting

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anukrit4412/ecommerce-frontend-printer.git
   cd ecommerce-frontend-printer
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   # or
   node server.js
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` to view the website.

## 📖 Usage

1. **Browse Products**: Visit the Products page to explore available printers.
2. **Add to Cart**: Click "Add to Cart" on any product to add it to your shopping cart.
3. **View Cart**: The cart count updates in real-time in the navigation bar.
4. **Checkout**: Proceed to checkout, enter payment details, and complete purchase via eSewa.
5. **Navigation**: Use the navigation bar to switch between Home, Products, Research, About Us, and Blog pages.

## 🏗️ Project Structure

```
ecommerce-frontend-printer/
├── backend/
│   ├── server.js          # Main server file with API routes
│   ├── package.json       # Backend dependencies
│   └── node_modules/      # Installed packages
├── frontend/
│   └── public/
│       ├── index.html     # Home page
│       ├── css/
│       │   └── style.css  # Main stylesheet
│       ├── JS/
│       │   └── script.js  # Client-side JavaScript
│       ├── images/        # Image assets
│       └── pages/
│           ├── products.html   # Product catalog
│           ├── checkout.html   # Payment page
│           ├── aboutus.html    # About page
│           ├── blog.html       # Blog page
│           └── research.html   # Research page
├── README.md              # Project documentation
└── .git/                  # Git repository
```

## 🔌 API Endpoints

- `GET /api/products` - Retrieve all products
- `POST /checkout` - Process payment and generate eSewa form

## 💳 Payment Integration

The application integrates with eSewa's payment gateway:
- Secure HMAC signature verification
- Redirect to eSewa for payment processing
- Success/failure handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Anukrit** - *Developer* - [Anukrit4412](https://github.com/Anukrit4412)

## 🙏 Acknowledgments

- eSewa for payment gateway services
- Icons and images from various free sources
- Inspiration from modern e-commerce platforms

---

**Note**: This is a demonstration project. For production use, ensure proper security measures, database scaling, and compliance with payment regulations.
