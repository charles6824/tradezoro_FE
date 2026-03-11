import React from "react";
import { Link } from "react-router-dom";

const MiningSection = () => {
	return (
		<section className="bg-background-dark text-slate-100 py-16">
			{/* Hero Section */}
			<div className="mx-auto p-4 md:p-16">
				<div className="flex flex-wrap items-center">
					<div className="w-full md:w-1/2 xl:w-7/12 mb-8 md:mb-0">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
							Start <span className="text-primary-400">Bitcoin</span> <br />
							Cloud Mining Today
						</h1>
						<p className="text-primary-300 mb-6 animate-fadeInUp">
							Easy sign-up, fast mining.
							<br />
							User-friendly, full uptime, and the best payouts.
						</p>
						<div className="mb-6 animate-fadeInUp">
							<Link
								to="/register"
								className="inline-block bg-primary text-background-dark font-semibold rounded px-8 py-3 shadow-lg transition"
							>
								Start Mining
							</Link>
						</div>
					</div>
					<div className="w-full md:w-1/2 xl:w-5/12 flex justify-center">
						<img
							className="max-w-xs animate-bounceInRight"
							src="/digitalwallet.png"
							alt="Digital Wallet"
						/>
					</div>
				</div>
			</div>

			{/* Cryptocurrency Section */}
			<div className="bg-[#f8fafc] py-10 md:px-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap -mx-4">
						{/* Bitcoin */}
						<div className="w-full md:w-1/3 px-4 mb-8">
							<div className="bg-white rounded-xl shadow p-8 text-center hover:scale-105 transition">
								<img
									src="/coin7.png"
									alt="Bitcoin Icon"
									className="mx-auto mb-4"
								/>
								<h5 className="font-bold mb-2 text-background-dark">
									Bitcoin <span className="text-primary">BTC</span>
								</h5>
								<div className="mb-4 text-red-500 font-semibold">
									Cloud Mining
								</div>
								<Link
									to="/register"
									className="inline-flex items-center justify-center bg-background-dark text-white rounded-full w-10 h-10"
								>
									{/* SVG Arrow */}
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path
											d="M4.1665 10H15.8332"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M10 4.16666L15.8333 9.99999L10 15.8333"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</Link>
							</div>
						</div>
						{/* Ethereum */}
						<div className="w-full md:w-1/3 px-4 mb-8">
							<div className="bg-white rounded-xl shadow p-8 text-center hover:scale-105 transition">
								<img
									src="/coin3.png"
									alt="Ethereum Icon"
									className="mx-auto mb-4"
								/>
								<h5 className="font-bold mb-2 text-background-dark">
									Ethereum <span className="text-primary">ETH</span>
								</h5>
								<div className="mb-4 text-red-500 font-semibold">
									Cloud Mining
								</div>
								<Link
									to="/register"
									className="inline-flex items-center justify-center bg-background-dark  text-white rounded-full w-10 h-10"
								>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path
											d="M4.1665 10H15.8332"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M10 4.16666L15.8333 9.99999L10 15.8333"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</Link>
							</div>
						</div>
						{/* Tether */}
						<div className="w-full md:w-1/3 px-4 mb-8">
							<div className="bg-white rounded-xl shadow p-8 text-center hover:scale-105 transition">
								<img
									src="/coin8.png"
									alt="Tether Icon"
									className="mx-auto mb-4"
								/>
								<h5 className="font-bold mb-2 text-background-dark">
									Tether <span className="text-primary">USDT</span>
								</h5>
								<div className="mb-4 text-green-500 font-semibold">
									$1 <span className="text-green-400">0%</span>
								</div>
								<a
									href="https://user.abcmining.pro/register"
									className="inline-flex items-center justify-center bg-background-dark text-white rounded-full w-10 h-10"
								>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path
											d="M4.1665 10H15.8332"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M10 4.16666L15.8333 9.99999L10 15.8333"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Additional Section */}
			<section className="py-16 md:px-16 bg-white text-gray-900">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
						<div className="w-full mb-8 md:mb-0">
							<div>
								<img
									src="/pic1.jpg"
									alt="Reliable Infrastructure"
									className="rounded-lg shadow-lg w-3/4 mx-auto"
								/>
								
							</div>
						</div>
						<div className="w-full">
              <div>
                <div className="mt-4 bg-background-dark text-white w-[35%] px-3 py-1 rounded-full inline-block mb-4">
									<h6 className="font-semibold">Reliable Infrastructure</h6>
								</div>
								<h3 className="text-2xl font-bold mb-4">
									Welcome to the World's Leading Mining Company:
								</h3>
								<p className="mb-6">
									We have established partnerships with top companies like
									Coinbase, Binance, and Bitmain. Join us today to begin mining
									Bitcoin easily.
								</p>
								<Link
									to="/register"
									className="inline-block bg-primary text-background-dark font-semibold rounded-xl px-6 py-2 transition"
								>
									Open an Account
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Join Us Section */}
			
		</section>
	);
};

export default MiningSection;
