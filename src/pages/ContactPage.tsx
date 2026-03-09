import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import {
	Mail,
	Phone,
	MapPin,
	Clock,
	MessageSquare,
	Send,
	Globe,
	Shield,
} from "lucide-react";

// moved inside component to allow translation with `t`

export const ContactPage = () => {
	const { t } = useTranslation();
	const { toast } = useToast();
	const contactMethods = [
		{
			icon: Mail,
			title: t("emailSupport"),
			description: t("emailSupportDesc"),
			contact: "support@TradeZerotrading.com",
			available: "24/7",
		},
		// {
		// 	icon: Phone,
		// 	title: t("phoneSupport"),
		// 	description: t("phoneSupportDesc"),
		// 	contact: "+1 (555) 123-4567",
		// 	available: t("mondayFriday"),
		// },
		{
			icon: MessageSquare,
			title: t("liveChat"),
			description: t("liveChatDesc"),
			contact: t("availableOnPlatform") || "Available on platform",
			available: "24/7",
		},
		{
			icon: MapPin,
			title: t("officeLocation"),
			description: t("officeLocationDesc"),
			contact: "Baunscheidtstraße 17, 53113 Bonn, Germany",
			available: t("byAppointment") || "By appointment",
		},
	];

	const faqs = [
		{ question: t("faq_q1_question"), answer: t("faq_q1_answer") },
		{ question: t("faq_q2_question"), answer: t("faq_q2_answer") },
		{ question: t("faq_q3_question"), answer: t("faq_q3_answer") },
		{ question: t("faq_q4_question"), answer: t("faq_q4_answer") },
	];
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Simulate form submission
		toast({
			title: "Message Sent Successfully!",
			description: "We'll get back to you within 24 hours.",
		});

		// Reset form
		setFormData({
			name: "",
			email: "",
			subject: "",
			message: "",
		});
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="min-h-screen pt-32 pb-20">
			<div className="container mx-auto px-4">
				{/* Hero Section */}
				<div className="text-center max-w-4xl mx-auto mb-20">
					<Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
						<Shield className="w-4 h-4 mr-2" />
						24/7 Professional Support
					</Badge>

					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						{t("contactTitle")}
					</h1>

					<p className="text-xl text-muted-foreground leading-relaxed">
						{t("getInTouchDesc")}
					</p>
				</div>

				{/* Contact Methods */}
				<section className="mb-20">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{contactMethods.map((method, index) => (
							<Card key={index} className="crypto-card text-center p-6">
								<CardHeader>
									<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
										<method.icon className="w-8 h-8 text-primary-foreground" />
									</div>
									<CardTitle className="text-lg">{method.title}</CardTitle>
									<CardDescription className="text-sm">
										{method.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<p className="font-medium text-foreground">
										{method.contact}
									</p>
									<div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
										<Clock className="w-3 h-3" />
										<span>{method.available}</span>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<section>
						<Card className="crypto-card">
							<CardHeader>
								<CardTitle className="text-2xl flex items-center space-x-2">
									<Send className="w-6 h-6 text-primary" />
									<span>{t("contactForm")}</span>
								</CardTitle>
								<CardDescription>
									Fill out the form below and we'll get back to you as soon as
									possible.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="name">{t("fullName")}</Label>
											<Input
												id="name"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												placeholder="John Doe"
												required
											/>
										</div>
										<div>
											<Label htmlFor="email">{t("emailAddress")}</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleInputChange}
												placeholder="john@example.com"
												required
											/>
										</div>
									</div>

									<div>
										<Label htmlFor="subject">{t("subject")}</Label>
										<Input
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleInputChange}
											placeholder="How can we help you?"
											required
										/>
									</div>

									<div>
										<Label htmlFor="message">{t("message")}</Label>
										<Textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											placeholder="Tell us more about your inquiry..."
											rows={6}
											required
										/>
									</div>

									<Button
										type="submit"
										className="w-full gradient-primary hover-glow"
										size="lg"
									>
										<Send className="w-4 h-4 mr-2" />
										{t("sendMessage")}
									</Button>
								</form>
							</CardContent>
						</Card>
					</section>

					{/* FAQ Section */}
					<section>
						<Card className="crypto-card">
							<CardHeader>
								<CardTitle className="text-2xl flex items-center space-x-2">
									<MessageSquare className="w-6 h-6 text-primary" />
									<span>{t("faqTitle")}</span>
								</CardTitle>
								<CardDescription>{t("faqSubtitle")}</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{faqs.map((faq, index) => (
									<div
										key={index}
										className="border-b border-border pb-4 last:border-b-0"
									>
										<h3 className="font-semibold text-foreground mb-2">
											{faq.question}
										</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">
											{faq.answer}
										</p>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Additional Info */}
						<Card className="crypto-card mt-6">
							<CardHeader>
								<CardTitle className="text-xl flex items-center space-x-2">
									<Globe className="w-5 h-5 text-primary" />
									<span>Global Presence</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4 text-sm">
									<div>
										<strong className="text-foreground">Headquarters:</strong>
										<p className="text-muted-foreground">
											Baunscheidtstraße 17, 53113 Bonn, Germany
										</p>
									</div>
									<div>
										<strong className="text-foreground">
											Regional Offices:
										</strong>
										<p className="text-muted-foreground">
											London, Singapore, Tokyo, Sydney
										</p>
									</div>
									<div>
										<strong className="text-foreground">
											Licenses & Compliance:
										</strong>
										<p className="text-muted-foreground">
											SEC, FCA, MAS regulated
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>
				</div>
			</div>
		</div>
	);
};
