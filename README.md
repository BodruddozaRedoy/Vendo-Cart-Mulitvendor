# VendoCart - Multivendor E-Commerce Platform

![VendoCart Banner](https://placehold.co/800x200?text=VendoCart+Multivendor+Platform&font=roboto)

A full-featured multivendor e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). VendoCart enables entrepreneurs to create their own online marketplace where multiple vendors can sell products to customers.

## 🌟 Features

### For Customers
- Browse products from multiple vendors
- Advanced product search and filtering
- Shopping cart functionality
- Wishlist management
- Secure checkout with Stripe integration
- Order tracking
- User account management

### For Vendors
- Vendor dashboard for store management
- Product listing and inventory management
- Order processing and fulfillment
- Sales analytics and reporting
- Customer communication tools
- Store customization options

### For Admins
- Comprehensive admin dashboard
- User and vendor management
- Product and category management
- Order monitoring and management
- Sales analytics and reporting
- Platform settings configuration

## 🏗️ Architecture

VendoCart follows a microservices-inspired architecture with three main components:

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   Client (Web)  │    │   Dashboard (Web)│    │     Server (API) │
│   (Customer)    │    │   (Vendor/Admin) │    │                  │
└─────────────────┘    └──────────────────┘    └──────────────────┘
         │                       │                        │
         └───────────────────────┼────────────────────────┘
                                 │
                    ┌─────────────────────┐
                    │   MongoDB Database  │
                    └─────────────────────┘
```

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18+, TypeScript, Tailwind CSS, Redux Toolkit, React Router v7 |
| **Dashboard** | React 18+, TypeScript, Tailwind CSS, shadcn/ui, Recharts |
| **Backend** | Node.js, Express.js, MongoDB with Mongoose |
| **Dev Tools** | Vite, ESLint, Prettier, TypeScript |

## 📁 Project Structure

```
vendocart/
├── client/              # Customer-facing frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # State management
│   │   ├── routes/       # Application routing
│   │   └── ...
│   └── package.json
│
├── dashboard/           # Vendor & Admin dashboard
│   ├── src/
│   │   ├── components/   # Dashboard UI components
│   │   ├── pages/        # Dashboard pages
│   │   ├── redux/        # State management
│   │   └── ...
│   └── package.json
│
├── server/              # Backend API
│   ├── src/
│   │   ├── modules/      # Feature modules (auth, products, etc.)
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/       # Configuration files
│   │   └── utils/        # Utility functions
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/vendocart.git
cd vendocart
```

2. **Install dependencies for all three components:**
```bash
# Install client dependencies
cd client && npm install

# Install dashboard dependencies
cd ../dashboard && npm install

# Install server dependencies
cd ../server && npm install
```

3. **Set up environment variables:**
```bash
# Client environment variables
cd ../client
cp .env.example .env
# Edit .env with your configuration

# Dashboard environment variables
cd ../dashboard
cp .env.example .env
# Edit .env with your configuration

# Server environment variables
cd ../server
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development servers:**
```bash
# Start the backend server
cd server
npm run dev

# Start the client (in a new terminal)
cd ../client
npm run dev

# Start the dashboard (in a new terminal)
cd ../dashboard
npm run dev
```

### Available Scripts

#### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Dashboard
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Server
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## 🛠️ Development

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | Get all products |
| POST | `/api/v1/products` | Create a new product |
| GET | `/api/v1/categories` | Get all categories |
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | User login |
| GET | `/api/v1/cart` | Get user's cart |
| POST | `/api/v1/orders` | Create a new order |

### Database Schema

The platform uses MongoDB with the following main collections:
- Users (Customers, Vendors, Admins)
- Products
- Categories
- Orders
- Cart
- Wishlist

## 🔐 Authentication

VendoCart implements JWT-based authentication with role-based access control:
- **Customer**: Browse products, add to cart, place orders
- **Vendor**: Manage products, process orders, view analytics
- **Admin**: Full platform access and management

## 💳 Payment Integration

The platform integrates with Stripe for secure payment processing:
- Credit/debit card payments
- Secure checkout flow
- Payment confirmation and notifications

## 🎨 UI Components

Both client and dashboard interfaces use modern UI components:
- **Client**: Custom component library with responsive design
- **Dashboard**: shadcn/ui components with Tailwind CSS

## 📱 Responsive Design

All interfaces are fully responsive and work on:
- Desktop computers
- Tablets
- Mobile devices

## 🧪 Testing

Testing strategies implemented:
- Unit testing for critical components
- Integration testing for API endpoints
- End-to-end testing for user flows

## 🚢 Deployment

### Production Build

1. Build all components:
```bash
# Build client
cd client && npm run build

# Build dashboard
cd ../dashboard && npm run build

# Build server
cd ../server && npm run build
```

2. Deploy using your preferred platform:
- Vercel/Netlify for frontend
- Heroku/Railway for backend
- MongoDB Atlas for database

## 🤝 Contributing

We welcome contributions to VendoCart! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new functionality
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped build VendoCart
- Inspired by popular e-commerce platforms
- Built with modern web technologies

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

<p align="center">
  Made with ❤️ by the VendoCart Team
</p>