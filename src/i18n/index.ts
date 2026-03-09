import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
	en: {
		translation: {
			// Navigation
			home: "Home",
			packages: "Packages",
			about: "About",
			contact: "Contact",
			login: "Login",
			register: "Register",
			dashboard: "Dashboard",
			settings: "Settings",
			logout: "Logout",

			// Common
			language: "Language",
			welcome: "Welcome",
			balance: "Balance",
			deposit: "Deposit",
			withdraw: "Withdraw",
			transfer: "Transfer",
			investments: "Investments",

			// Hero section
			heroTitle: "Professional Investment Platform",
			heroSubtitle:
				"Join thousands of investors earning passive income through secure investments in Real Estate, Oil & Gas, Agriculture, and Crypto Mining. Start with $100, earn up to 40% ROI.",
			getStarted: "Get Started",
			learnMore: "Learn More",

			// Features section
			whyChooseUs: "Why Choose TradeZeroTrading?",
			secureInvestments: "Secure Investments",
			secureInvestmentsDesc:
				"Bank-grade security with SSL encryption and multi-factor authentication to protect your investments.",
			highReturns: "High Returns",
			highReturnsDesc:
				"Earn up to 40% ROI with our diversified investment portfolio across multiple sectors.",
			expertSupport: "24/7 Expert Support",
			expertSupportDesc:
				"Get professional guidance from our investment experts whenever you need it.",

			// Investment categories
			investmentCategories: "Investment Categories",
			realEstate: "Real Estate",
			realEstateDesc:
				"Invest in premium real estate properties with guaranteed returns and capital appreciation.",
			oilGas: "Oil & Gas",
			oilGasDesc:
				"Participate in energy sector investments with stable returns and growth potential.",
			agriculture: "Agriculture",
			agricultureDesc:
				"Support sustainable farming projects while earning consistent passive income.",
			cryptoMining: "Crypto Mining",
			cryptoMiningDesc:
				"Join our mining operations and benefit from cryptocurrency market growth.",

			// Stats
			totalInvestors: "Total Investors",
			totalInvested: "Total Invested",
			averageReturns: "Average Returns",
			successRate: "Success Rate",

			// CTA
			readyToStart: "Ready to Start Investing?",
			joinToday: "Join thousands of successful investors today",
			startInvesting: "Start Investing Now",

			// Footer
			quickLinks: "Quick Links",
			legalInfo: "Legal Information",
			privacyPolicy: "Privacy Policy",
			termsOfService: "Terms of Service",
			riskDisclaimer: "Risk Disclaimer",
			followUs: "Follow Us",
			allRightsReserved: "All rights reserved.",

			// Common buttons/actions
			viewAll: "View All",
			readMore: "Read More",
			apply: "Apply",
			cancel: "Cancel",
			save: "Save",
			edit: "Edit",
			delete: "Delete",
			confirm: "Confirm",
			back: "Back",
			next: "Next",
			previous: "Previous",
			loading: "Loading...",
			error: "Error",
			success: "Success",

			// About Page
			aboutTitle: "About TradeZeroTrading",
			aboutSubtitle:
				"Leading the future of diversified investment opportunities",
			ourMission: "Our Mission",
			ourMissionDesc:
				"To democratize access to premium investment opportunities across Real Estate, Energy, Agriculture, and Technology sectors while ensuring maximum security and transparency for our investors.",
			ourVision: "Our Vision",
			ourVisionDesc:
				"To become the world's most trusted investment platform, empowering individuals to build wealth through innovative and sustainable investment strategies.",
			ourValues: "Our Values",
			transparency: "Transparency",
			transparencyDesc:
				"Complete openness in all our operations and investment processes.",
			security: "Security",
			securityDesc:
				"Bank-grade security measures to protect your investments and personal data.",
			innovation: "Innovation",
			innovationDesc:
				"Cutting-edge technology and investment strategies for optimal returns.",
			sustainability: "Sustainability",
			sustainabilityDesc:
				"Environmentally responsible investments for a better future.",
			companyStats: "Company Statistics",
			foundedIn: "Founded in 2019",
			globalPresence: "Global Presence in 25+ Countries",
			teamMembers: "150+ Expert Team Members",
			regulatoryCompliance: "EU Regulatory Compliance",

			// Contact Page
			contactTitle: "Contact Us",
			contactSubtitle: "Get in touch with our investment experts",
			getInTouch: "Get In Touch",
			getInTouchDesc:
				"Have questions about our investment opportunities? Our expert team is here to help you make informed decisions.",
			contactInfo: "Contact Information",
			address: "Address",
			phone: "Phone",
			email: "Email",
			businessHours: "Business Hours",
			mondayFriday: "Monday - Friday: 9:00 AM - 6:00 PM CET",
			weekend: "Weekend: 10:00 AM - 4:00 PM CET",
			contactForm: "Send us a Message",
			firstName: "First Name",
			lastName: "Last Name",
			subject: "Subject",
			message: "Message",
			sendMessage: "Send Message",

			// Testimonials
			testimonialTitle: "What Our Investors Say",
			testimonialSubtitle:
				"Real stories from real investors who have achieved financial success through our platform",
			clientTestimonial1:
				"TradeZeroTrading has transformed my investment portfolio. The returns are consistent and the platform is incredibly user-friendly. I've been investing for 2 years and couldn't be happier.",
			clientTestimonial2:
				"The diversified investment options and professional support make this platform stand out. I've seen steady growth in my investments across all sectors.",
			clientTestimonial3:
				"Excellent customer service and transparent processes. The real estate investments have performed exceptionally well, exceeding my expectations.",

			// Form validation
			required: "This field is required",
			invalidEmail: "Please enter a valid email address",
			messageSent: "Message sent successfully!",
			messageError: "Failed to send message. Please try again.",

			// Packages Page
			packagesTitle: "Investment Packages",
			packagesSubtitle:
				"Choose the perfect investment plan that matches your financial goals and risk appetite",
			choosePackage: "Choose Your Package",
			packageFeatures: "Package Features",
			minimumInvestment: "Minimum Investment",
			maximumInvestment: "Maximum Investment",
			duration: "Duration",
			roi: "ROI",
			dailyReturns: "Daily Returns",
			totalReturn: "Total Return",
			instantWithdrawal: "Instant Withdrawal",
			support: "24/7 Support",
			securePayment: "Secure Payment",
			riskLevel: "Risk Level",
			low: "Low",
			medium: "Medium",
			high: "High",
			days: "days",
			selectPlan: "Select Plan",
			mostPopular: "Most Popular",
			recommended: "Recommended",

			// Package Names
			starterPlan: "Starter Plan",
			starterDesc:
				"Perfect for beginners looking to start their investment journey",
			basicPlan: "Basic Plan",
			basicDesc:
				"Ideal for investors seeking steady returns with moderate risk",
			premiumPlan: "Premium Plan",
			premiumDesc:
				"Advanced package for experienced investors seeking higher returns",
			professionalPlan: "Professional Plan",
			professionalDesc:
				"Elite package for serious investors with substantial capital",
			vipPlan: "VIP Plan",
			vipDesc: "Exclusive package with maximum returns and premium benefits",

			// Dashboard Pages
			dashboardTitle: "Dashboard",
			welcomeBack: "Welcome back",
			totalBalance: "Total Balance",
			availableBalance: "Available Balance",
			totalEarnings: "Total Earnings",
			activeInvestments: "Active Investments",
			pendingWithdrawals: "Pending Withdrawals",
			recentTransactions: "Recent Transactions",
			quickActions: "Quick Actions",
			viewAllTransactions: "View All Transactions",

			// Deposit Page
			depositTitle: "Make a Deposit",
			depositSubtitle: "Add funds to your account to start investing",
			selectPaymentMethod: "Select Payment Method",
			depositAmount: "Deposit Amount",
			minimumDeposit: "Minimum Deposit",
			processingFee: "Processing Fee",
			totalAmount: "Total Amount",
			proceedToPayment: "Proceed to Payment",
			depositHistory: "Deposit History",

			// Withdrawal Page
			withdrawalTitle: "Request Withdrawal",
			withdrawalSubtitle:
				"Withdraw your earnings to your preferred payment method",
			withdrawalAmount: "Withdrawal Amount",
			minimumWithdrawal: "Minimum Withdrawal",
			withdrawalFee: "Withdrawal Fee",
			netAmount: "Net Amount",
			requestWithdrawal: "Request Withdrawal",
			withdrawalHistory: "Withdrawal History",

			// Transfer Page
			transferTitle: "Transfer Funds",
			transferSubtitle: "Transfer funds to another user account",
			recipientEmail: "Recipient Email",
			transferAmount: "Transfer Amount",
			transferFee: "Transfer Fee",
			transferNote: "Transfer Note (Optional)",
			sendTransfer: "Send Transfer",
			transferHistory: "Transfer History",

			// Settings Page
			accountSettings: "Account Settings",
			profileInformation: "Profile Information",
			securitySettings: "Security Settings",
			notificationSettings: "Notification Settings",
			changePassword: "Change Password",
			currentPassword: "Current Password",
			newPassword: "New Password",
			confirmPassword: "Confirm Password",
			updateProfile: "Update Profile",
			twoFactorAuth: "Two-Factor Authentication",
			emailNotifications: "Email Notifications",
			smsNotifications: "SMS Notifications",

			// Chat Page
			chatTitle: "Support Chat",
			chatSubtitle: "Get help from our support team",
			typeMessage: "Type your message...",
			sendMessage: "Send Message",
			onlineSupport: "Online Support",
			chatHistory: "Chat History",

			// Investment Page
			myInvestments: "My Investments",
			investmentOverview: "Investment Overview",
			makeInvestment: "Make Investment",
			investmentAmount: "Investment Amount",
			expectedReturn: "Expected Return",
			maturityDate: "Maturity Date",
			investmentStatus: "Investment Status",
			active: "Active",
			completed: "Completed",
			pending: "Pending",

			// Transaction Status
			approved: "Approved",
			rejected: "Rejected",
			processing: "Processing",
			failed: "Failed",

			// Common Dashboard Terms
			amount: "Amount",
			date: "Date",
			status: "Status",
			action: "Action",
			description: "Description",
			reference: "Reference",
			type: "Type",

			// Auth Pages
			loginTitle: "Welcome Back",
			loginSubtitle: "Sign in to your account to continue",
			emailAddress: "Email Address",
			password: "Password",
			rememberMe: "Remember me",
			forgotPassword: "Forgot password?",
			signIn: "Sign In",
			noAccount: "Don't have an account?",
			signUp: "Sign up",

			registerTitle: "Create Account",
			registerSubtitle: "Join thousands of successful investors",
			fullName: "Full Name",
			confirmPassword: "Confirm Password",
			agreeToTerms: "I agree to the Terms of Service and Privacy Policy",
			createAccount: "Create Account",
			alreadyHaveAccount: "Already have an account?",

			// Legal Pages
			privacyPolicyTitle: "Privacy Policy",
			privacyPolicyContent:
				"This Privacy Policy describes how TradeZeroTrading collects, uses, and protects your personal information.",

			termsOfServiceTitle: "Terms of Service",
			termsOfServiceContent:
				"These Terms of Service govern your use of TradeZeroTrading platform and services.",

			riskDisclaimerTitle: "Risk Disclaimer",
			riskDisclaimerContent:
				"Investment involves risk. Past performance does not guarantee future results.",

			lastUpdated: "Last updated",
			effectiveDate: "Effective Date",

			// Contact Page Cards
			emailSupport: "Email Support",
			emailSupportDesc: "Get help via email within 24 hours",
			phoneSupport: "Phone Support",
			phoneSupportDesc: "Speak directly with our experts",
			liveChat: "Live Chat",
			liveChatDesc: "Instant support through live chat",
			officeLocation: "Office Location",
			officeLocationDesc: "Visit our headquarters",
			availableOnPlatform: "Available on platform",
			byAppointment: "By appointment",

			// FAQ
			faqTitle: "Frequently Asked Questions",
			faqSubtitle: "Quick answers to common questions about our platform.",
			faq_q1_question: "How do I start investing?",
			faq_q1_answer:
				"Simply register for an account, complete verification, deposit funds, and choose an investment package that suits your goals.",
			faq_q2_question: "What are the minimum investment amounts?",
			faq_q2_answer:
				"Our packages start from as low as $100, making crypto investment accessible to everyone.",
			faq_q3_question: "How secure are my funds?",
			faq_q3_answer:
				"We use military-grade encryption, cold storage for crypto assets, and are fully regulated and insured.",
			faq_q4_question: "When can I withdraw my returns?",
			faq_q4_answer:
				"Returns are automatically credited to your account daily, and you can withdraw anytime after the minimum investment period.",

			// Package Benefits
			secureInsured: "Secure & Insured",
			secureInsuredDesc:
				"All investments are protected by insurance and advanced security protocols",
			provenReturns: "Proven Returns",
			provenReturnsDesc:
				"Consistent performance backed by professional trading algorithms",
			automatedTrading: "Automated Trading",
			automatedTradingDesc:
				"24/7 automated trading ensures you never miss market opportunities",
			expertManagement: "Expert Management",
			expertManagementDesc:
				"Managed by experienced cryptocurrency and financial experts",

			// Platform Features
			dailyProfitDistribution: "Daily profit distribution",
			realtimePortfolioTracking: "Real-time portfolio tracking",
			multiCurrencySupport: "Multi-currency support",
			customerSupport247: "24/7 customer support",
			mobileAppAccess: "Mobile app access",
			advancedAnalytics: "Advanced analytics",
			riskManagementTools: "Risk management tools",
			platformFeaturesTitle: "Platform Features",
			platformFeaturesSubtitle:
				"Everything you need for successful cryptocurrency investment",
		},
	},
	de: {
		translation: {
			home: "Startseite",
			packages: "Pakete",
			about: "Über uns",
			contact: "Kontakt",
			login: "Anmelden",
			register: "Registrieren",
			dashboard: "Dashboard",
			settings: "Einstellungen",
			logout: "Abmelden",

			language: "Sprache",
			welcome: "Willkommen",
			balance: "Guthaben",
			deposit: "Einzahlen",
			withdraw: "Abheben",
			transfer: "Übertragen",
			investments: "Investitionen",

			heroTitle: "Professionelle Investmentplattform",
			heroSubtitle:
				"Schließen Sie sich Tausenden von Investoren an, die passives Einkommen durch sichere Investitionen in Immobilien, Öl & Gas, Landwirtschaft und Krypto-Mining erzielen. Beginnen Sie mit 100 $ und erzielen Sie bis zu 40 % ROI.",
			getStarted: "Loslegen",
			learnMore: "Mehr erfahren",

			whyChooseUs: "Warum TradeZeroTrading wählen?",
			secureInvestments: "Sichere Investitionen",
			secureInvestmentsDesc:
				"Banksicherheit mit SSL-Verschlüsselung und Multi-Faktor-Authentifizierung zum Schutz Ihrer Investitionen.",
			highReturns: "Hohe Renditen",
			highReturnsDesc:
				"Erzielen Sie bis zu 40% ROI mit unserem diversifizierten Investmentportfolio in mehreren Sektoren.",
			expertSupport: "24/7 Expertenunterstützung",
			expertSupportDesc:
				"Erhalten Sie professionelle Beratung von unseren Investmentexperten, wann immer Sie sie benötigen.",

			investmentCategories: "Investitionskategorien",
			realEstate: "Immobilien",
			realEstateDesc:
				"Investieren Sie in Premium-Immobilien mit garantierten Renditen und Kapitalzuwachs.",
			oilGas: "Öl & Gas",
			oilGasDesc:
				"Beteiligen Sie sich an Energiesektorinvestitionen mit stabilen Renditen und Wachstumspotenzial.",
			agriculture: "Landwirtschaft",
			agricultureDesc:
				"Unterstützen Sie nachhaltige Landwirtschaftsprojekte und erzielen Sie konsistente passive Einkommen.",
			cryptoMining: "Krypto-Mining",
			cryptoMiningDesc:
				"Schließen Sie sich unseren Mining-Operationen an und profitieren Sie vom Wachstum des Kryptowährungsmarktes.",

			totalInvestors: "Gesamtinvestoren",
			totalInvested: "Gesamtinvestition",
			averageReturns: "Durchschnittliche Renditen",
			successRate: "Erfolgsrate",

			readyToStart: "Bereit zum Investieren?",
			joinToday:
				"Schließen Sie sich heute Tausenden erfolgreicher Investoren an",
			startInvesting: "Jetzt investieren",

			quickLinks: "Schnelle Links",
			legalInfo: "Rechtliche Informationen",
			privacyPolicy: "Datenschutzrichtlinie",
			termsOfService: "Nutzungsbedingungen",
			riskDisclaimer: "Risikohinweis",
			followUs: "Folgen Sie uns",
			allRightsReserved: "Alle Rechte vorbehalten.",

			viewAll: "Alle anzeigen",
			readMore: "Mehr lesen",
			apply: "Anwenden",
			cancel: "Abbrechen",
			save: "Speichern",
			edit: "Bearbeiten",
			delete: "Löschen",
			confirm: "Bestätigen",
			back: "Zurück",
			next: "Weiter",
			previous: "Vorherige",
			loading: "Laden...",
			error: "Fehler",
			success: "Erfolg",

			// About Page
			aboutTitle: "Über TradeZeroTrading",
			aboutSubtitle:
				"Die Zukunft diversifizierter Investmentmöglichkeiten anführen",
			ourMission: "Unsere Mission",
			ourMissionDesc:
				"Den Zugang zu Premium-Investmentmöglichkeiten in den Bereichen Immobilien, Energie, Landwirtschaft und Technologie zu demokratisieren und dabei maximale Sicherheit und Transparenz für unsere Investoren zu gewährleisten.",
			ourVision: "Unsere Vision",
			ourVisionDesc:
				"Die weltweit vertrauenswürdigste Investmentplattform zu werden und Einzelpersonen zu befähigen, durch innovative und nachhaltige Investmentstrategien Vermögen aufzubauen.",
			ourValues: "Unsere Werte",
			transparency: "Transparenz",
			transparencyDesc:
				"Vollständige Offenheit in allen unseren Operationen und Investmentprozessen.",
			security: "Sicherheit",
			securityDesc:
				"Banksicherheitsmaßnahmen zum Schutz Ihrer Investitionen und persönlichen Daten.",
			innovation: "Innovation",
			innovationDesc:
				"Modernste Technologie und Investmentstrategien für optimale Renditen.",
			sustainability: "Nachhaltigkeit",
			sustainabilityDesc:
				"Umweltverantwortliche Investitionen für eine bessere Zukunft.",
			companyStats: "Unternehmensstatistiken",
			foundedIn: "Gegründet 2019",
			globalPresence: "Globale Präsenz in 25+ Ländern",
			teamMembers: "150+ Expertenteam-Mitglieder",
			regulatoryCompliance: "EU-Regulierungskonformität",

			// Contact Page
			contactTitle: "Kontaktieren Sie uns",
			contactSubtitle: "Nehmen Sie Kontakt mit unseren Investmentexperten auf",
			getInTouch: "Kontakt aufnehmen",
			getInTouchDesc:
				"Haben Sie Fragen zu unseren Investmentmöglichkeiten? Unser Expertenteam hilft Ihnen gerne bei fundierten Entscheidungen.",
			contactInfo: "Kontaktinformationen",
			address: "Adresse",
			phone: "Telefon",
			email: "E-Mail",
			businessHours: "Geschäftszeiten",
			mondayFriday: "Montag - Freitag: 9:00 - 18:00 MEZ",
			weekend: "Wochenende: 10:00 - 16:00 MEZ",
			contactForm: "Senden Sie uns eine Nachricht",
			firstName: "Vorname",
			lastName: "Nachname",
			subject: "Betreff",
			message: "Nachricht",
			sendMessage: "Nachricht senden",

			// Testimonials
			testimonialTitle: "Was unsere Investoren sagen",
			testimonialSubtitle:
				"Echte Geschichten von echten Investoren, die durch unsere Plattform finanziellen Erfolg erzielt haben",
			clientTestimonial1:
				"TradeZeroTrading hat mein Investmentportfolio transformiert. Die Renditen sind konstant und die Plattform ist unglaublich benutzerfreundlich. Ich investiere seit 2 Jahren und könnte nicht glücklicher sein.",
			clientTestimonial2:
				"Die diversifizierten Investmentoptionen und professionelle Unterstützung heben diese Plattform hervor. Ich habe stetiges Wachstum in meinen Investitionen in allen Sektoren gesehen.",
			clientTestimonial3:
				"Exzellenter Kundenservice und transparente Prozesse. Die Immobilieninvestitionen haben außergewöhnlich gut abgeschnitten und meine Erwartungen übertroffen.",

			// Form validation
			required: "Dieses Feld ist erforderlich",
			invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
			messageSent: "Nachricht erfolgreich gesendet!",
			messageError:
				"Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",

			// Packages Page
			packagesTitle: "Investmentpakete",
			packagesSubtitle:
				"Wählen Sie den perfekten Investmentplan, der zu Ihren finanziellen Zielen und Risikobereitschaft passt",
			choosePackage: "Wählen Sie Ihr Paket",
			packageFeatures: "Paket-Features",
			minimumInvestment: "Mindestinvestition",
			maximumInvestment: "Maximale Investition",
			duration: "Laufzeit",
			roi: "ROI",
			dailyReturns: "Tägliche Renditen",
			totalReturn: "Gesamtrendite",
			instantWithdrawal: "Sofortige Auszahlung",
			support: "24/7 Support",
			securePayment: "Sichere Zahlung",
			riskLevel: "Risikolevel",
			low: "Niedrig",
			medium: "Mittel",
			high: "Hoch",
			days: "Tage",
			selectPlan: "Plan auswählen",
			mostPopular: "Am beliebtesten",
			recommended: "Empfohlen",

			// Package Names
			starterPlan: "Starter-Plan",
			starterDesc:
				"Perfekt für Anfänger, die ihre Investmentreise beginnen möchten",
			basicPlan: "Basic-Plan",
			basicDesc:
				"Ideal für Investoren, die stetige Renditen mit moderatem Risiko suchen",
			premiumPlan: "Premium-Plan",
			premiumDesc:
				"Fortgeschrittenes Paket für erfahrene Investoren mit höheren Renditen",
			professionalPlan: "Professional-Plan",
			professionalDesc:
				"Elite-Paket für seriöse Investoren mit erheblichem Kapital",
			vipPlan: "VIP-Plan",
			vipDesc: "Exklusives Paket mit maximalen Renditen und Premium-Vorteilen",

			// Dashboard Pages
			dashboardTitle: "Dashboard",
			welcomeBack: "Willkommen zurück",
			totalBalance: "Gesamtguthaben",
			availableBalance: "Verfügbares Guthaben",
			totalEarnings: "Gesamteinnahmen",
			activeInvestments: "Aktive Investitionen",
			pendingWithdrawals: "Ausstehende Abhebungen",
			recentTransactions: "Letzte Transaktionen",
			quickActions: "Schnellaktionen",
			viewAllTransactions: "Alle Transaktionen anzeigen",

			// Deposit Page
			depositTitle: "Einzahlung tätigen",
			depositSubtitle:
				"Fügen Sie Geld zu Ihrem Konto hinzu, um mit dem Investieren zu beginnen",
			selectPaymentMethod: "Zahlungsmethode auswählen",
			depositAmount: "Einzahlungsbetrag",
			minimumDeposit: "Mindesteinzahlung",
			processingFee: "Bearbeitungsgebühr",
			totalAmount: "Gesamtbetrag",
			proceedToPayment: "Zur Zahlung",
			depositHistory: "Einzahlungshistorie",

			// Withdrawal Page
			withdrawalTitle: "Abhebung beantragen",
			withdrawalSubtitle:
				"Heben Sie Ihre Einnahmen auf Ihre bevorzugte Zahlungsmethode ab",
			withdrawalAmount: "Abhebungsbetrag",
			minimumWithdrawal: "Mindestabhebung",
			withdrawalFee: "Abhebungsgebühr",
			netAmount: "Nettobetrag",
			requestWithdrawal: "Abhebung beantragen",
			withdrawalHistory: "Abhebungshistorie",

			// Transfer Page
			transferTitle: "Geld überweisen",
			transferSubtitle: "Überweisen Sie Geld auf ein anderes Benutzerkonto",
			recipientEmail: "Empfänger-E-Mail",
			transferAmount: "Überweisungsbetrag",
			transferFee: "Überweisungsgebühr",
			transferNote: "Überweisungsnotiz (Optional)",
			sendTransfer: "Überweisung senden",
			transferHistory: "Überweisungshistorie",

			// Settings Page
			accountSettings: "Kontoeinstellungen",
			profileInformation: "Profilinformationen",
			securitySettings: "Sicherheitseinstellungen",
			notificationSettings: "Benachrichtigungseinstellungen",
			changePassword: "Passwort ändern",
			currentPassword: "Aktuelles Passwort",
			newPassword: "Neues Passwort",
			confirmPassword: "Passwort bestätigen",
			updateProfile: "Profil aktualisieren",
			twoFactorAuth: "Zwei-Faktor-Authentifizierung",
			emailNotifications: "E-Mail-Benachrichtigungen",
			smsNotifications: "SMS-Benachrichtigungen",

			// Chat Page
			chatTitle: "Support-Chat",
			chatSubtitle: "Holen Sie sich Hilfe von unserem Support-Team",
			typeMessage: "Geben Sie Ihre Nachricht ein...",
			sendMessage: "Nachricht senden",
			onlineSupport: "Online-Support",
			chatHistory: "Chat-Verlauf",

			// Investment Page
			myInvestments: "Meine Investitionen",
			investmentOverview: "Investitionsübersicht",
			makeInvestment: "Investition tätigen",
			investmentAmount: "Investitionsbetrag",
			expectedReturn: "Erwartete Rendite",
			maturityDate: "Fälligkeitsdatum",
			investmentStatus: "Investitionsstatus",
			active: "Aktiv",
			completed: "Abgeschlossen",
			pending: "Ausstehend",

			// Transaction Status
			approved: "Genehmigt",
			rejected: "Abgelehnt",
			processing: "In Bearbeitung",
			failed: "Fehlgeschlagen",

			// Common Dashboard Terms
			amount: "Betrag",
			date: "Datum",
			status: "Status",
			action: "Aktion",
			description: "Beschreibung",
			reference: "Referenz",
			type: "Typ",

			// Auth Pages
			loginTitle: "Willkommen zurück",
			loginSubtitle: "Melden Sie sich in Ihrem Konto an, um fortzufahren",
			emailAddress: "E-Mail-Adresse",
			password: "Passwort",
			rememberMe: "Angemeldet bleiben",
			forgotPassword: "Passwort vergessen?",
			signIn: "Anmelden",
			noAccount: "Haben Sie noch kein Konto?",
			signUp: "Registrieren",

			registerTitle: "Konto erstellen",
			registerSubtitle:
				"Schließen Sie sich Tausenden erfolgreicher Investoren an",
			fullName: "Vollständiger Name",
			confirmPassword: "Passwort bestätigen",
			agreeToTerms:
				"Ich stimme den Nutzungsbedingungen und der Datenschutzrichtlinie zu",
			createAccount: "Konto erstellen",
			alreadyHaveAccount: "Haben Sie bereits ein Konto?",

			// Legal Pages
			privacyPolicyTitle: "Datenschutzrichtlinie",
			privacyPolicyContent:
				"Diese Datenschutzrichtlinie beschreibt, wie TradeZeroTrading Ihre persönlichen Daten sammelt, verwendet und schützt.",

			termsOfServiceTitle: "Nutzungsbedingungen",
			termsOfServiceContent:
				"Diese Nutzungsbedingungen regeln Ihre Nutzung der TradeZeroTrading-Plattform und -Dienste.",

			riskDisclaimerTitle: "Risikohinweis",
			riskDisclaimerContent:
				"Investitionen sind mit Risiken verbunden. Die Wertentwicklung der Vergangenheit ist kein Indikator für zukünftige Ergebnisse.",

			lastUpdated: "Zuletzt aktualisiert",
			effectiveDate: "Gültigkeitsdatum",

			// Contact Page Cards
			emailSupport: "E-Mail-Support",
			emailSupportDesc: "Hilfe per E-Mail innerhalb von 24 Stunden erhalten",
			phoneSupport: "Telefon-Support",
			phoneSupportDesc: "Sprechen Sie direkt mit unseren Experten",
			liveChat: "Live-Chat",
			liveChatDesc: "Sofortige Unterstützung durch Live-Chat",
			officeLocation: "Bürostandort",
			officeLocationDesc: "Besuchen Sie unsere Zentrale",
			availableOnPlatform: "Available on platform",
			byAppointment: "By appointment",

			// FAQ
			faqTitle: "Frequently Asked Questions",
			faqSubtitle: "Quick answers to common questions about our platform.",
			faq_q1_question: "How do I start investing?",
			faq_q1_answer:
				"Simply register for an account, complete verification, deposit funds, and choose an investment package that suits your goals.",
			faq_q2_question: "What are the minimum investment amounts?",
			faq_q2_answer:
				"Our packages start from as low as $100, making crypto investment accessible to everyone.",
			faq_q3_question: "How secure are my funds?",
			faq_q3_answer:
				"We use military-grade encryption, cold storage for crypto assets, and are fully regulated and insured.",
			faq_q4_question: "When can I withdraw my returns?",
			faq_q4_answer:
				"Returns are automatically credited to your account daily, and you can withdraw anytime after the minimum investment period.",

			// Package Benefits
			secureInsured: "Sicher & Versichert",
			secureInsuredDesc:
				"Alle Investitionen sind durch Versicherung und fortschrittliche Sicherheitsprotokolle geschützt",
			provenReturns: "Bewährte Renditen",
			provenReturnsDesc:
				"Konsistente Leistung unterstützt durch professionelle Handelsalgorithmen",
			automatedTrading: "Automatisierter Handel",
			automatedTradingDesc:
				"24/7 automatisierter Handel stellt sicher, dass Sie keine Marktchancen verpassen",
			expertManagement: "Expertenmanagement",
			expertManagementDesc:
				"Verwaltet von erfahrenen Kryptowährungs- und Finanzexperten",

			// Platform Features
			dailyProfitDistribution: "Tägliche Gewinnausschüttung",
			realtimePortfolioTracking: "Echtzeit-Portfolio-Tracking",
			multiCurrencySupport: "Multi-Währungsunterstützung",
			customerSupport247: "24/7 Kundensupport",
			mobileAppAccess: "Mobile App-Zugang",
			advancedAnalytics: "Erweiterte Analytik",
			riskManagementTools: "Risikomanagement-Tools",
		},
	},
	fr: {
		translation: {
			home: "Accueil",
			packages: "Forfaits",
			about: "À propos",
			contact: "Contact",
			login: "Connexion",
			register: "S'inscrire",
			dashboard: "Tableau de bord",
			settings: "Paramètres",
			logout: "Déconnexion",

			language: "Langue",
			welcome: "Bienvenue",
			balance: "Solde",
			deposit: "Dépôt",
			withdraw: "Retirer",
			transfer: "Transférer",
			investments: "Investissements",

			heroTitle: "Plateforme d'investissement professionnelle",
			heroSubtitle:
				"Rejoignez des milliers d'investisseurs qui génèrent des revenus passifs grâce à des investissements sécurisés dans l'immobilier, le pétrole et le gaz, l'agriculture et le minage de crypto. Commencez avec 100 $ et obtenez jusqu'à 40 % de ROI.",
			getStarted: "Commencer",
			learnMore: "En savoir plus",

			whyChooseUs: "Pourquoi choisir TradeZeroTrading ?",
			secureInvestments: "Investissements sécurisés",
			secureInvestmentsDesc:
				"Sécurité bancaire avec cryptage SSL et authentification multi-facteurs pour protéger vos investissements.",
			highReturns: "Rendements élevés",
			highReturnsDesc:
				"Gagnez jusqu'à 40% de ROI avec notre portefeuille d'investissement diversifié dans plusieurs secteurs.",
			expertSupport: "Support expert 24/7",
			expertSupportDesc:
				"Obtenez des conseils professionnels de nos experts en investissement quand vous en avez besoin.",

			investmentCategories: "Catégories d'investissement",
			realEstate: "Immobilier",
			realEstateDesc:
				"Investissez dans des propriétés immobilières premium avec des rendements garantis et une appréciation du capital.",
			oilGas: "Pétrole et Gaz",
			oilGasDesc:
				"Participez aux investissements du secteur énergétique avec des rendements stables et un potentiel de croissance.",
			agriculture: "Agriculture",
			agricultureDesc:
				"Soutenez des projets agricoles durables tout en gagnant des revenus passifs constants.",
			cryptoMining: "Minage de Crypto",
			cryptoMiningDesc:
				"Rejoignez nos opérations de minage et bénéficiez de la croissance du marché des cryptomonnaies.",

			totalInvestors: "Total des investisseurs",
			totalInvested: "Total investi",
			averageReturns: "Rendements moyens",
			successRate: "Taux de réussite",

			readyToStart: "Prêt à commencer à investir ?",
			joinToday: "Rejoignez des milliers d'investisseurs prospères aujourd'hui",
			startInvesting: "Commencer à investir maintenant",

			quickLinks: "Liens rapides",
			legalInfo: "Informations légales",
			privacyPolicy: "Politique de confidentialité",
			termsOfService: "Conditions de service",
			riskDisclaimer: "Avertissement sur les risques",
			followUs: "Suivez-nous",
			allRightsReserved: "Tous droits réservés.",

			viewAll: "Voir tout",
			readMore: "Lire plus",
			apply: "Appliquer",
			cancel: "Annuler",
			save: "Sauvegarder",
			edit: "Modifier",
			delete: "Supprimer",
			confirm: "Confirmer",
			back: "Retour",
			next: "Suivant",
			previous: "Précédent",
			loading: "Chargement...",
			error: "Erreur",
			success: "Succès",

			// About Page
			aboutTitle: "À propos de TradeZeroTrading",
			aboutSubtitle:
				"Mener l'avenir des opportunités d'investissement diversifiées",
			ourMission: "Notre Mission",
			ourMissionDesc:
				"Démocratiser l'accès aux opportunités d'investissement premium dans les secteurs de l'immobilier, de l'\u00e9nergie, de l'agriculture et de la technologie tout en assurant une sécurité et une transparence maximales pour nos investisseurs.",
			ourVision: "Notre Vision",
			ourVisionDesc:
				"Devenir la plateforme d'investissement la plus fiable au monde, permettant aux individus de construire leur richesse grâce à des stratégies d'investissement innovantes et durables.",
			ourValues: "Nos Valeurs",
			transparency: "Transparence",
			transparencyDesc:
				"Ouverture complète dans toutes nos opérations et processus d'investissement.",
			security: "Sécurité",
			securityDesc:
				"Mesures de sécurité bancaire pour protéger vos investissements et données personnelles.",
			innovation: "Innovation",
			innovationDesc:
				"Technologie de pointe et stratégies d'investissement pour des rendements optimaux.",
			sustainability: "Durabilité",
			sustainabilityDesc:
				"Investissements respectueux de l'environnement pour un avenir meilleur.",
			companyStats: "Statistiques de l'entreprise",
			foundedIn: "Fondée en 2019",
			globalPresence: "Présence mondiale dans 25+ pays",
			teamMembers: "150+ membres d'\u00e9quipe experts",
			regulatoryCompliance: "Conformité réglementaire UE",

			// Contact Page
			contactTitle: "Contactez-nous",
			contactSubtitle: "Entrez en contact avec nos experts en investissement",
			getInTouch: "Entrer en contact",
			getInTouchDesc:
				"Vous avez des questions sur nos opportunités d'investissement ? Notre équipe d'experts est là pour vous aider à prendre des décisions éclairées.",
			contactInfo: "Informations de contact",
			address: "Adresse",
			phone: "Téléphone",
			email: "E-mail",
			businessHours: "Heures d'ouverture",
			mondayFriday: "Lundi - Vendredi : 9h00 - 18h00 CET",
			weekend: "Week-end : 10h00 - 16h00 CET",
			contactForm: "Envoyez-nous un message",
			firstName: "Prénom",
			lastName: "Nom",
			subject: "Sujet",
			message: "Message",
			sendMessage: "Envoyer le message",

			// Testimonials
			testimonialTitle: "Ce que disent nos investisseurs",
			testimonialSubtitle:
				"Histoires réelles d'investisseurs réels qui ont atteint le succès financier grâce à notre plateforme",
			clientTestimonial1:
				"TradeZeroTrading a transformé mon portefeuille d'investissement. Les rendements sont constants et la plateforme est incroyablement conviviale. J'investis depuis 2 ans et je ne pourrais pas être plus heureux.",
			clientTestimonial2:
				"Les options d'investissement diversifiées et le support professionnel font ressortir cette plateforme. J'ai vu une croissance constante de mes investissements dans tous les secteurs.",
			clientTestimonial3:
				"Excellent service client et processus transparents. Les investissements immobiliers ont exceptionnellement bien performé, dépassant mes attentes.",

			// Form validation
			required: "Ce champ est requis",
			invalidEmail: "Veuillez entrer une adresse e-mail valide",
			messageSent: "Message envoyé avec succès !",
			messageError: "Échec de l'envoi du message. Veuillez réessayer.",

			// Packages Page
			packagesTitle: "Forfaits d'investissement",
			packagesSubtitle:
				"Choisissez le plan d'investissement parfait qui correspond à vos objectifs financiers et votre appétit pour le risque",
			choosePackage: "Choisissez votre forfait",
			packageFeatures: "Caractéristiques du forfait",
			minimumInvestment: "Investissement minimum",
			maximumInvestment: "Investissement maximum",
			duration: "Durée",
			roi: "ROI",
			dailyReturns: "Rendements quotidiens",
			totalReturn: "Rendement total",
			instantWithdrawal: "Retrait instantané",
			support: "Support 24/7",
			securePayment: "Paiement sécurisé",
			riskLevel: "Niveau de risque",
			low: "Faible",
			medium: "Moyen",
			high: "Élevé",
			days: "jours",
			selectPlan: "Sélectionner le plan",
			mostPopular: "Le plus populaire",
			recommended: "Recommandé",

			// Package Names
			starterPlan: "Plan Débutant",
			starterDesc:
				"Parfait pour les débutants qui souhaitent commencer leur parcours d'investissement",
			basicPlan: "Plan de Base",
			basicDesc:
				"Idéal pour les investisseurs recherchant des rendements stables avec un risque modéré",
			premiumPlan: "Plan Premium",
			premiumDesc:
				"Forfait avancé pour les investisseurs expérimentés recherchant des rendements plus élevés",
			professionalPlan: "Plan Professionnel",
			professionalDesc:
				"Forfait élite pour les investisseurs sérieux avec un capital substantiel",
			vipPlan: "Plan VIP",
			vipDesc:
				"Forfait exclusif avec des rendements maximaux et des avantages premium",

			// Dashboard Pages
			dashboardTitle: "Tableau de bord",
			welcomeBack: "Bon retour",
			totalBalance: "Solde total",
			availableBalance: "Solde disponible",
			totalEarnings: "Gains totaux",
			activeInvestments: "Investissements actifs",
			pendingWithdrawals: "Retraits en attente",
			recentTransactions: "Transactions récentes",
			quickActions: "Actions rapides",
			viewAllTransactions: "Voir toutes les transactions",

			// Deposit Page
			depositTitle: "Effectuer un dépôt",
			depositSubtitle:
				"Ajoutez des fonds à votre compte pour commencer à investir",
			selectPaymentMethod: "Sélectionner le mode de paiement",
			depositAmount: "Montant du dépôt",
			minimumDeposit: "Dépôt minimum",
			processingFee: "Frais de traitement",
			totalAmount: "Montant total",
			proceedToPayment: "Procéder au paiement",
			depositHistory: "Historique des dépôts",

			// Withdrawal Page
			withdrawalTitle: "Demander un retrait",
			withdrawalSubtitle:
				"Retirez vos gains vers votre mode de paiement préféré",
			withdrawalAmount: "Montant du retrait",
			minimumWithdrawal: "Retrait minimum",
			withdrawalFee: "Frais de retrait",
			netAmount: "Montant net",
			requestWithdrawal: "Demander un retrait",
			withdrawalHistory: "Historique des retraits",

			// Transfer Page
			transferTitle: "Transférer des fonds",
			transferSubtitle: "Transférez des fonds vers un autre compte utilisateur",
			recipientEmail: "E-mail du destinataire",
			transferAmount: "Montant du transfert",
			transferFee: "Frais de transfert",
			transferNote: "Note de transfert (Optionnel)",
			sendTransfer: "Envoyer le transfert",
			transferHistory: "Historique des transferts",

			// Settings Page
			accountSettings: "Paramètres du compte",
			profileInformation: "Informations du profil",
			securitySettings: "Paramètres de sécurité",
			notificationSettings: "Paramètres de notification",
			changePassword: "Changer le mot de passe",
			currentPassword: "Mot de passe actuel",
			newPassword: "Nouveau mot de passe",
			confirmPassword: "Confirmer le mot de passe",
			updateProfile: "Mettre à jour le profil",
			twoFactorAuth: "Authentification à deux facteurs",
			emailNotifications: "Notifications par e-mail",
			smsNotifications: "Notifications SMS",

			// Chat Page
			chatTitle: "Chat de support",
			chatSubtitle: "Obtenez de l'aide de notre équipe de support",
			typeMessage: "Tapez votre message...",
			sendMessage: "Envoyer le message",
			onlineSupport: "Support en ligne",
			chatHistory: "Historique du chat",

			// Investment Page
			myInvestments: "Mes investissements",
			investmentOverview: "Aperçu des investissements",
			makeInvestment: "Faire un investissement",
			investmentAmount: "Montant de l'investissement",
			expectedReturn: "Rendement attendu",
			maturityDate: "Date d'\u00e9chéance",
			investmentStatus: "Statut de l'investissement",
			active: "Actif",
			completed: "Terminé",
			pending: "En attente",

			// Transaction Status
			approved: "Approuvé",
			rejected: "Rejeté",
			processing: "En cours de traitement",
			failed: "Échoué",

			// Common Dashboard Terms
			amount: "Montant",
			date: "Date",
			status: "Statut",
			action: "Action",
			description: "Description",
			reference: "Référence",
			type: "Type",

			// Auth Pages
			loginTitle: "Bon retour",
			loginSubtitle: "Connectez-vous à votre compte pour continuer",
			emailAddress: "Adresse e-mail",
			password: "Mot de passe",
			rememberMe: "Se souvenir de moi",
			forgotPassword: "Mot de passe oublié?",
			signIn: "Se connecter",
			noAccount: "Vous n'avez pas de compte?",
			signUp: "S'inscrire",

			registerTitle: "Créer un compte",
			registerSubtitle: "Rejoignez des milliers d'investisseurs prospères",
			fullName: "Nom complet",
			confirmPassword: "Confirmer le mot de passe",
			agreeToTerms:
				"J'accepte les conditions de service et la politique de confidentialité",
			createAccount: "Créer un compte",
			alreadyHaveAccount: "Vous avez déjà un compte?",

			// Legal Pages
			privacyPolicyTitle: "Politique de confidentialité",
			privacyPolicyContent:
				"Cette politique de confidentialité décrit comment TradeZeroTrading collecte, utilise et protège vos informations personnelles.",

			termsOfServiceTitle: "Conditions de service",
			termsOfServiceContent:
				"Ces conditions de service régissent votre utilisation de la plateforme et des services TradeZeroTrading.",

			riskDisclaimerTitle: "Avertissement sur les risques",
			riskDisclaimerContent:
				"L'investissement implique des risques. Les performances passées ne garantissent pas les résultats futurs.",

			lastUpdated: "Dernière mise à jour",
			effectiveDate: "Date d'entrée en vigueur",

			// Contact Page Cards
			emailSupport: "Support par e-mail",
			emailSupportDesc: "Obtenez de l'aide par e-mail dans les 24 heures",
			phoneSupport: "Support téléphonique",
			phoneSupportDesc: "Parlez directement avec nos experts",
			liveChat: "Chat en direct",
			liveChatDesc: "Support instantané via chat en direct",
			officeLocation: "Emplacement du bureau",
			officeLocationDesc: "Visitez notre siège social",
			availableOnPlatform: "Available on platform",
			byAppointment: "By appointment",

			// FAQ
			faqTitle: "Frequently Asked Questions",
			faqSubtitle: "Quick answers to common questions about our platform.",
			faq_q1_question: "How do I start investing?",
			faq_q1_answer:
				"Simply register for an account, complete verification, deposit funds, and choose an investment package that suits your goals.",
			faq_q2_question: "What are the minimum investment amounts?",
			faq_q2_answer:
				"Our packages start from as low as $100, making crypto investment accessible to everyone.",
			faq_q3_question: "How secure are my funds?",
			faq_q3_answer:
				"We use military-grade encryption, cold storage for crypto assets, and are fully regulated and insured.",
			faq_q4_question: "When can I withdraw my returns?",
			faq_q4_answer:
				"Returns are automatically credited to your account daily, and you can withdraw anytime after the minimum investment period.",

			// Package Benefits
			secureInsured: "Sécurisé et assuré",
			secureInsuredDesc:
				"Tous les investissements sont protégés par une assurance et des protocoles de sécurité avancés",
			provenReturns: "Rendements prouvés",
			provenReturnsDesc:
				"Performance constante soutenue par des algorithmes de trading professionnels",
			automatedTrading: "Trading automatisé",
			automatedTradingDesc:
				"Le trading automatisé 24/7 garantit que vous ne manquez jamais les opportunités du marché",
			expertManagement: "Gestion experte",
			expertManagementDesc:
				"Géré par des experts expérimentés en cryptomonnaie et finance",

			// Platform Features
			dailyProfitDistribution: "Distribution quotidienne des profits",
			realtimePortfolioTracking: "Suivi de portefeuille en temps réel",
			multiCurrencySupport: "Support multi-devises",
			customerSupport247: "Support client 24/7",
			mobileAppAccess: "Accès à l'application mobile",
			advancedAnalytics: "Analyses avancées",
			riskManagementTools: "Outils de gestion des risques",
		},
	},
	es: {
		translation: {
			home: "Inicio",
			packages: "Paquetes",
			about: "Acerca de",
			contact: "Contacto",
			login: "Iniciar sesión",
			register: "Registrarse",
			dashboard: "Panel",
			settings: "Configuración",
			logout: "Cerrar sesión",

			language: "Idioma",
			welcome: "Bienvenido",
			balance: "Saldo",
			deposit: "Depositar",
			withdraw: "Retirar",
			transfer: "Transferir",
			investments: "Inversiones",

			heroTitle: "Plataforma de inversión profesional",
			heroSubtitle:
				"Únete a miles de inversores que generan ingresos pasivos a través de inversiones seguras en Bienes Raíces, Petróleo y Gas, Agricultura y Minería de Criptomonedas. Comienza con $100 y obtén hasta 40% de ROI.",
			getStarted: "Comenzar",
			learnMore: "Saber más",

			whyChooseUs: "¿Por qué elegir TradeZeroTrading?",
			secureInvestments: "Inversiones seguras",
			secureInvestmentsDesc:
				"Seguridad bancaria con cifrado SSL y autenticación multifactor para proteger sus inversiones.",
			highReturns: "Altos rendimientos",
			highReturnsDesc:
				"Gane hasta 40% de ROI con nuestro portafolio de inversión diversificado en múltiples sectores.",
			expertSupport: "Soporte experto 24/7",
			expertSupportDesc:
				"Obtenga orientación profesional de nuestros expertos en inversiones cuando la necesite.",

			investmentCategories: "Categorías de inversión",
			realEstate: "Bienes Raíces",
			realEstateDesc:
				"Invierta en propiedades inmobiliarias premium con rendimientos garantizados y apreciación del capital.",
			oilGas: "Petróleo y Gas",
			oilGasDesc:
				"Participe en inversiones del sector energético con rendimientos estables y potencial de crecimiento.",
			agriculture: "Agricultura",
			agricultureDesc:
				"Apoye proyectos agrícolas sostenibles mientras obtiene ingresos pasivos consistentes.",
			cryptoMining: "Minería de Criptomonedas",
			cryptoMiningDesc:
				"Únase a nuestras operaciones de minería y benefíciese del crecimiento del mercado de criptomonedas.",

			totalInvestors: "Total de inversores",
			totalInvested: "Total invertido",
			averageReturns: "Rendimientos promedio",
			successRate: "Tasa de éxito",

			readyToStart: "¿Listo para comenzar a invertir?",
			joinToday: "Únete a miles de inversores exitosos hoy",
			startInvesting: "Comenzar a invertir ahora",

			quickLinks: "Enlaces rápidos",
			legalInfo: "Información legal",
			privacyPolicy: "Política de privacidad",
			termsOfService: "Términos de servicio",
			riskDisclaimer: "Descargo de responsabilidad de riesgo",
			followUs: "Síguenos",
			allRightsReserved: "Todos los derechos reservados.",

			viewAll: "Ver todo",
			readMore: "Leer más",
			apply: "Aplicar",
			cancel: "Cancelar",
			save: "Guardar",
			edit: "Editar",
			delete: "Eliminar",
			confirm: "Confirmar",
			back: "Atrás",
			next: "Siguiente",
			previous: "Anterior",
			loading: "Cargando...",
			error: "Error",
			success: "Éxito",

			// About Page
			aboutTitle: "Acerca de TradeZeroTrading",
			aboutSubtitle:
				"Liderando el futuro de las oportunidades de inversión diversificadas",
			ourMission: "Nuestra Misión",
			ourMissionDesc:
				"Democratizar el acceso a oportunidades de inversión premium en los sectores de Bienes Raíces, Energía, Agricultura y Tecnología, asegurando máxima seguridad y transparencia para nuestros inversores.",
			ourVision: "Nuestra Visión",
			ourVisionDesc:
				"Convertirnos en la plataforma de inversión más confiable del mundo, empoderando a individuos para construir riqueza a través de estrategias de inversión innovadoras y sostenibles.",
			ourValues: "Nuestros Valores",
			transparency: "Transparencia",
			transparencyDesc:
				"Apertura completa en todas nuestras operaciones y procesos de inversión.",
			security: "Seguridad",
			securityDesc:
				"Medidas de seguridad bancaria para proteger sus inversiones y datos personales.",
			innovation: "Innovación",
			innovationDesc:
				"Tecnología de vanguardia y estrategias de inversión para rendimientos óptimos.",
			sustainability: "Sostenibilidad",
			sustainabilityDesc:
				"Inversiones ambientalmente responsables para un futuro mejor.",
			companyStats: "Estadísticas de la empresa",
			foundedIn: "Fundada en 2019",
			globalPresence: "Presencia global en 25+ países",
			teamMembers: "150+ miembros del equipo expertos",
			regulatoryCompliance: "Cumplimiento regulatorio de la UE",

			// Contact Page
			contactTitle: "Contáctanos",
			contactSubtitle: "Ponte en contacto con nuestros expertos en inversiones",
			getInTouch: "Ponerse en contacto",
			getInTouchDesc:
				"¿Tienes preguntas sobre nuestras oportunidades de inversión? Nuestro equipo de expertos está aquí para ayudarte a tomar decisiones informadas.",
			contactInfo: "Información de contacto",
			address: "Dirección",
			phone: "Teléfono",
			email: "Correo electrónico",
			businessHours: "Horario comercial",
			mondayFriday: "Lunes - Viernes: 9:00 AM - 6:00 PM CET",
			weekend: "Fin de semana: 10:00 AM - 4:00 PM CET",
			contactForm: "Envíanos un mensaje",
			firstName: "Nombre",
			lastName: "Apellido",
			subject: "Asunto",
			message: "Mensaje",
			sendMessage: "Enviar mensaje",

			// Testimonials
			testimonialTitle: "Lo que dicen nuestros inversores",
			testimonialSubtitle:
				"Historias reales de inversores reales que han logrado éxito financiero a través de nuestra plataforma",
			clientTestimonial1:
				"TradeZeroTrading ha transformado mi portafolio de inversiones. Los rendimientos son consistentes y la plataforma es increíblemente fácil de usar. He estado invirtiendo durante 2 años y no podría estar más feliz.",
			clientTestimonial2:
				"Las opciones de inversión diversificadas y el soporte profesional hacen que esta plataforma se destaque. He visto un crecimiento constante en mis inversiones en todos los sectores.",
			clientTestimonial3:
				"Excelente servicio al cliente y procesos transparentes. Las inversiones inmobiliarias han tenido un rendimiento excepcional, superando mis expectativas.",

			// Form validation
			required: "Este campo es obligatorio",
			invalidEmail: "Por favor ingrese una dirección de correo válida",
			messageSent: "¡Mensaje enviado exitosamente!",
			messageError: "Error al enviar el mensaje. Por favor inténtelo de nuevo.",

			// Packages Page
			packagesTitle: "Paquetes de Inversión",
			packagesSubtitle:
				"Elige el plan de inversión perfecto que se adapte a tus objetivos financieros y apetito de riesgo",
			choosePackage: "Elige tu Paquete",
			packageFeatures: "Características del Paquete",
			minimumInvestment: "Inversión Mínima",
			maximumInvestment: "Inversión Máxima",
			duration: "Duración",
			roi: "ROI",
			dailyReturns: "Rendimientos Diarios",
			totalReturn: "Rendimiento Total",
			instantWithdrawal: "Retiro Instantáneo",
			support: "Soporte 24/7",
			securePayment: "Pago Seguro",
			riskLevel: "Nivel de Riesgo",
			low: "Bajo",
			medium: "Medio",
			high: "Alto",
			days: "días",
			selectPlan: "Seleccionar Plan",
			mostPopular: "Más Popular",
			recommended: "Recomendado",

			// Package Names
			starterPlan: "Plan Inicial",
			starterDesc:
				"Perfecto para principiantes que buscan comenzar su viaje de inversión",
			basicPlan: "Plan Básico",
			basicDesc:
				"Ideal para inversores que buscan rendimientos estables con riesgo moderado",
			premiumPlan: "Plan Premium",
			premiumDesc:
				"Paquete avanzado para inversores experimentados que buscan mayores rendimientos",
			professionalPlan: "Plan Profesional",
			professionalDesc:
				"Paquete elite para inversores serios con capital sustancial",
			vipPlan: "Plan VIP",
			vipDesc:
				"Paquete exclusivo con máximos rendimientos y beneficios premium",

			// Dashboard Pages
			dashboardTitle: "Panel de Control",
			welcomeBack: "Bienvenido de vuelta",
			totalBalance: "Saldo Total",
			availableBalance: "Saldo Disponible",
			totalEarnings: "Ganancias Totales",
			activeInvestments: "Inversiones Activas",
			pendingWithdrawals: "Retiros Pendientes",
			recentTransactions: "Transacciones Recientes",
			quickActions: "Acciones Rápidas",
			viewAllTransactions: "Ver Todas las Transacciones",

			// Deposit Page
			depositTitle: "Realizar Depósito",
			depositSubtitle: "Agregue fondos a su cuenta para comenzar a invertir",
			selectPaymentMethod: "Seleccionar Método de Pago",
			depositAmount: "Monto del Depósito",
			minimumDeposit: "Depósito Mínimo",
			processingFee: "Tarifa de Procesamiento",
			totalAmount: "Monto Total",
			proceedToPayment: "Proceder al Pago",
			depositHistory: "Historial de Depósitos",

			// Withdrawal Page
			withdrawalTitle: "Solicitar Retiro",
			withdrawalSubtitle: "Retire sus ganancias a su método de pago preferido",
			withdrawalAmount: "Monto del Retiro",
			minimumWithdrawal: "Retiro Mínimo",
			withdrawalFee: "Tarifa de Retiro",
			netAmount: "Monto Neto",
			requestWithdrawal: "Solicitar Retiro",
			withdrawalHistory: "Historial de Retiros",

			// Transfer Page
			transferTitle: "Transferir Fondos",
			transferSubtitle: "Transfiera fondos a otra cuenta de usuario",
			recipientEmail: "Email del Destinatario",
			transferAmount: "Monto de Transferencia",
			transferFee: "Tarifa de Transferencia",
			transferNote: "Nota de Transferencia (Opcional)",
			sendTransfer: "Enviar Transferencia",
			transferHistory: "Historial de Transferencias",

			// Settings Page
			accountSettings: "Configuración de Cuenta",
			profileInformation: "Información del Perfil",
			securitySettings: "Configuración de Seguridad",
			notificationSettings: "Configuración de Notificaciones",
			changePassword: "Cambiar Contraseña",
			currentPassword: "Contraseña Actual",
			newPassword: "Nueva Contraseña",
			confirmPassword: "Confirmar Contraseña",
			updateProfile: "Actualizar Perfil",
			twoFactorAuth: "Autenticación de Dos Factores",
			emailNotifications: "Notificaciones por Email",
			smsNotifications: "Notificaciones SMS",

			// Chat Page
			chatTitle: "Chat de Soporte",
			chatSubtitle: "Obtenga ayuda de nuestro equipo de soporte",
			typeMessage: "Escriba su mensaje...",
			sendMessage: "Enviar Mensaje",
			onlineSupport: "Soporte en Línea",
			chatHistory: "Historial de Chat",

			// Investment Page
			myInvestments: "Mis Inversiones",
			investmentOverview: "Resumen de Inversiones",
			makeInvestment: "Realizar Inversión",
			investmentAmount: "Monto de Inversión",
			expectedReturn: "Retorno Esperado",
			maturityDate: "Fecha de Vencimiento",
			investmentStatus: "Estado de Inversión",
			active: "Activo",
			completed: "Completado",
			pending: "Pendiente",

			// Transaction Status
			approved: "Aprobado",
			rejected: "Rechazado",
			processing: "Procesando",
			failed: "Fallido",

			// Common Dashboard Terms
			amount: "Monto",
			date: "Fecha",
			status: "Estado",
			action: "Acción",
			description: "Descripción",
			reference: "Referencia",
			type: "Tipo",

			// Auth Pages
			loginTitle: "Bienvenido de vuelta",
			loginSubtitle: "Inicia sesión en tu cuenta para continuar",
			emailAddress: "Dirección de correo electrónico",
			password: "Contraseña",
			rememberMe: "Recordarme",
			forgotPassword: "¿Olvidaste tu contraseña?",
			signIn: "Iniciar sesión",
			noAccount: "¿No tienes una cuenta?",
			signUp: "Regístrate",

			registerTitle: "Crear cuenta",
			registerSubtitle: "Únete a miles de inversores exitosos",
			fullName: "Nombre completo",
			confirmPassword: "Confirmar contraseña",
			agreeToTerms:
				"Acepto los Términos de Servicio y la Política de Privacidad",
			createAccount: "Crear cuenta",
			alreadyHaveAccount: "¿Ya tienes una cuenta?",

			// Legal Pages
			privacyPolicyTitle: "Política de Privacidad",
			privacyPolicyContent:
				"Esta Política de Privacidad describe cómo TradeZeroTrading recopila, utiliza y protege su información personal.",

			termsOfServiceTitle: "Términos de Servicio",
			termsOfServiceContent:
				"Estos Términos de Servicio rigen su uso de la plataforma y servicios de TradeZeroTrading.",

			riskDisclaimerTitle: "Descargo de Responsabilidad de Riesgo",
			riskDisclaimerContent:
				"La inversión implica riesgo. El rendimiento pasado no garantiza resultados futuros.",

			lastUpdated: "Última actualización",
			effectiveDate: "Fecha de vigencia",

			// Contact Page Cards
			emailSupport: "Soporte por Email",
			emailSupportDesc: "Obtenga ayuda por email en 24 horas",
			phoneSupport: "Soporte Telefónico",
			phoneSupportDesc: "Hable directamente con nuestros expertos",
			liveChat: "Chat en Vivo",
			liveChatDesc: "Soporte instantáneo a través de chat en vivo",
			officeLocation: "Ubicación de Oficina",
			officeLocationDesc: "Visite nuestra sede central",
			availableOnPlatform: "Available on platform",
			byAppointment: "By appointment",

			// FAQ
			faqTitle: "Frequently Asked Questions",
			faqSubtitle: "Quick answers to common questions about our platform.",
			faq_q1_question: "How do I start investing?",
			faq_q1_answer:
				"Simply register for an account, complete verification, deposit funds, and choose an investment package that suits your goals.",
			faq_q2_question: "What are the minimum investment amounts?",
			faq_q2_answer:
				"Our packages start from as low as $100, making crypto investment accessible to everyone.",
			faq_q3_question: "How secure are my funds?",
			faq_q3_answer:
				"We use military-grade encryption, cold storage for crypto assets, and are fully regulated and insured.",
			faq_q4_question: "When can I withdraw my returns?",
			faq_q4_answer:
				"Returns are automatically credited to your account daily, and you can withdraw anytime after the minimum investment period.",

			// Package Benefits
			secureInsured: "Seguro y Asegurado",
			secureInsuredDesc:
				"Todas las inversiones están protegidas por seguros y protocolos de seguridad avanzados",
			provenReturns: "Rendimientos Probados",
			provenReturnsDesc:
				"Rendimiento consistente respaldado por algoritmos de trading profesionales",
			automatedTrading: "Trading Automatizado",
			automatedTradingDesc:
				"El trading automatizado 24/7 asegura que nunca pierdas oportunidades de mercado",
			expertManagement: "Gestión Experta",
			expertManagementDesc:
				"Gestionado por expertos experimentados en criptomonedas y finanzas",

			// Platform Features
			dailyProfitDistribution: "Distribución diaria de ganancias",
			realtimePortfolioTracking: "Seguimiento de cartera en tiempo real",
			multiCurrencySupport: "Soporte multi-moneda",
			customerSupport247: "Soporte al cliente 24/7",
			mobileAppAccess: "Acceso a aplicación móvil",
			advancedAnalytics: "Análisis avanzados",
			riskManagementTools: "Herramientas de gestión de riesgos",
		},
	},
	ar: {
		translation: {
			home: "الرئيسية",
			packages: "الحزم",
			about: "حول",
			contact: "اتصل",
			login: "تسجيل الدخول",
			register: "التسجيل",
			dashboard: "لوحة التحكم",
			settings: "الإعدادات",
			logout: "تسجيل الخروج",

			language: "اللغة",
			welcome: "مرحباً",
			balance: "الرصيد",
			deposit: "إيداع",
			withdraw: "سحب",
			transfer: "تحويل",
			investments: "الاستثمارات",

			heroTitle: "منصة استثمار احترافية",
			heroSubtitle:
				"انضم إلى آلاف المستثمرين الذين يحققون دخلاً سلبياً من خلال الاستثمارات الآمنة في العقارات والنفط والغاز والزراعة وتعدين العملات المشفرة. ابدأ بـ 100 دولار واحصل على عائد يصل إلى 40%.",
			getStarted: "ابدأ الآن",
			learnMore: "اعرف المزيد",

			whyChooseUs: "لماذا تختار TradeZeroTrading؟",
			secureInvestments: "استثمارات آمنة",
			secureInvestmentsDesc:
				"أمان مصرفي مع تشفير SSL ومصادقة متعددة العوامل لحماية استثماراتك.",
			highReturns: "عائدات عالية",
			highReturnsDesc:
				"احصل على عائد يصل إلى 40% مع محفظة الاستثمار المتنوعة عبر قطاعات متعددة.",
			expertSupport: "دعم خبراء 24/7",
			expertSupportDesc:
				"احصل على إرشادات مهنية من خبراء الاستثمار لدينا عندما تحتاجها.",

			investmentCategories: "فئات الاستثمار",
			realEstate: "العقارات",
			realEstateDesc:
				"استثمر في العقارات المميزة مع عائدات مضمونة وتقدير رأس المال.",
			oilGas: "النفط والغاز",
			oilGasDesc:
				"شارك في استثمارات قطاع الطاقة مع عائدات مستقرة وإمكانات نمو.",
			agriculture: "الزراعة",
			agricultureDesc:
				"ادعم مشاريع الزراعة المستدامة بينما تحصل على دخل سلبي ثابت.",
			cryptoMining: "تعدين العملات المشفرة",
			cryptoMiningDesc:
				"انضم إلى عمليات التعدين لدينا واستفد من نمو سوق العملات المشفرة.",

			totalInvestors: "إجمالي المستثمرين",
			totalInvested: "إجمالي الاستثمار",
			averageReturns: "متوسط العائدات",
			successRate: "معدل النجاح",

			readyToStart: "مستعد لبدء الاستثمار؟",
			joinToday: "انضم إلى آلاف المستثمرين الناجحين اليوم",
			startInvesting: "ابدأ الاستثمار الآن",

			quickLinks: "روابط سريعة",
			legalInfo: "معلومات قانونية",
			privacyPolicy: "سياسة الخصوصية",
			termsOfService: "شروط الخدمة",
			riskDisclaimer: "إخلاء مسؤولية المخاطر",
			followUs: "تابعنا",
			allRightsReserved: "جميع الحقوق محفوظة.",

			viewAll: "عرض الكل",
			readMore: "اقرأ المزيد",
			apply: "تطبيق",
			cancel: "إلغاء",
			save: "حفظ",
			edit: "تحرير",
			delete: "حذف",
			confirm: "تأكيد",
			back: "رجوع",
			next: "التالي",
			previous: "السابق",
			loading: "جاري التحميل...",
			error: "خطأ",
			success: "نجح",

			// About Page
			aboutTitle: "حول TradeZeroTrading",
			aboutSubtitle: "قيادة مستقبل فرص الاستثمار المتنوعة",
			ourMission: "مهمتنا",
			ourMissionDesc:
				"دمقرطة الوصول إلى فرص الاستثمار المميزة في قطاعات العقارات والطاقة والزراعة والتكنولوجيا مع ضمان أقصى درجات الأمان والشفافية لمستثمرينا.",
			ourVision: "رؤيتنا",
			ourVisionDesc:
				"أن نصبح منصة الاستثمار الأكثر ثقة في العالم، وتمكين الأفراد من بناء الثروة من خلال استراتيجيات استثمارية مبتكرة ومستدامة.",
			ourValues: "قيمنا",
			transparency: "الشفافية",
			transparencyDesc: "انفتاح كامل في جميع عملياتنا وعمليات الاستثمار.",
			security: "الأمان",
			securityDesc: "تدابير أمنية مصرفية لحماية استثماراتك وبياناتك الشخصية.",
			innovation: "الابتكار",
			innovationDesc: "تقنية متطورة واستراتيجيات استثمارية لعوائد مثلى.",
			sustainability: "الاستدامة",
			sustainabilityDesc: "استثمارات مسؤولة بيئياً لمستقبل أفضل.",
			companyStats: "إحصائيات الشركة",
			foundedIn: "تأسست في 2019",
			globalPresence: "حضور عالمي في 25+ دولة",
			teamMembers: "150+ عضو فريق خبير",
			regulatoryCompliance: "الامتثال التنظيمي للاتحاد الأوروبي",

			// Contact Page
			contactTitle: "اتصل بنا",
			contactSubtitle: "تواصل مع خبراء الاستثمار لدينا",
			getInTouch: "تواصل معنا",
			getInTouchDesc:
				"هل لديك أسئلة حول فرص الاستثمار لدينا؟ فريق الخبراء لدينا هنا لمساعدتك في اتخاذ قرارات مدروسة.",
			contactInfo: "معلومات الاتصال",
			address: "العنوان",
			phone: "الهاتف",
			email: "البريد الإلكتروني",
			businessHours: "ساعات العمل",
			mondayFriday: "الاثنين - الجمعة: 9:00 ص - 6:00 م توقيت وسط أوروبا",
			weekend: "عطلة نهاية الأسبوع: 10:00 ص - 4:00 م توقيت وسط أوروبا",
			contactForm: "أرسل لنا رسالة",
			firstName: "الاسم الأول",
			lastName: "اسم العائلة",
			subject: "الموضوع",
			message: "الرسالة",
			sendMessage: "إرسال الرسالة",

			// Testimonials
			testimonialTitle: "ماذا يقول مستثمرونا",
			testimonialSubtitle:
				"قصص حقيقية من مستثمرين حقيقيين حققوا نجاحاً مالياً من خلال منصتنا",
			clientTestimonial1:
				"TradeZeroTrading غيرت محفظة استثماراتي. العوائد ثابتة والمنصة سهلة الاستخدام بشكل لا يصدق. أستثمر منذ عامين ولا يمكنني أن أكون أكثر سعادة.",
			clientTestimonial2:
				"خيارات الاستثمار المتنوعة والدعم المهني يجعلان هذه المنصة متميزة. لقد رأيت نمواً مطرداً في استثماراتي في جميع القطاعات.",
			clientTestimonial3:
				"خدمة عملاء ممتازة وعمليات شفافة. استثمارات العقارات حققت أداءً استثنائياً، متجاوزة توقعاتي.",

			// Form validation
			required: "هذا الحقل مطلوب",
			invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
			messageSent: "تم إرسال الرسالة بنجاح!",
			messageError: "فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.",

			// Packages Page
			packagesTitle: "حزم الاستثمار",
			packagesSubtitle:
				"اختر خطة الاستثمار المثالية التي تتناسب مع أهدافك المالية وشهيتك للمخاطر",
			choosePackage: "اختر حزمتك",
			packageFeatures: "ميزات الحزمة",
			minimumInvestment: "الحد الأدنى للاستثمار",
			maximumInvestment: "الحد الأقصى للاستثمار",
			duration: "المدة",
			roi: "عائد الاستثمار",
			dailyReturns: "العوائد اليومية",
			totalReturn: "العائد الإجمالي",
			instantWithdrawal: "سحب فوري",
			support: "دعم 24/7",
			securePayment: "دفع آمن",
			riskLevel: "مستوى المخاطر",
			low: "منخفض",
			medium: "متوسط",
			high: "عالي",
			days: "يوم",
			selectPlan: "اختر الخطة",
			mostPopular: "الأكثر شعبية",
			recommended: "موصى به",

			// Package Names
			starterPlan: "خطة المبتدئين",
			starterDesc: "مثالية للمبتدئين الذين يتطلعون لبدء رحلتهم الاستثمارية",
			basicPlan: "الخطة الأساسية",
			basicDesc: "مثالية للمستثمرين الذين يبحثون عن عوائد مستقرة بمخاطر معتدلة",
			premiumPlan: "الخطة المميزة",
			premiumDesc:
				"حزمة متقدمة للمستثمرين ذوي الخبرة الذين يبحثون عن عوائد أعلى",
			professionalPlan: "الخطة المهنية",
			professionalDesc:
				"حزمة نخبوية للمستثمرين الجادين ذوي رؤوس الأموال الكبيرة",
			vipPlan: "خطة VIP",
			vipDesc: "حزمة حصرية بعوائد قصوى ومزايا مميزة",

			// Dashboard Pages
			dashboardTitle: "لوحة التحكم",
			welcomeBack: "مرحباً بعودتك",
			totalBalance: "الرصيد الإجمالي",
			availableBalance: "الرصيد المتاح",
			totalEarnings: "إجمالي الأرباح",
			activeInvestments: "الاستثمارات النشطة",
			pendingWithdrawals: "السحوبات المعلقة",
			recentTransactions: "المعاملات الأخيرة",
			quickActions: "الإجراءات السريعة",
			viewAllTransactions: "عرض جميع المعاملات",

			// Deposit Page
			depositTitle: "إجراء إيداع",
			depositSubtitle: "أضف أموال إلى حسابك لبدء الاستثمار",
			selectPaymentMethod: "اختر طريقة الدفع",
			depositAmount: "مبلغ الإيداع",
			minimumDeposit: "الحد الأدنى للإيداع",
			processingFee: "رسوم المعالجة",
			totalAmount: "المبلغ الإجمالي",
			proceedToPayment: "المتابعة للدفع",
			depositHistory: "تاريخ الإيداعات",

			// Withdrawal Page
			withdrawalTitle: "طلب سحب",
			withdrawalSubtitle: "اسحب أرباحك إلى طريقة الدفع المفضلة لديك",
			withdrawalAmount: "مبلغ السحب",
			minimumWithdrawal: "الحد الأدنى للسحب",
			withdrawalFee: "رسوم السحب",
			netAmount: "المبلغ الصافي",
			requestWithdrawal: "طلب سحب",
			withdrawalHistory: "تاريخ السحوبات",

			// Transfer Page
			transferTitle: "تحويل الأموال",
			transferSubtitle: "حول الأموال إلى حساب مستخدم آخر",
			recipientEmail: "بريد المستلم الإلكتروني",
			transferAmount: "مبلغ التحويل",
			transferFee: "رسوم التحويل",
			transferNote: "ملاحظة التحويل (اختياري)",
			sendTransfer: "إرسال التحويل",
			transferHistory: "تاريخ التحويلات",

			// Settings Page
			accountSettings: "إعدادات الحساب",
			profileInformation: "معلومات الملف الشخصي",
			securitySettings: "إعدادات الأمان",
			notificationSettings: "إعدادات الإشعارات",
			changePassword: "تغيير كلمة المرور",
			currentPassword: "كلمة المرور الحالية",
			newPassword: "كلمة المرور الجديدة",
			confirmPassword: "تأكيد كلمة المرور",
			updateProfile: "تحديث الملف الشخصي",
			twoFactorAuth: "المصادقة الثنائية",
			emailNotifications: "إشعارات البريد الإلكتروني",
			smsNotifications: "إشعارات الرسائل النصية",

			// Chat Page
			chatTitle: "دردشة الدعم",
			chatSubtitle: "احصل على المساعدة من فريق الدعم لدينا",
			typeMessage: "اكتب رسالتك...",
			sendMessage: "إرسال الرسالة",
			onlineSupport: "الدعم المباشر",
			chatHistory: "تاريخ المحادثات",

			// Investment Page
			myInvestments: "استثماراتي",
			investmentOverview: "نظرة عامة على الاستثمارات",
			makeInvestment: "إجراء استثمار",
			investmentAmount: "مبلغ الاستثمار",
			expectedReturn: "العائد المتوقع",
			maturityDate: "تاريخ الاستحقاق",
			investmentStatus: "حالة الاستثمار",
			active: "نشط",
			completed: "مكتمل",
			pending: "معلق",

			// Transaction Status
			approved: "موافق عليه",
			rejected: "مرفوض",
			processing: "قيد المعالجة",
			failed: "فشل",

			// Common Dashboard Terms
			amount: "المبلغ",
			date: "التاريخ",
			status: "الحالة",
			action: "الإجراء",
			description: "الوصف",
			reference: "المرجع",
			type: "النوع",

			// Auth Pages
			loginTitle: "مرحباً بعودتك",
			loginSubtitle: "سجل دخولك إلى حسابك للمتابعة",
			emailAddress: "عنوان البريد الإلكتروني",
			password: "كلمة المرور",
			rememberMe: "تذكرني",
			forgotPassword: "نسيت كلمة المرور؟",
			signIn: "تسجيل الدخول",
			noAccount: "ليس لديك حساب؟",
			signUp: "سجل الآن",

			registerTitle: "إنشاء حساب",
			registerSubtitle: "انضم إلى آلاف المستثمرين الناجحين",
			fullName: "الاسم الكامل",
			confirmPassword: "تأكيد كلمة المرور",
			agreeToTerms: "أوافق على شروط الخدمة وسياسة الخصوصية",
			createAccount: "إنشاء حساب",
			alreadyHaveAccount: "لديك حساب بالفعل؟",

			// Legal Pages
			privacyPolicyTitle: "سياسة الخصوصية",
			privacyPolicyContent:
				"تصف سياسة الخصوصية هذه كيفية جمع TradeZeroTrading واستخدام وحماية معلوماتك الشخصية.",

			termsOfServiceTitle: "شروط الخدمة",
			termsOfServiceContent:
				"تحكم شروط الخدمة هذه استخدامك لمنصة وخدمات TradeZeroTrading.",

			riskDisclaimerTitle: "إخلاء مسؤولية المخاطر",
			riskDisclaimerContent:
				"الاستثمار ينطوي على مخاطر. الأداء السابق لا يضمن النتائج المستقبلية.",

			lastUpdated: "آخر تحديث",
			effectiveDate: "تاريخ السريان",

			// Contact Page Cards
			emailSupport: "دعم البريد الإلكتروني",
			emailSupportDesc: "احصل على المساعدة عبر البريد الإلكتروني خلال 24 ساعة",
			phoneSupport: "دعم هاتفي",
			phoneSupportDesc: "تحدث مباشرة مع خبرائنا",
			liveChat: "دردشة مباشرة",
			liveChatDesc: "دعم فوري من خلال الدردشة المباشرة",
			officeLocation: "موقع المكتب",
			officeLocationDesc: "قم بزيارة مقرنا الرئيسي",
			availableOnPlatform: "Available on platform",
			byAppointment: "By appointment",

			// FAQ
			faqTitle: "Frequently Asked Questions",
			faqSubtitle: "Quick answers to common questions about our platform.",
			faq_q1_question: "How do I start investing?",
			faq_q1_answer:
				"Simply register for an account, complete verification, deposit funds, and choose an investment package that suits your goals.",
			faq_q2_question: "What are the minimum investment amounts?",
			faq_q2_answer:
				"Our packages start from as low as $100, making crypto investment accessible to everyone.",
			faq_q3_question: "How secure are my funds?",
			faq_q3_answer:
				"We use military-grade encryption, cold storage for crypto assets, and are fully regulated and insured.",
			faq_q4_question: "When can I withdraw my returns?",
			faq_q4_answer:
				"Returns are automatically credited to your account daily, and you can withdraw anytime after the minimum investment period.",

			// Package Benefits
			secureInsured: "آمن ومؤمن",
			secureInsuredDesc:
				"جميع الاستثمارات محمية بالتأمين وبروتوكولات أمنية متقدمة",
			provenReturns: "عوائد مثبتة",
			provenReturnsDesc: "أداء ثابت مدعوم بخوارزميات تداول مهنية",
			automatedTrading: "تداول آلي",
			automatedTradingDesc: "التداول الآلي 24/7 يضمن عدم تفويت فرص السوق",
			expertManagement: "إدارة خبيرة",
			expertManagementDesc:
				"مُدار من قبل خبراء ذوي خبرة في العملات المشفرة والمالية",

			// Platform Features
			dailyProfitDistribution: "توزيع الأرباح اليومي",
			realtimePortfolioTracking: "تتبع المحفظة في الوقت الفعلي",
			multiCurrencySupport: "دعم متعدد العملات",
			customerSupport247: "دعم العملاء 24/7",
			mobileAppAccess: "وصول لتطبيق الهاتف",
			advancedAnalytics: "تحليلات متقدمة",
			riskManagementTools: "أدوات إدارة المخاطر",
		},
	},
	fa: {
		translation: {
			home: "خانه",
			packages: "بسته‌ها",
			about: "درباره ما",
			contact: "تماس",
			login: "ورود",
			register: "ثبت‌نام",
			dashboard: "دشبورد",
			settings: "تنظیمات",
			logout: "خروج",

			language: "زبان",
			welcome: "خوش آمدید",
			balance: "موجودی",
			deposit: "واریز",
			withdraw: "برداشت",
			transfer: "انتقال",
			investments: "سرمایه‌گذاری‌ها",

			heroTitle: "پلتفرم سرمایه‌گذاری حرفه‌ای",
			heroSubtitle:
				"به هزاران سرمایه‌گذار بپیوندید که از طریق سرمایه‌گذاری ایمن در املاک و مستغلات، نفت و گاز، کشاورزی و استخراج ارز دیجیتال درآمد غیرفعال کسب می‌کنند. با 100 دلار شروع کنید و تا 40% بازدهی کسب کنید.",
			getStarted: "شروع کنید",
			learnMore: "بیشتر بدانید",

			whyChooseUs: "چرا TradeZeroTrading را انتخاب کنید؟",
			secureInvestments: "سرمایه‌گذاری ایمن",
			secureInvestmentsDesc:
				"امنیت بانکی با رمزگذاری SSL و احراز هویت چندمرحله‌ای برای حفاظت از سرمایه‌گذاری‌های شما.",
			highReturns: "بازدهی بالا",
			highReturnsDesc:
				"تا 40% بازدهی با پرتفوی متنوع سرمایه‌گذاری ما در بخش‌های مختلف کسب کنید.",
			expertSupport: "پشتیبانی متخصص 24/7",
			expertSupportDesc:
				"راهنمایی حرفه‌ای از متخصصان سرمایه‌گذاری ما هر زمان که نیاز دارید دریافت کنید.",

			investmentCategories: "دسته‌بندی سرمایه‌گذاری",
			realEstate: "املاک و مستغلات",
			realEstateDesc:
				"در املاک پریمیوم با بازدهی تضمینی و افزایش ارزش سرمایه سرمایه‌گذاری کنید.",
			oilGas: "نفت و گاز",
			oilGasDesc:
				"در سرمایه‌گذاری‌های بخش انرژی با بازدهی پایدار و پتانسیل رشد شرکت کنید.",
			agriculture: "کشاورزی",
			agricultureDesc:
				"از پروژه‌های کشاورزی پایدار حمایت کنید و درآمد غیرفعال ثابت کسب کنید.",
			cryptoMining: "استخراج ارز دیجیتال",
			cryptoMiningDesc:
				"به عملیات استخراج ما بپیوندید و از رشد بازار ارزهای دیجیتال بهره‌مند شوید.",

			totalInvestors: "کل سرمایه‌گذاران",
			totalInvested: "کل سرمایه‌گذاری",
			averageReturns: "میانگین بازدهی",
			successRate: "نرخ موفقیت",

			readyToStart: "آماده شروع سرمایه‌گذاری؟",
			joinToday: "امروز به هزاران سرمایه‌گذار موفق بپیوندید",
			startInvesting: "همین الان سرمایه‌گذاری را شروع کنید",

			quickLinks: "پیوندهای سریع",
			legalInfo: "اطلاعات حقوقی",
			privacyPolicy: "سیاست حریم خصوصی",
			termsOfService: "شرایط خدمات",
			riskDisclaimer: "بیانیه ریسک",
			followUs: "ما را دنبال کنید",
			allRightsReserved: "تمامی حقوق محفوظ است.",

			viewAll: "مشاهده همه",
			readMore: "بیشتر بخوانید",
			apply: "اعمال",
			cancel: "لغو",
			save: "ذخیره",
			edit: "ویرایش",
			delete: "حذف",
			confirm: "تایید",
			back: "برگشت",
			next: "بعدی",
			previous: "قبلی",
			loading: "در حال بارگذاری...",
			error: "خطا",
			success: "موفقیت",

			// About Page
			aboutTitle: "درباره TradeZeroTrading",
			aboutSubtitle: "پیشرو آینده فرصتهای سرمایهگذاری متنوع",
			ourMission: "ماموریت ما",
			ourMissionDesc:
				"دموکراتیک کردن دسترسی به فرصتهای سرمایهگذاری پریمیوم در بخشهای املاک و مستغلات، انرژی، کشاورزی و فناوری با تضمین حداکثر امنیت و شفافیت برای سرمایهگذاران ما.",
			ourVision: "چشمانداز ما",
			ourVisionDesc:
				"تبدیل شدن به معتبرترین پلتفرم سرمایهگذاری جهان و توانمندسازی افراد برای ایجاد ثروت از طریق استراتژیهای سرمایهگذاری نوآورانه و پایدار.",
			ourValues: "ارزشهای ما",
			transparency: "شفافیت",
			transparencyDesc:
				"بازبودن کامل در تمام عملیات و فرآیندهای سرمایهگذاری ما.",
			security: "امنیت",
			securityDesc:
				"تدابیر امنیتی بانکی برای حفاظت از سرمایهگذاریها و اطلاعات شخصی شما.",
			innovation: "نوآوری",
			innovationDesc:
				"فناوری پیشرفته و استراتژیهای سرمایهگذاری برای بازدهی بهینه.",
			sustainability: "پایداری",
			sustainabilityDesc: "سرمایهگذاریهای مسئول زیستمحیطی برای آیندهای بهتر.",
			companyStats: "آمار شرکت",
			foundedIn: "تاسیس در 2019",
			globalPresence: "حضور جهانی در 25+ کشور",
			teamMembers: "150+ عضو تیم متخصص",
			regulatoryCompliance: "انطباق با مقررات اتحادیه اروپا",

			// Contact Page
			contactTitle: "تماس با ما",
			contactSubtitle: "با متخصصان سرمایهگذاری ما در ارتباط باشید",
			getInTouch: "در تماس باشید",
			getInTouchDesc:
				"سوالی درباره فرصتهای سرمایهگذاری ما دارید؟ تیم متخصص ما اینجا هست تا به شما در اتخاذ تصمیمات آگاهانه کمک کند.",
			contactInfo: "اطلاعات تماس",
			address: "آدرس",
			phone: "تلفن",
			email: "ایمیل",
			businessHours: "ساعات کاری",
			mondayFriday: "دوشنبه - جمعه: 9:00 صبح - 6:00 عصر وقت مرکز اروپا",
			weekend: "آخر هفته: 10:00 صبح - 4:00 عصر وقت مرکز اروپا",
			contactForm: "پیامی برای ما بفرستید",
			firstName: "نام",
			lastName: "نام خانوادگی",
			subject: "موضوع",
			message: "پیام",
			sendMessage: "ارسال پیام",

			// Testimonials
			testimonialTitle: "نظرات سرمایهگذاران ما",
			testimonialSubtitle:
				"داستانهای واقعی از سرمایهگذاران واقعی که از طریق پلتفرم ما به موفقیت مالی رسیدهاند",
			clientTestimonial1:
				"TradeZeroTrading پرتفوی سرمایهگذاری من را متحول کرده است. بازدهیها ثابت و پلتفرم فوقالعاده کاربرپسند است. 2 سال است سرمایهگذاری میکنم و نمیتوانم خوشحالتر باشم.",
			clientTestimonial2:
				"گزینههای سرمایهگذاری متنوع و پشتیبانی حرفهای این پلتفرم را متمایز میکند. رشد پیوستهای در سرمایهگذاریهایم در تمام بخشها مشاهده کردهام.",
			clientTestimonial3:
				"خدمات مشتری عالی و فرآیندهای شفاف. سرمایهگذاریهای املاک عملکرد فوقالعادهای داشته و از انتظاراتم فراتر رفته.",

			// Form validation
			required: "این فیلد الزامی است",
			invalidEmail: "لطفاً یک آدرس ایمیل معتبر وارد کنید",
			messageSent: "پیام با موفقیت ارسال شد!",
			messageError: "ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید.",

			// Packages Page
			packagesTitle: "بستههای سرمایهگذاری",
			packagesSubtitle:
				"طرح سرمایهگذاری عالی را انتخاب کنید که با اهداف مالی و اشتها به ریسک شما مطابقت دارد",
			choosePackage: "بسته خود را انتخاب کنید",
			packageFeatures: "ویژگیهای بسته",
			minimumInvestment: "حداقل سرمایهگذاری",
			maximumInvestment: "حداکثر سرمایهگذاری",
			duration: "مدت زمان",
			roi: "بازدهی سرمایه",
			dailyReturns: "بازدهی روزانه",
			totalReturn: "بازدهی کل",
			instantWithdrawal: "برداشت فوری",
			support: "پشتیبانی 24/7",
			securePayment: "پرداخت ایمن",
			riskLevel: "سطح ریسک",
			low: "کم",
			medium: "متوسط",
			high: "زیاد",
			days: "روز",
			selectPlan: "انتخاب طرح",
			mostPopular: "محبوبترین",
			recommended: "توصیه شده",

			// Package Names
			starterPlan: "طرح مبتدی",
			starterDesc:
				"عالی برای مبتدیانی که میخواهند سفر سرمایهگذاری خود را آغاز کنند",
			basicPlan: "طرح پایه",
			basicDesc:
				"ایدهآل برای سرمایهگذارانی که به دنبال بازدهی ثابت با ریسک متعادل هستند",
			premiumPlan: "طرح پریمیوم",
			premiumDesc:
				"بسته پیشرفته برای سرمایهگذاران باتجربه که به دنبال بازدهی بالاتر هستند",
			professionalPlan: "طرح حرفهای",
			professionalDesc: "بسته نخبگان برای سرمایهگذاران جدی با سرمایه قابل توجه",
			vipPlan: "طرح VIP",
			vipDesc: "بسته انحصاری با حداکثر بازدهی و مزایای پریمیوم",

			// Dashboard Pages
			dashboardTitle: "دشبورد",
			welcomeBack: "خوش برگشتید",
			totalBalance: "موجودی کل",
			availableBalance: "موجودی قابل دسترس",
			totalEarnings: "کل درآمد",
			activeInvestments: "سرمایهگذاریهای فعال",
			pendingWithdrawals: "برداشتهای در انتظار",
			recentTransactions: "تراکنشهای اخیر",
			quickActions: "اقدامات سریع",
			viewAllTransactions: "مشاهده تمام تراکنشها",

			// Deposit Page
			depositTitle: "واریز وجه",
			depositSubtitle: "برای شروع سرمایهگذاری وجه به حساب خود اضافه کنید",
			selectPaymentMethod: "روش پرداخت را انتخاب کنید",
			depositAmount: "مبلغ واریزی",
			minimumDeposit: "حداقل واریز",
			processingFee: "کارمزد پردازش",
			totalAmount: "مبلغ کل",
			proceedToPayment: "ادامه پرداخت",
			depositHistory: "تاریخچه واریزها",

			// Withdrawal Page
			withdrawalTitle: "درخواست برداشت",
			withdrawalSubtitle: "درآمد خود را به روش پرداخت مورد نظر برداشت کنید",
			withdrawalAmount: "مبلغ برداشت",
			minimumWithdrawal: "حداقل برداشت",
			withdrawalFee: "کارمزد برداشت",
			netAmount: "مبلغ خالص",
			requestWithdrawal: "درخواست برداشت",
			withdrawalHistory: "تاریخچه برداشتها",

			// Transfer Page
			transferTitle: "انتقال وجه",
			transferSubtitle: "وجه را به حساب کاربر دیگری منتقل کنید",
			recipientEmail: "ایمیل گیرنده",
			transferAmount: "مبلغ انتقال",
			transferFee: "کارمزد انتقال",
			transferNote: "یادداشت انتقال (اختیاری)",
			sendTransfer: "ارسال انتقال",
			transferHistory: "تاریخچه انتقالات",

			// Settings Page
			accountSettings: "تنظیمات حساب",
			profileInformation: "اطلاعات پروفایل",
			securitySettings: "تنظیمات امنیتی",
			notificationSettings: "تنظیمات اعلانات",
			changePassword: "تغییر رمز عبور",
			currentPassword: "رمز عبور فعلی",
			newPassword: "رمز عبور جدید",
			confirmPassword: "تایید رمز عبور",
			updateProfile: "به‌روزرسانی پروفایل",
			twoFactorAuth: "احراز هویت دومرحله‌ای",
			emailNotifications: "اعلانات ایمیل",
			smsNotifications: "اعلانات پیامکی",

			// Chat Page
			chatTitle: "چت پشتیبانی",
			chatSubtitle: "از تیم پشتیبانی ما کمک بگیرید",
			typeMessage: "پیام خود را تایپ کنید...",
			sendMessage: "ارسال پیام",
			onlineSupport: "پشتیبانی آنلاین",
			chatHistory: "تاریخچه چت",

			// Investment Page
			myInvestments: "سرمایهگذاریهای من",
			investmentOverview: "نمای کلی سرمایهگذاریها",
			makeInvestment: "انجام سرمایهگذاری",
			investmentAmount: "مبلغ سرمایهگذاری",
			expectedReturn: "بازدهی مورد انتظار",
			maturityDate: "تاریخ سررسید",
			investmentStatus: "وضعیت سرمایهگذاری",
			active: "فعال",
			completed: "تکمیل شده",
			pending: "در انتظار",

			// Transaction Status
			approved: "تایید شده",
			rejected: "رد شده",
			processing: "در حال پردازش",
			failed: "ناموفق",

			// Common Dashboard Terms
			amount: "مبلغ",
			date: "تاریخ",
			status: "وضعیت",
			action: "عمل",
			description: "توضیح",
			reference: "مرجع",
			type: "نوع",

			// Auth Pages
			loginTitle: "خوش برگشتید",
			loginSubtitle: "برای ادامه به حساب خود وارد شوید",
			emailAddress: "آدرس ایمیل",
			password: "رمز عبور",
			rememberMe: "مرا به خاطر بسپار",
			forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
			signIn: "ورود",
			noAccount: "حساب ندارید؟",
			signUp: "ثبت‌نام",

			registerTitle: "ایجاد حساب",
			registerSubtitle: "به هزاران سرمایه‌گذار موفق بپیوندید",
			fullName: "نام کامل",
			confirmPassword: "تایید رمز عبور",
			agreeToTerms: "با شرایط خدمات و سیاست حریم خصوصی موافقم",
			createAccount: "ایجاد حساب",
			alreadyHaveAccount: "قبلاً حساب دارید؟",

			// Legal Pages
			privacyPolicyTitle: "سیاست حریم خصوصی",
			privacyPolicyContent:
				"این سیاست حریم خصوصی نحوه جمع‌آوری، استفاده و حفاظت از اطلاعات شخصی شما توسط TradeZeroTrading را توضیح می‌دهد.",

			termsOfServiceTitle: "شرایط خدمات",
			termsOfServiceContent:
				"این شرایط خدمات استفاده شما از پلتفرم و خدمات TradeZeroTrading را تنظیم می‌کند.",

			riskDisclaimerTitle: "بیانیه ریسک",
			riskDisclaimerContent:
				"سرمایه‌گذاری شامل ریسک است. عملکرد گذشته تضمینی برای نتایج آینده نیست.",

			lastUpdated: "آخرین به‌روزرسانی",
			effectiveDate: "تاریخ اجرا",

			// Contact Page Cards
			emailSupport: "پشتیبانی ایمیل",
			emailSupportDesc: "در عرض 24 ساعت از طریق ایمیل کمک دریافت کنید",
			phoneSupport: "پشتیبانی تلفنی",
			phoneSupportDesc: "مستقیماً با متخصصان ما صحبت کنید",
			liveChat: "چت زنده",
			liveChatDesc: "پشتیبانی فوری از طریق چت زنده",
			officeLocation: "موقعیت دفتر",
			officeLocationDesc: "از دفتر مرکزی ما بازدید کنید",
			availableOnPlatform: "Available on platform",
			byAppointment: "By appointment",

			// FAQ
			faqTitle: "Frequently Asked Questions",
			faqSubtitle: "Quick answers to common questions about our platform.",
			faq_q1_question: "How do I start investing?",
			faq_q1_answer:
				"Simply register for an account, complete verification, deposit funds, and choose an investment package that suits your goals.",
			faq_q2_question: "What are the minimum investment amounts?",
			faq_q2_answer:
				"Our packages start from as low as $100, making crypto investment accessible to everyone.",
			faq_q3_question: "How secure are my funds?",
			faq_q3_answer:
				"We use military-grade encryption, cold storage for crypto assets, and are fully regulated and insured.",
			faq_q4_question: "When can I withdraw my returns?",
			faq_q4_answer:
				"Returns are automatically credited to your account daily, and you can withdraw anytime after the minimum investment period.",

			// Package Benefits
			secureInsured: "ایمن و بیمه شده",
			secureInsuredDesc:
				"تمام سرمایهگذاریها توسط بیمه و پروتکلهای امنیتی پیشرفته محافظت میشوند",
			provenReturns: "بازدهی اثبات شده",
			provenReturnsDesc:
				"عملکرد ثابت پشتیبانی شده توسط الگوریتمهای معاملاتی حرفهای",
			automatedTrading: "معاملات خودکار",
			automatedTradingDesc:
				"معاملات خودکار 24/7 تضمین میکند که هیچ فرصت بازاری را از دست ندهید",
			expertManagement: "مدیریت متخصص",
			expertManagementDesc:
				"توسط متخصصان باتجربه ارز دیجیتال و مالی مدیریت میشود",

			// Platform Features
			dailyProfitDistribution: "توزیع سود روزانه",
			realtimePortfolioTracking: "ردیابی پرتفوی در زمان واقعی",
			multiCurrencySupport: "پشتیبانی چند ارزی",
			customerSupport247: "پشتیبانی مشتری 24/7",
			mobileAppAccess: "دسترسی به اپلیکیشن موبایل",
			advancedAnalytics: "تحلیلهای پیشرفته",
			riskManagementTools: "ابزارهای مدیریت ریسک",
		},
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		debug: false,

		interpolation: {
			escapeValue: false,
		},

		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
		},
	});

export default i18n;
