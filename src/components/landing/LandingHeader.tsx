
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LanguageSelector } from '../LanguageSelector';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Settings, LayoutDashboard } from "lucide-react";

const navLinks = [
	{ label: 'Trade', href: '/login' },
	{ label: 'Platforms', href: '/login' },
	{ label: 'Learn', href: '/login' },
	{ label: 'Support', href: '/login' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'Stats', href: '/login' },
];

export const LandingHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
		<nav className="sticky top-0 z-50 border-b border-primary/10 bg-background-dark/80 backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-20 items-center">
					<div className="flex items-center gap-8">
						<div className="flex items-center gap-2 text-primary">
							<a
								className="text-xl font-black tracking-tight text-slate-100"
								href="/"
							>
								TRADEZERO
							</a>
						</div>
						{/* Desktop nav */}
						<div className="hidden lg:flex items-center gap-6">
							{navLinks.map((link) => (
								<Link
									key={link.label}
									className="text-sm font-medium hover:text-primary transition-colors"
									to={link.href}
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="hidden md:block">
							<LanguageSelector />
						</div>
						{!isAuthenticated ? (
							<>
								<button
									className="px-5 py-2.5 rounded-full text-sm font-bold border border-primary/20 hover:bg-primary/10 transition-all text-slate-100"
									onClick={() => navigate("/login")}
								>
									Login
								</button>
								<button className="hidden md:block px-5 py-2.5 rounded-full text-sm font-bold bg-primary text-background-dark hover:brightness-110 transition-all" onClick={() => navigate("/register")}>
									Sign Up
								</button>
							</>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="flex items-center space-x-2 text-slate-100 hover:text-primary transition-all p-2 rounded-full hover:bg-primary/10">
										<Avatar className="w-8 h-8">
											<AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
												{user?.firstName?.[0]}
												{user?.lastName?.[0]}
											</AvatarFallback>
										</Avatar>
										<span className="hidden md:block font-medium">
											{user?.firstName}
										</span>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-48 bg-background border-border"
								>
									<DropdownMenuItem asChild>
										<Link
											to={user?.role === "admin" ? "/admin" : "/dashboard"}
											className="flex items-center space-x-2 cursor-pointer"
										>
											<LayoutDashboard className="w-4 h-4" />
											<span>Dashboard</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											to="/dashboard/settings"
											className="flex items-center space-x-2 cursor-pointer"
										>
											<Settings className="w-4 h-4" />
											<span>Settings</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={logout}
										className="flex items-center space-x-2 text-destructive focus:text-destructive cursor-pointer"
									>
										<LogOut className="w-4 h-4" />
										<span>Logout</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
						{/* Mobile menu toggle */}
						<button
							className="lg:hidden ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-all"
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							onClick={() => setMenuOpen((v) => !v)}
							type="button"
						>
							<span className="material-symbols-outlined text-2xl">
								{menuOpen ? "close" : "menu"}
							</span>
						</button>
					</div>
				</div>
			</div>
			{/* Mobile nav overlay */}
			{menuOpen && (
				<div
					className="fixed top-0 left-0 w-screen h-screen z-[999] flex flex-col items-center justify-center gap-8 transition-all lg:hidden pt-20"
					style={{ background: "#08150d" }}
				>
					<button
						className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-all"
						aria-label="Close menu"
						onClick={() => setMenuOpen(false)}
						type="button"
					>
						<span className="material-symbols-outlined text-2xl">close</span>
					</button>
					<div className="flex flex-col items-center gap-8 mt-8">
						{/* {navLinks.map((link) => (
							<Link
								key={link.label}
								className="text-lg font-bold text-slate-100 hover:text-primary transition-colors"
								to={link.href}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						))} */}

						<div className="md:hidden">
							<LanguageSelector />
						</div>

						{!isAuthenticated ? (
							<>
								<button
									className="px-5 py-2.5 rounded-full text-sm font-bold border border-primary/20 hover:bg-primary/10 transition-all text-slate-100"
									onClick={() => navigate("/login")}
								>
									Login
								</button>
								<button className="hidden md:block px-5 py-2.5 rounded-full text-sm font-bold bg-primary text-background-dark hover:brightness-110 transition-all" onClick={() => navigate("/register")}>
									Sign Up
								</button>
							</>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="flex items-center space-x-2 text-slate-100 hover:text-primary transition-all p-2 rounded-full hover:bg-primary/10">
										<Avatar className="w-8 h-8">
											<AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
												{user?.firstName?.[0]}
												{user?.lastName?.[0]}
											</AvatarFallback>
										</Avatar>
										<span className="hidden md:block font-medium">
											{user?.firstName}
										</span>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-48 bg-background border-border"
								>
									<DropdownMenuItem asChild>
										<Link
											to={user?.role === "admin" ? "/admin" : "/dashboard"}
											className="flex items-center space-x-2 cursor-pointer"
										>
											<LayoutDashboard className="w-4 h-4" />
											<span>Dashboard</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											to="/dashboard/settings"
											className="flex items-center space-x-2 cursor-pointer"
										>
											<Settings className="w-4 h-4" />
											<span>Settings</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={logout}
										className="flex items-center space-x-2 text-destructive focus:text-destructive cursor-pointer"
									>
										<LogOut className="w-4 h-4" />
										<span>Logout</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};