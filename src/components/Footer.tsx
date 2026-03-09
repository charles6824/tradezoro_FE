import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wallet, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className="bg-card border-t border-border mt-20">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
								<Wallet className="w-5 h-5 text-primary-foreground" />
							</div>
							<span className="text-xl font-bold text-gradient-primary">
								TradeZeroTrading
							</span>
						</div>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Your trusted partner in diversified investments. We provide
							secure, profitable, and transparent investment opportunities in
							Real Estate, Oil & Gas, Agriculture, and Crypto Mining.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://wa.me/1234567890"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-green-500 transition-smooth"
							>
								<MessageCircle className="w-5 h-5" />
							</a>
							<a
								href="https://t.me/TradeZerotrading"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-blue-500 transition-smooth"
							>
								<svg
									className="w-5 h-5"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.377 2.618-1.415 3.051-2.896 1.899l-2.837-2.135-1.415 1.36c-.896.896-1.415 1.415-2.896.896l.896-2.837L18.314 7.264c.377-.377-.377-.896-.896-.519L8.537 11.196l-2.618-.896c-.896-.377-.896-1.415.377-1.792L18.314 6.368c.896-.377 1.792.377 1.254 1.792z" />
								</svg>
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-foreground">
							{t("quickLinks")}
						</h3>
						<div className="space-y-2">
							<Link
								to="/"
								className="block text-muted-foreground hover:text-primary transition-smooth text-sm"
							>
								{t("home")}
							</Link>
							<Link
								to="/packages"
								className="block text-muted-foreground hover:text-primary transition-smooth text-sm"
							>
								{t("packages")}
							</Link>
							<Link
								to="/about"
								className="block text-muted-foreground hover:text-primary transition-smooth text-sm"
							>
								{t("about")}
							</Link>
							<Link
								to="/contact"
								className="block text-muted-foreground hover:text-primary transition-smooth text-sm"
							>
								{t("contact")}
							</Link>
							<Link
								to="/login"
								className="block text-muted-foreground hover:text-primary transition-smooth text-sm"
							>
								{t("login")}
							</Link>
							<Link
								to="/register"
								className="block text-muted-foreground hover:text-primary transition-smooth text-sm"
							>
								{t("register")}
							</Link>
						</div>
					</div>

					{/* Services */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-foreground">
							{t("investmentCategories")}
						</h3>
						<div className="space-y-2">
							<div className="text-muted-foreground text-sm">
								{t("realEstate")}
							</div>
							<div className="text-muted-foreground text-sm">{t("oilGas")}</div>
							<div className="text-muted-foreground text-sm">
								{t("agriculture")}
							</div>
							<div className="text-muted-foreground text-sm">
								{t("cryptoMining")}
							</div>
							<div className="text-muted-foreground text-sm">
								Portfolio Management
							</div>
							<div className="text-muted-foreground text-sm">24/7 Support</div>
						</div>
					</div>

					{/* Contact Info */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-foreground">
							Contact Info
						</h3>
						<div className="space-y-3">
							<div className="flex items-center space-x-3 text-sm">
								<Mail className="w-4 h-4 text-primary" />
								<span className="text-muted-foreground">
									support@TradeZerotrading.com
								</span>
							</div>
							{/* <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div> */}
							<div className="flex items-center space-x-3 text-sm">
								<MapPin className="w-4 h-4 text-primary" />
								<span className="text-muted-foreground">
									Baunscheidtstraße 17, 53113 Bonn, Germany
								</span>
							</div>
						</div>

						{/* Security Badges */}
						<div className="pt-4">
							<div className="text-xs text-muted-foreground mb-2">
								Secured By:
							</div>
							<div className="flex space-x-2">
								<div className="px-2 py-1 bg-muted rounded text-xs font-medium">
									SSL
								</div>
								<div className="px-2 py-1 bg-muted rounded text-xs font-medium">
									256-BIT
								</div>
								<div className="px-2 py-1 bg-muted rounded text-xs font-medium">
									ENCRYPTED
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="mt-12 pt-8 border-t border-border">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="text-sm text-muted-foreground">
							© 2024 TradeZeroTrading. {t("allRightsReserved")}
						</div>
						<div className="flex space-x-6 text-sm">
							<Link
								to="/privacy"
								className="text-muted-foreground hover:text-primary transition-smooth"
							>
								{t("privacyPolicy")}
							</Link>
							<Link
								to="/terms"
								className="text-muted-foreground hover:text-primary transition-smooth"
							>
								{t("termsOfService")}
							</Link>
							<Link
								to="/risk-disclaimer"
								className="text-muted-foreground hover:text-primary transition-smooth"
							>
								{t("riskDisclaimer")}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
