
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const navLinks = [
	{ label: 'Trade', href: '/login' },
	{ label: 'Platforms', href: '/login' },
	{ label: 'Learn', href: '/login' },
	{ label: 'Support', href: '/login' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'Stats', href: '/login' },
];

export const LandingHeader = () => {
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
						<button
							className="px-5 py-2.5 rounded-full text-sm font-bold border border-primary/20 hover:bg-primary/10 transition-all"
							onClick={() => navigate("/login")}
						>
							Login
						</button>
						<button className="hidden md:block px-5 py-2.5 rounded-full text-sm font-bold bg-primary text-background-dark hover:brightness-110 transition-all" onClick={() => navigate("/register")}>
							Sign Up
						</button>
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
						{navLinks.map((link) => (
							<Link
								key={link.label}
								className="text-lg font-bold text-slate-100 hover:text-primary transition-colors"
								to={link.href}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}

						<button className="w-full px-8 py-3 rounded-full text-base font-bold border border-primary/20 hover:bg-primary/10 transition-all mt-2" onClick={ () => navigate("/login")}>
							Login
						</button>
						<button className="w-full px-8 py-3 rounded-full font-bold bg-primary text-background-dark hover:brightness-110 transition-all" onClick={ () => navigate("/register")}>
							Sign Up
						</button>
					</div>
				</div>
			)}
		</nav>
	);
};