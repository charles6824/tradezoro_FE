import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LandingHeader } from "./components/landing/LandingHeader";
import { LandingFooter } from "./components/landing/LandingFooter";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
// import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PublicPackagesPage } from "./pages/PublicPackagesPage";
// import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { OTPVerificationPage } from "./pages/OTPVerificationPage";
import { DashboardLayout } from "./pages/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminDashboardLayout } from "./pages/AdminDashboardLayout";
import { DepositPage } from "./pages/DepositPage";
import { WithdrawalPage } from "./pages/WithdrawalPage";
import { PackagesPage } from "./pages/PackagesPage";
import { InvestmentsPage } from "./pages/InvestmentsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ReferralsPage } from "./pages/ReferralsPage";
import NotFound from "./pages/NotFound";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { AdminTransactionsPage } from "./pages/AdminTransactionsPage";
import { AdminInvestmentsPage } from "./pages/AdminInvestmentsPage";
import { AdminInvestmentDetailsPage } from "./pages/AdminInvestmentDetailsPage";
import { AdminPackagesPage } from "./pages/AdminPackagesPage";
import { AdminFundPage } from "./pages/AdminFundPage";
import { AdminReportsPage } from "./pages/AdminReportsPage";
import { AdminSettingsPage } from "./pages/AdminSettingsPage";
import AdminPaymentConfigPage from "./pages/AdminPaymentConfigPage";
import { AdminReferralsPage } from "./pages/AdminReferralsPage";
import { AdminMessagesPage } from "./pages/AdminMessagesPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RiskDisclaimer from "./pages/RiskDisclaimer";
import ScrollToTop from "./components/ScrollToTop";
import { ChatPage } from "./pages/ChatPage";
import { AdminChatPage } from "./pages/AdminChatPage";
import TransferPage from "./pages/TransferPage";
import HomePage from "./pages/HomePage";
import TradePage from "./pages/TradePage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { PublicReferralsPage } from "./pages/PublicReferralsPage";

const App = () => (
	<Provider store={store}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					{/* Public routes with header/footer */}
					<Route path="/" element={<HomePage />} />
					<Route
						path="/trade"
						element={
							<>
								<LandingHeader />
								<TradePage />
								<LandingFooter />
							</>
						}
					/>
					<Route
						path="/pricing"
						element={
							<>
								<LandingHeader />
								<PricingPage />
								<LandingFooter />
							</>
						}
					/>
					<Route
						path="/about"
						element={
							<>
								<LandingHeader />
								<AboutPage />
								<LandingFooter />
							</>
						}
					/>
					<Route
						path="/contact"
						element={
							<>
								<LandingHeader />
								<ContactPage />
								<LandingFooter />
							</>
						}
					/>
					<Route
						path="/packages"
						element={
							<>
								<LandingHeader />
								<PublicPackagesPage />
								<LandingFooter />
							</>
						}
					/>
					<Route
						path="/privacy"
						element={
							<>
								<LandingHeader />
								<PrivacyPolicy />
								<LandingFooter />
							</>
						}
					/>
					<Route
						path="/terms"
						element={
							<>
								<LandingHeader />
								<TermsOfService />
								<LandingFooter />
							</>
						}
					/>
					<Route
						path="/risk-disclaimer"
						element={
							<>
								<LandingHeader />
								<RiskDisclaimer />
								<LandingFooter />
							</>
						}
					/>

					{/* Auth routes without header/footer */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/verify-otp" element={<OTPVerificationPage />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
					<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
					<Route path="/public-referrals" element={<PublicReferralsPage />} />

					{/* Dashboard routes with sidebar - Protected */}
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<DashboardLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Dashboard />} />
						<Route path="deposit" element={<DepositPage />} />
						<Route path="withdrawal" element={<WithdrawalPage />} />
						<Route path="transfer" element={<TransferPage />} />
						<Route path="packages" element={<PackagesPage />} />
						<Route path="investments" element={<InvestmentsPage />} />
						<Route path="chat" element={<ChatPage />} />
						<Route path="referrals" element={<ReferralsPage />} />
						<Route path="settings" element={<SettingsPage />} />
					</Route>

					{/* Admin routes with sidebar - Admin Only */}
					<Route
						path="/admin"
						element={
							<AdminRoute>
								<AdminDashboardLayout />
							</AdminRoute>
						}
					>
						<Route index element={<AdminDashboard />} />
						<Route path="users" element={<AdminUsersPage />} />
						<Route path="transactions" element={<AdminTransactionsPage />} />
						<Route path="investments" element={<AdminInvestmentsPage />} />
						<Route
							path="investments/:id"
							element={<AdminInvestmentDetailsPage />}
						/>
						<Route path="packages" element={<AdminPackagesPage />} />
						<Route path="fund" element={<AdminFundPage />} />
						<Route path="chat" element={<AdminChatPage />} />
						<Route path="messages" element={<AdminMessagesPage />} />
						<Route path="reports" element={<AdminReportsPage />} />
						<Route path="referrals" element={<AdminReferralsPage />} />
						<Route path="settings" element={<AdminSettingsPage />} />
						<Route path="payment-config" element={<AdminPaymentConfigPage />} />
					</Route>

					{/* Catch-all route */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</Provider>
);

export default App;
