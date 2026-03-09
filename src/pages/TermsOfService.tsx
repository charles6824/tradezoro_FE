import React from "react";
import {
	FileText,
	Scale,
	Users,
	Shield,
	AlertCircle,
	CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-20 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
				<div className="container mx-auto px-4 text-center">
					<div className="flex justify-center mb-6">
						<div className="p-4 bg-secondary/10 rounded-full">
							<Scale className="w-12 h-12 text-secondary" />
						</div>
					</div>
					<h1 className="text-5xl font-bold text-foreground mb-6">
						Terms of Service
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Clear, transparent terms governing your use of TradeZeroTrading
						platform. Understanding your rights and responsibilities as an
						investor.
					</p>
					<div className="mt-8 text-sm text-muted-foreground">
						Effective from:{" "}
						{new Date().toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-16">
				<div className="container mx-auto px-4 max-w-6xl">
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
						{/* Sidebar */}
						<div className="lg:col-span-1">
							<Card className="sticky top-8">
								<CardContent className="p-6">
									<h3 className="font-semibold mb-4">Agreement Sections</h3>
									<nav className="space-y-2">
										<a
											href="#acceptance"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Acceptance of Terms
										</a>
										<a
											href="#services"
											className="block text-sm text-muted-foTradeZerohover:text-primary transition-colors"
										>
											Investment Services
										</a>
										<a
											href="#responsibilities"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											User Responsibilities
										</a>
										<a
											href="#investment-terms"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Investment Terms
										</a>
										<a
											href="#fees"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Fees & Charges
										</a>
										<a
											href="#liability"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Limitation of Liability
										</a>
										<a
											href="#termination"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Account Termination
										</a>
									</nav>
								</CardContent>
							</Card>
						</div>

						{/* Main Content */}
						<div className="lg:col-span-3 space-y-12">
							{/* Acceptance */}
							<section id="acceptance">
								<div className="flex items-center gap-3 mb-6">
									<CheckCircle className="w-6 h-6 text-green-500" />
									<h2 className="text-3xl font-bold text-foreground">
										Acceptance of Terms
									</h2>
								</div>
								<Card>
									<CardContent className="p-8">
										<p className="text-muted-foreground mb-4">
											By accessing and using the TradeZeroTrading platform, you
											acknowledge that you have read, understood, and agree to
											be bound by these Terms of Service and all applicable laws
											and regulations.
										</p>
										<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
											<p className="text-blue-800 text-sm">
												<strong>Important:</strong> If you do not agree with any
												part of these terms, you must not use our services.
											</p>
										</div>
									</CardContent>
								</Card>
							</section>

							{/* Services */}
							<section id="services">
								<div className="flex items-center gap-3 mb-6">
									<FileText className="w-6 h-6 text-primary" />
									<h2 className="text-3xl font-bold text-foreground">
										Investment Services
									</h2>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<Card>
										<CardContent className="p-6">
											<h4 className="font-semibold text-foreground mb-4">
												Core Services
											</h4>
											<ul className="space-y-2 text-sm text-muted-foreground">
												<li>• Real Estate investment opportunities</li>
												<li>• Oil & Gas sector investments</li>
												<li>• Agricultural project funding</li>
												<li>• Cryptocurrency mining operations</li>
												<li>• Portfolio management and tracking</li>
											</ul>
										</CardContent>
									</Card>
									<Card>
										<CardContent className="p-6">
											<h4 className="font-semibold text-foreground mb-4">
												Platform Features
											</h4>
											<ul className="space-y-2 text-sm text-muted-foreground">
												<li>• Real-time investment analytics</li>
												<li>• Secure transaction processing</li>
												<li>• 24/7 customer support</li>
												<li>• Multi-language platform access</li>
												<li>• Mobile-responsive interface</li>
											</ul>
										</CardContent>
									</Card>
								</div>
							</section>

							{/* Investment Terms */}
							<section id="investment-terms">
								<div className="flex items-center gap-3 mb-6">
									<Shield className="w-6 h-6 text-primary" />
									<h2 className="text-3xl font-bold text-foreground">
										Investment Terms & Conditions
									</h2>
								</div>
								<Card>
									<CardContent className="p-8">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
											<div>
												<h4 className="font-semibold text-foreground mb-4">
													Investment Packages
												</h4>
												<div className="space-y-3">
													<div className="flex justify-between items-center p-3 bg-mTradeZeroounded">
														<span className="text-sm font-medium">
															Starter Package
														</span>
														<span className="text-sm text-muted-foreground">
															$100 - $1,999
														</span>
													</div>
													<div className="flex justify-between items-center p-3 bg-muted/50 rounded">
														<span className="text-sm font-medium">
															Professional Package
														</span>
														<span className="text-sm text-muted-foreground">
															$2,000 - $5,999
														</span>
													</div>
													<div className="flex justify-between items-center p-3 bg-muted/50 rounded">
														<span className="text-sm font-medium">
															Advance Package
														</span>
														<span className="text-sm text-muted-foreground">
															$6,000 - $9,999
														</span>
													</div>
													<div className="flex justify-between items-center p-3 bg-muted/50 rounded">
														<span className="text-sm font-medium">
															Elite Package
														</span>
														<span className="text-sm text-muted-foreground">
															$10,000 - $49,999
														</span>
													</div>
												</div>
											</div>
											<div>
												<h4 className="font-semibold text-foreground mb-4">
													Key Terms
												</h4>
												<ul className="space-y-2 text-sm text-muted-foreground">
													<li>• All investments have a fixed 5-day duration</li>
													<li>
														• Daily returns are calculated and credited
														automatically
													</li>
													<li>• Early withdrawal may incur penalty fees</li>
													<li>
														• Minimum investment amounts are strictly enforced
													</li>
													<li>• Returns are subject to market conditions</li>
													<li>
														• Reinvestment options available upon maturity
													</li>
												</ul>
											</div>
										</div>
									</CardContent>
								</Card>
							</section>

							{/* Warning Section */}
							<section className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-8">
								<div className="flex items-center gap-3 mb-4">
									<AlertCircle className="w-6 h-6 text-yellow-600" />
									<h3 className="text-xl font-bold text-yellow-800">
										Important Legal Notice
									</h3>
								</div>
								<p className="text-yellow-700 mb-4">
									Investment involves risk. Past performance does not guarantee
									future results. Please read our Risk Disclaimer carefully
									before investing.
								</p>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
									<div className="text-yellow-700">
										<strong>Regulatory Compliance:</strong> Licensed and
										regulated in European Union
									</div>
									<div className="text-yellow-700">
										<strong>Dispute Resolution:</strong> European arbitration
										procedures apply
									</div>
									<div className="text-yellow-700">
										<strong>Governing Law:</strong> German financial regulations
									</div>
								</div>
							</section>

							{/* Contact Section */}
							<section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8">
								<h2 className="text-2xl font-bold text-foreground mb-4">
									Legal Questions?
								</h2>
								<p className="text-muted-foreground mb-6">
									Our legal team is available to clarify any terms or
									conditions.
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-semibold mb-2">Legal Department</h4>
										<p className="text-sm text-muted-foreground">
											legal@minecrusttrading.com
										</p>
									</div>
									<div>
										<h4 className="font-semibold mb-2">Compliance Office</h4>
										<p className="text-sm text-muted-foreground">
											Frankfurt, Germany
										</p>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default TermsOfService;
