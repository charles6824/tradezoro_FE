# TradeZeroTrading - Investment Platform Frontend

A modern, responsive cryptocurrency investment platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### User Features

- **Multi-language Support** - Google Translate integration with 9 languages
- **Responsive Design** - Mobile-first approach with dark/light theme
- **Real-time Crypto Ticker** - Live cryptocurrency price updates
- **Investment Management** - Browse packages, make investments, track returns
- **Wallet Operations** - Deposit, withdrawal, and transfer functionality
- **User Dashboard** - Comprehensive overview of investments and transactions
- **Profile Management** - Complete user profile setup and verification

### Admin Features

- **Admin Dashboard** - Complete platform management interface
- **User Management** - View, verify, and manage user accounts
- **Transaction Management** - Approve/reject deposits and withdrawals
- **Investment Oversight** - Monitor all platform investments
- **Package Management** - Create and manage investment packages
- **Analytics** - Platform statistics and performance metrics

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Internationalization**: Google Translate API
- **Deployment**: Vercel with SPA routing support

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd investments/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_API_URL=https://your-backend-api.com
```

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── pages/              # Route components
├── store/              # Redux store and API slices
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # Global styles and themes
└── types/              # TypeScript type definitions
```

## 🎨 Key Components

### Authentication

- JWT-based authentication with automatic token refresh
- Role-based access control (User/Admin)
- Protected routes and conditional rendering

### Dashboard Layouts

- **User Dashboard**: Investment tracking, transactions, profile
- **Admin Dashboard**: Platform management, user oversight
- Responsive sidebar navigation with collapsible design

### Investment System

- Package browsing with detailed information
- Investment creation and tracking
- ROI calculations and progress visualization
- Daily returns processing

### Transaction Management

- Multi-crypto support (BTC, ETH, USDT, TRX, SOL)
- Deposit/withdrawal workflows
- Admin approval system
- Transaction history and filtering

## 🌐 Deployment

### Vercel Deployment

1. **Build Configuration**:

   ```json
   {
   	"rewrites": [
   		{
   			"source": "/((?!api/.*).*)",
   			"destination": "/index.html"
   		}
   	]
   }
   ```

2. **Environment Setup**:
   - Set `VITE_API_URL` in Vercel dashboard
   - Configure custom domain if needed

3. **Deploy**:
   ```bash
   npm run build
   vercel --prod
   ```

## 🔧 Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎯 API Integration

### RTK Query Setup

- Centralized API configuration with automatic caching
- Optimistic updates for better UX
- Error handling and retry logic
- Tag-based cache invalidation

### Endpoints

- **Auth**: Login, register, profile management
- **Users**: Balance, transactions, investments
- **Admin**: User management, transaction processing
- **Packages**: Investment package CRUD operations

## 🌍 Internationalization

- Google Translate integration in header and dashboard
- Support for 9 languages: EN, DE, FR, ES, IT, AR, FA, ZH, KO
- Responsive dropdown with custom styling
- Automatic language detection

## 📱 Responsive Design

- Mobile-first approach with breakpoint system
- Collapsible sidebar navigation
- Touch-friendly interface elements
- Optimized for all screen sizes

## 🔒 Security Features

- JWT token management with secure storage
- Protected routes with role-based access
- Input validation and sanitization
- CORS configuration for API calls

## 🚀 Performance Optimizations

- Code splitting with React.lazy
- Image optimization and lazy loading
- Bundle size optimization with Vite
- Efficient state management with RTK Query caching

## 📄 License

This project is proprietary software for TradeZeroTrading platform.

## 🤝 Contributing

For development guidelines and contribution process, please contact the development team.
