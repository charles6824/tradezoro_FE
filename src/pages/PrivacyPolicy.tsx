import React from "react";
import { Shield, Lock, Eye, FileText, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
				<div className="container mx-auto px-4 text-center">
					<div className="flex justify-center mb-6">
						<div className="p-4 bg-primary/10 rounded-full">
							<Shield className="w-12 h-12 text-primary" />
						</div>
					</div>
					<h1 className="text-5xl font-bold text-foreground mb-6">
						Privacy Policy
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Your privacy and data security are our top priorities. Learn how we
						protect, collect, and use your information to provide exceptional
						investment services.
					</p>
					<div className="mt-8 text-sm text-muted-foreground">
						Last updated:{" "}
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
									<h3 className="font-semibold mb-4">Quick Navigation</h3>
									<nav className="space-y-2">
										<a
											href="#collection"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Information Collection
										</a>
										<a
											href="#usage"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											How We Use Data
										</a>
										<a
											href="#sharing"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Information Sharing
										</a>
										<a
											href="#security"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Data Security
										</a>
										<a
											href="#rights"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Your Rights
										</a>
										<a
											href="#cookies"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Cookies Policy
										</a>
										<a
											href="#contact"
											className="block text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											Contact Us
										</a>
									</nav>
								</CardContent>
							</Card>
						</div>

						{/* Main Content */}
						<div className="lg:col-span-3 space-y-12">
							{/* Information Collection */}
							<section id="collection">
								<div className="flex items-center gap-3 mb-6">
									<Eye className="w-6 h-6 text-primary" />
									<h2 className="text-3xl font-bold text-foreground">
										Information We Collect
									</h2>
								</div>
								<div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
									<p>
										We collect information to provide you with secure and
										personalized investment services. This includes:
									</p>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
										<Card>
											<CardContent className="p-6">
												<h4 className="font-semibold text-foreground mb-3">
													Personal Information
												</h4>
												<ul className="space-y-2 text-sm">
													<li>• Full name and contact details</li>
													<li>• Email address and phone number</li>
													<li>• Date of birth and nationality</li>
													<li>• Government-issued ID documents</li>
												</ul>
											</CardContent>
										</Card>
										<Card>
											<CardContent className="p-6">
												<h4 className="font-semibold text-foreground mb-3">
													Financial Information
												</h4>
												<ul className="space-y-2 text-sm">
													<li>• Investment amounts and preferences</li>
													<li>• Transaction history and patterns</li>
													<li>• Bank account and payment details</li>
													<li>• Risk tolerance assessments</li>
												</ul>
											</CardContent>
										</Card>
									</div>
								</div>
							</section>

							{/* Usage */}
							<section id="usage">
								<div className="flex items-center gap-3 mb-6">
									<FileText className="w-6 h-6 text-primary" />
									<h2 className="text-3xl font-bold text-foreground">
										How We Use Your Information
									</h2>
								</div>
								<div className="space-y-6">
									<p className="text-muted-foreground">
										Your information enables us to deliver exceptional
										investment services:
									</p>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
										<Card>
											<CardContent className="p-6 text-center">
												<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
													<Users className="w-6 h-6 text-primary" />
												</div>
												<h4 className="font-semibold mb-2">
													Account Management
												</h4>
												<p className="text-sm text-muted-foreground">
													Create and maintain your investment account with
													personalized services
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardContent className="p-6 text-center">
												<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
													<Lock className="w-6 h-6 text-primary" />
												</div>
												<h4 className="font-semibold mb-2">
													Security & Compliance
												</h4>
												<p className="text-sm text-muted-foreground">
													Verify identity and comply with financial regulations
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardContent className="p-6 text-center">
												<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
													<Globe className="w-6 h-6 text-primary" />
												</div>
												<h4 className="font-semibold mb-2">
													Service Improvement
												</h4>
												<p className="text-sm text-muted-foreground">
													Enhance platform features and user experience
												</p>
											</CardContent>
										</Card>
									</div>
								</div>
							</section>

							{/* Additional sections with similar styling... */}
							<section id="security">
								<div className="flex items-center gap-3 mb-6">
									<Shield className="w-6 h-6 text-primary" />
									<h2 className="text-3xl font-bold text-foreground">
										Data Security Measures
									</h2>
								</div>
								<Card>
									<CardContent className="p-8">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
											<div>
												<h4 className="font-semibold text-foreground mb-4">
													Technical Safeguards
												</h4>
												<ul className="space-y-2 text-muted-foreground">
													<li>
														• 256-bit SSL encryption for all data transmission
													</li>
													<li>• Multi-factor authentication requirements</li>
													<li>
														• Regular security audits and penetration testing
													</li>
													<li>• Secure data centers with 24/7 monitoring</li>
												</ul>
											</div>
											<div>
												<h4 className="font-semibold text-foreground mb-4">
													Operational Security
												</h4>
												<ul className="space-y-2 text-muted-foreground">
													<li>• Employee background checks and training</li>
													<li>• Access controls and audit trails</li>
													<li>• Incident response and recovery procedures</li>
													<li>
														• Compliance with European data protection laws
													</li>
												</ul>
											</div>
										</div>
									</CardContent>
								</Card>
							</section>

							{/* Contact Section */}
							<section
								id="contact"
								className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8"
							>
								<h2 className="text-2xl font-bold text-foreground mb-4">
									Questions About Privacy?
								</h2>
								<p className="text-muted-foreground mb-6">
									Our privacy team is here to help with any questions or
									concerns about your data protection.
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-semibold mb-2">Privacy Officer</h4>
										<p className="text-sm text-muted-foreground">
											privacy@TradeZerotrading.com
										</p>
									</div>
									<div>
										<h4 className="font-semibold mb-2">European Office</h4>
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

export default PrivacyPolicy;
