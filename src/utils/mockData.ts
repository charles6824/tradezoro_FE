import { InvestmentPackage, Investment, Transaction, User } from "@/types/auth";

export const mockCryptoPrices = [
	{
		symbol: "BTC",
		name: "Bitcoin",
		price: 67432.5,
		change: 2.34,
		changePercent: 3.59,
	},
	{
		symbol: "ETH",
		name: "Ethereum",
		price: 2487.63,
		change: -45.23,
		changePercent: -1.79,
	},
	{
		symbol: "BNB",
		name: "Binance Coin",
		price: 598.45,
		change: 12.67,
		changePercent: 2.16,
	},
	{
		symbol: "ADA",
		name: "Cardano",
		price: 0.4523,
		change: 0.0234,
		changePercent: 5.45,
	},
	{
		symbol: "SOL",
		name: "Solana",
		price: 134.56,
		change: 7.89,
		changePercent: 6.23,
	},
	{
		symbol: "DOT",
		name: "Polkadot",
		price: 6.78,
		change: -0.12,
		changePercent: -1.74,
	},
	{
		symbol: "BTCM",
		name: "Bitmain",
		price: 45.23,
		change: 1.45,
		changePercent: 3.21,
	},
	{
		symbol: "SEAL",
		name: "Bitdeer",
		price: 8.92,
		change: 0.65,
		changePercent: 7.85,
	},
];

export const mockPackages: InvestmentPackage[] = [
	{
		id: "1",
		name: "Starter Package",
		description:
			"Perfect for beginners looking to start their crypto investment journey",
		minAmount: 100,
		maxAmount: 1999,
		duration: 5,
		roi: 5,
		isActive: true,
		createdBy: "admin",
	},
	{
		id: "2",
		name: "Professional Package",
		description: "For experienced investors seeking higher returns",
		minAmount: 2000,
		maxAmount: 5999,
		duration: 5,
		roi: 10,
		isActive: true,
		createdBy: "admin",
	},
	{
		id: "3",
		name: "Advance Package",
		description: "Advanced package for serious investors",
		minAmount: 6000,
		maxAmount: 9999,
		duration: 5,
		roi: 15,
		isActive: true,
		createdBy: "admin",
	},
	{
		id: "4",
		name: "Elite Package",
		description: "Premium package with maximum returns for VIP investors",
		minAmount: 10000,
		maxAmount: 49999,
		duration: 5,
		roi: 20,
		isActive: true,
		createdBy: "admin",
	},
];

export const mockUsers: User[] = [
	{
		id: "1",
		email: "john.doe@example.com",
		firstName: "John",
		lastName: "Doe",
		role: "user",
		isVerified: true,
		balance: 5432.5,
		cryptoWallet: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
		joinDate: "2024-01-15",
		hasCompletedSetup: true,
		isActive: true,
	},
	{
		id: "2",
		email: "admin@TradeZerotrading.com",
		firstName: "Admin",
		lastName: "User",
		role: "admin",
		isVerified: true,
		balance: 0,
		joinDate: "2023-12-01",
		hasCompletedSetup: true,
		isActive: true,
	},
];

export const mockInvestments: Investment[] = [
	{
		id: "1",
		userId: "1",
		packageId: "2",
		amount: 5000,
		startDate: "2024-08-01",
		endDate: "2024-10-01",
		currentValue: 5847.5,
		dailyReturn: 41.67,
		status: "active",
	},
	{
		id: "2",
		userId: "1",
		packageId: "1",
		amount: 500,
		startDate: "2024-07-15",
		endDate: "2024-08-15",
		currentValue: 575,
		dailyReturn: 2.5,
		status: "completed",
	},
];

export const mockTransactions: Transaction[] = [
	{
		id: "1",
		userId: "1",
		type: "deposit",
		amount: 6000,
		status: "approved",
		method: "crypto",
		date: "2024-07-30",
		adminNotes: "Verified crypto transaction",
	},
	{
		id: "2",
		userId: "1",
		type: "investment",
		amount: 5000,
		status: "approved",
		method: "crypto",
		date: "2024-08-01",
	},
	{
		id: "3",
		userId: "1",
		type: "return",
		amount: 75,
		status: "approved",
		method: "crypto",
		date: "2024-08-15",
	},
];

export const testimonials = [
	{
		id: 1,
		name: "Sarah Johnson",
		role: "Professional Trader",
		content:
			"This platform has transformed my crypto investment strategy. The returns are consistent and the interface is incredibly user-friendly.",
		avatar:
			"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
		rating: 5,
	},
	{
		id: 2,
		name: "Michael Chen",
		role: "Tech Entrepreneur",
		content:
			"I've tried many investment platforms, but none compare to the transparency and profitability I've experienced here.",
		avatar:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
		rating: 5,
	},
	{
		id: 3,
		name: "Emily Rodriguez",
		role: "Financial Advisor",
		content:
			"The automated ROI system and professional support make this the perfect platform for both beginners and experts.",
		avatar:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
		rating: 5,
	},
];

// Analytics data for admin dashboard
export const mockAnalytics = {
	totalUsers: 1247,
	activeInvestments: 892,
	totalInvested: 2847592.5,
	totalReturns: 421394.75,
	monthlyGrowth: 23.5,
	userGrowthData: [
		{ month: "Jan", users: 120, investments: 89000 },
		{ month: "Feb", users: 165, investments: 127000 },
		{ month: "Mar", users: 189, investments: 156000 },
		{ month: "Apr", users: 234, investments: 198000 },
		{ month: "May", users: 287, investments: 245000 },
		{ month: "Jun", users: 342, investments: 312000 },
	],
};
