import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { LanguageSelector } from "./LanguageSelector";
import { LogOut, Settings, LayoutDashboard, Wallet } from "lucide-react";
import { mockCryptoPrices } from "@/utils/mockData";

export const Header = () => {
	const { user, isAuthenticated, logout } = useAuth();
	const { t } = useTranslation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
			{/* Crypto Ticker */}
			<div className="bg-card border-b border-border py-2 overflow-hidden">
				<div className="ticker flex gap-8 whitespace-nowrap">
					{mockCryptoPrices.map((crypto) => (
						<div
							key={crypto.symbol}
							className="flex items-center gap-2 text-sm"
						>
							<span className="text-foreground font-medium">
								{crypto.symbol}
							</span>
							<span className="text-foreground">
								${crypto.price.toLocaleString()}
							</span>
							<span
								className={
									crypto.change >= 0 ? "text-crypto-green" : "text-crypto-red"
								}
							>
								{crypto.change >= 0 ? "+" : ""}
								{crypto.changePercent.toFixed(2)}%
							</span>
							<div
								className={`w-1 h-1 rounded-full pulse-dot ${
									crypto.change >= 0 ? "bg-crypto-green" : "bg-crypto-red"
								}`}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Mobile language selector */}
			<div className="md:hidden w-full bg-card/5 border-b border-border py-2">
				<div className="container mx-auto px-4 flex items-center justify-center">
					<LanguageSelector />
				</div>
			</div>

			{/* Main Header */}
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-2">
						<div className="flex items-center gap-2 text-primary">
							<span className="text-xl font-black tracking-tight text-foreground">
								TRADEZERO
							</span>
						</div>
					</Link>

					{/* Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link
							to="/"
							className="text-foreground hover:text-primary transition-smooth"
						>
							{t("home")}
						</Link>
						<Link
							to="/packages"
							className="text-foreground hover:text-primary transition-smooth"
						>
							{t("packages")}
						</Link>
						<Link
							to="/about"
							className="text-foreground hover:text-primary transition-smooth"
						>
							{t("about")}
						</Link>
						<Link
							to="/contact"
							className="text-foreground hover:text-primary transition-smooth"
						>
							{t("contact")}
						</Link>
					</nav>

					{/* Auth Section */}
					<div className="flex items-center space-x-4">
						<div className="hidden md:inline-flex">
							<LanguageSelector />
						</div>

						{!isAuthenticated ? (
							<>
								<div className="hidden md:flex items-center space-x-4">
									<Link to="/login">
										<Button
											variant="ghost"
											className="text-foreground hover:text-primary"
										>
											{t("login")}
										</Button>
									</Link>
									<Link to="/register">
										<Button className="gradient-primary hover-glow text-primary-foreground">
											{t("register")}
										</Button>
									</Link>
								</div>
							</>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="flex items-center space-x-2 text-foreground"
									>
										<Avatar className="w-8 h-8">
											<AvatarFallback className="bg-primary text-primary-foreground text-sm">
												{user?.firstName?.[0]}
												{user?.lastName?.[0]}
											</AvatarFallback>
										</Avatar>
										<span className="hidden md:block">
											{user?.firstName} {user?.lastName}
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-48 bg-card border-border"
								>
									<DropdownMenuItem asChild>
										<Link
											to={user?.role === "admin" ? "/admin" : "/dashboard"}
											className="flex items-center space-x-2"
										>
											<LayoutDashboard className="w-4 h-4" />
											<span>{t("dashboard")}</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											to="/dashboard/settings"
											className="flex items-center space-x-2"
										>
											<Settings className="w-4 h-4" />
											<span>{t("settings")}</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={logout}
										className="flex items-center space-x-2 text-destructive focus:text-destructive"
									>
										<LogOut className="w-4 h-4" />
										<span>{t("logout")}</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						{/* Mobile Menu Button */}
						<button
							className="md:hidden text-foreground"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden mt-4 py-4 border-t border-border">
						<nav className="flex flex-col space-y-4">
							<Link
								to="/"
								className="text-foreground hover:text-primary transition-smooth"
							>
								{t("home")}
							</Link>
							<Link
								to="/packages"
								className="text-foreground hover:text-primary transition-smooth"
							>
								{t("packages")}
							</Link>
							<Link
								to="/about"
								className="text-foreground hover:text-primary transition-smooth"
							>
								{t("about")}
							</Link>
							<Link
								to="/contact"
								className="text-foreground hover:text-primary transition-smooth"
							>
								{t("contact")}
							</Link>
							{!isAuthenticated ? (
								<div className="flex flex-col space-y-2 pt-4 border-t border-border">
									<Link to="/login" onClick={() => setIsMenuOpen(false)}>
										<Button
											variant="ghost"
											className="w-full justify-start text-foreground hover:text-primary"
										>
											{t("login")}
										</Button>
									</Link>
									<Link to="/register" onClick={() => setIsMenuOpen(false)}>
										<Button className="w-full gradient-primary hover-glow text-primary-foreground">
											{t("register")}
										</Button>
									</Link>
								</div>
							) : (
								<div className="flex flex-col space-y-2 pt-4 border-t border-border">
									<Link to={user?.role === "admin" ? "/admin" : "/dashboard"} onClick={() => setIsMenuOpen(false)}>
										<Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary space-x-2">
											<LayoutDashboard className="w-4 h-4 mr-2" />
											{t("dashboard")}
										</Button>
									</Link>
									<Link to="/dashboard/settings" onClick={() => setIsMenuOpen(false)}>
										<Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary space-x-2">
											<Settings className="w-4 h-4 mr-2" />
											{t("settings")}
										</Button>
									</Link>
									<Button 
										variant="ghost" 
										className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 space-x-2"
										onClick={() => {
											logout();
											setIsMenuOpen(false);
										}}
									>
										<LogOut className="w-4 h-4 mr-2" />
										{t("logout")}
									</Button>
								</div>
							)}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
};
