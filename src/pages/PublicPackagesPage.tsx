import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
	CheckCircle,
	TrendingUp,
	Shield,
	Clock,
	DollarSign,
	Users,
	ArrowRight,
	Star,
} from "lucide-react";
import { useGetPackagesQuery } from "@/store/packagesApi";

// moved into component to allow translations via `t`

export const PublicPackagesPage = () => {
	const { t } = useTranslation();
	const benefits = [
		{
			icon: Shield,
			title: t("secureInsured"),
			description: t("secureInsuredDesc"),
		},
		{
			icon: TrendingUp,
			title: t("provenReturns"),
			description: t("provenReturnsDesc"),
		},
		{
			icon: Clock,
			title: t("automatedTrading"),
			description: t("automatedTradingDesc"),
		},
		{
			icon: Users,
			title: t("expertManagement"),
			description: t("expertManagementDesc"),
		},
	];

	const features = [
		t("dailyProfitDistribution"),
		t("realtimePortfolioTracking"),
		t("instantWithdrawal"),
		t("multiCurrencySupport"),
		t("customerSupport247"),
		t("mobileAppAccess"),
		t("advancedAnalytics"),
		t("riskManagementTools"),
	];
	const {
		data: packagesData,
		isLoading,
		error,
	} = useGetPackagesQuery({ active: true });
	const packages = packagesData?.data || [];

	if (isLoading) {
		return (
			<div className="min-h-screen pt-32 pb-20">
				<div className="container mx-auto px-4">
					<div className="text-center">
						<h1 className="text-4xl font-bold mb-4">
							Loading Investment Packages...
						</h1>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen pt-32 pb-20">
				<div className="container mx-auto px-4">
					<div className="text-center">
						<h1 className="text-4xl font-bold mb-4 text-red-500">
							Failed to load packages
						</h1>
						<p>Please try again later.</p>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="min-h-screen pt-32 pb-20">
			<div className="container mx-auto px-4">
				{/* Hero Section */}
				<div className="text-center max-w-4xl mx-auto mb-20">
					<Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
						<Star className="w-4 h-4 mr-2" />
						{t("packagesTitle")}
					</Badge>

					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						{t("packagesTitle")}
					</h1>

					<p className="text-xl text-muted-foreground leading-relaxed">
						{t("packagesSubtitle")}
					</p>
				</div>

				{/* Benefits Section */}
				<section className="mb-20">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{benefits.map((benefit, index) => (
							<Card key={index} className="crypto-card text-center p-6">
								<CardHeader>
									<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
										<benefit.icon className="w-8 h-8 text-primary-foreground" />
									</div>
									<CardTitle className="text-lg">{benefit.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-muted-foreground text-sm">
										{benefit.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				{/* Packages Section */}
				<section className="mb-20">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-6">{t("packages")}</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							{t("packagesSubtitle")}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{packages.map((pkg, index) => (
							<Card
								key={pkg.id}
								className={`crypto-card relative overflow-hidden ${
									index === 1
										? "ring-2 ring-primary glow-primary scale-105"
										: ""
								}`}
							>
								{index === 1 && (
									<div className="absolute top-0 left-0 right-0 bg-gradient-primary text-primary-foreground text-center py-2 text-sm font-medium">
										🔥 MOST POPULAR
									</div>
								)}

								<CardHeader
									className={`text-center ${index === 1 ? "pt-8" : "pt-6"}`}
								>
									<div className="mb-4">
										<div className="text-4xl font-bold text-primary mb-2">
											{pkg.roi}%
										</div>
										<div className="text-muted-foreground">
											{t("roi")} in {pkg.duration} {t("days")}
										</div>
									</div>
									<CardTitle className="text-2xl">{pkg.name}</CardTitle>
									<CardDescription className="text-muted-foreground">
										{pkg.description}
									</CardDescription>
								</CardHeader>

								<CardContent className="space-y-6">
									<div className="space-y-3 text-sm">
										<div className="flex justify-between items-center">
											<span className="text-muted-foreground">
												{t("minimumInvestment")}:
											</span>
											<span className="font-medium text-foreground">
												${pkg.minAmount.toLocaleString()}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-muted-foreground">
												{t("maximumInvestment")}:
											</span>
											<span className="font-medium text-foreground">
												${pkg.maxAmount.toLocaleString()}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-muted-foreground">
												{t("duration")}:
											</span>
											<span className="font-medium text-foreground">
												{pkg.duration} {t("days")}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-muted-foreground">
												{t("dailyReturns")}:
											</span>
											<span className="font-medium text-green-500">
												~{(pkg.roi / pkg.duration).toFixed(2)}%
											</span>
										</div>
									</div>

									<div className="border-t border-border pt-4">
										<div className="space-y-2">
											<div className="flex items-center space-x-2 text-sm">
												<CheckCircle className="w-4 h-4 text-green-500" />
												<span>{t("dailyReturns")}</span>
											</div>
											<div className="flex items-center space-x-2 text-sm">
												<CheckCircle className="w-4 h-4 text-green-500" />
												<span>{t("instantWithdrawal")}</span>
											</div>
											<div className="flex items-center space-x-2 text-sm">
												<CheckCircle className="w-4 h-4 text-green-500" />
												<span>{t("support")}</span>
											</div>
											{index >= 1 && (
												<div className="flex items-center space-x-2 text-sm">
													<CheckCircle className="w-4 h-4 text-green-500" />
													<span>Priority support</span>
												</div>
											)}
											{index === 2 && (
												<div className="flex items-center space-x-2 text-sm">
													<CheckCircle className="w-4 h-4 text-green-500" />
													<span>Dedicated account manager</span>
												</div>
											)}
										</div>
									</div>

									<Link to="/register" className="block">
										<Button
											className={`w-full ${
												index === 1 ? "gradient-primary hover-glow" : ""
											}`}
											variant={index === 1 ? "default" : "outline"}
											size="lg"
										>
											{t("getStarted")}
											<ArrowRight className="ml-2 w-4 h-4" />
										</Button>
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				{/* Features Grid */}
				<section>
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-6">
							{t("platformFeaturesTitle")}
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							{t("platformFeaturesSubtitle")}
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
						{features.map((feature, index) => (
							<div key={index} className="crypto-card p-4 text-center">
								<CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
								<span className="text-sm text-foreground">{feature}</span>
							</div>
						))}
					</div>

					{/* CTA Section */}
					<div className="text-center mt-16">
						<Card className="crypto-card p-8 max-w-2xl mx-auto">
							<CardHeader>
								<CardTitle className="text-2xl">{t("readyToStart")}</CardTitle>
								<CardDescription className="text-lg">
									{t("joinToday")}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-center space-x-4">
									<Link to="/register">
										<Button size="lg" className="gradient-primary hover-glow">
											<DollarSign className="w-4 h-4 mr-2" />
											{t("startInvesting")}
										</Button>
									</Link>
									<Link to="/contact">
										<Button size="lg" variant="outline">
											{t("contact")} Expert
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>
			</div>
		</div>
	);
};
