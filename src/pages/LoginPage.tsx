import { LanguageSelector } from "@/components/LanguageSelector";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLoginMutation } from "@/store/authApi";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { t } = useTranslation();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [showPassword, setShowPassword] = useState(false);

	const { login } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();
	const location = useLocation();
	const [loginMutation, { isLoading }] = useLoginMutation();

	const from = location.state?.from?.pathname || "/dashboard";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const result = await loginMutation({
				email: formData.email,
				password: formData.password,
			}).unwrap();

			login(result.user, result.token);

			toast({
				title: "Welcome back!",
				description: `Successfully logged in as ${result.user.firstName} ${result.user.lastName}`,
			});

			// Small delay to ensure auth state is updated
			setTimeout(() => {
				const redirectPath = result.user.role === "admin" ? "/admin" : from;
				navigate(redirectPath, { replace: true });
			}, 100);
		} catch (error: any) {
			toast({
				title: "Login failed",
				description: error.data?.message || "Invalid email or password",
				variant: "destructive",
			});
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<div className="dark bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
			<div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
				<div className="layout-container flex h-full grow flex-col">
					<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 py-4 lg:px-40">
						<div className="flex items-center gap-3">
							<h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight cursor-pointer" onClick={() => navigate("/")}>
								TradeZero
							</h2>
              <div className="">
							<LanguageSelector />
						</div>
						</div>
						<div className="flex items-center gap-4">
							<span
								className="hidden sm:inline text-sm text-slate-500 dark:text-primary/60"
								onClick={() => navigate("/")}
							>
								{t("New to TradeZero?")}
							</span>
							<Link
								to="/register"
								className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-bold"
							>
								<span>{t("Register")}</span>
							</Link>
						</div>
					</header>
					<main className="flex-1 flex items-center justify-center p-6">
						<div className="w-full max-w-[480px] space-y-8">
							<div className="rounded-xl overflow-hidden aspect-[21/9] bg-primary/5 border border-primary/10 relative">
								<div
									className="absolute inset-0 bg-cover bg-center opacity-40"
									style={{
										backgroundImage:
											"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU1wwpKCKOSlMBOzTgTV7UTVXo6931TYSN2DOT7r7lVZdRw7aGrGv5Gv-Jt1xSP66MrtLN_WHE8__3NLwG-3JVue4An9X-bHztPbkgfLimeytgm5s3m6Jjoc3p6flsXxWQVHdEHV41fPPFhsL2-802cNYlj1WEc6u50K9HTlolFMZsMs85SED7iFv0etU0x3o7mq_9pb8QZa-uDkIDNXnCFRDT-y4GucRK506EOHXKq6FyGm8wt8GoTq2-TTIrgNfIK3hpAOXtRzc')",
									}}
								></div>
								<div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
							</div>
							<div className="space-y-2">
								<h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
									{t("Sign in")}
								</h1>
								<p className="text-slate-500 dark:text-primary/60 text-lg">
									{t("Access your secure trading terminal")}
								</p>
							</div>
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="space-y-2">
									<label className="block text-slate-700 dark:text-slate-200 text-sm font-semibold ml-1">
										{t("Email Address")}
									</label>
									<div className="relative group">
										<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
											<span className="material-symbols-outlined text-primary/50 group-focus-within:text-primary">
												mail
											</span>
										</div>
										<input
											className="block w-full pl-11 pr-4 h-14 bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-primary/30 transition-all"
                      placeholder="name@company.com"
                      name="email"
											type="email"
											value={formData.email}
											onChange={handleInputChange}
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex justify-between items-center ml-1">
										<label className="block text-slate-700 dark:text-slate-200 text-sm font-semibold">
											{t("Password")}
										</label>
										<Link
											className="text-sm font-bold text-primary hover:underline"
											to="/forgot-password"
										>
											{t("Forgot password?")}
										</Link>
									</div>
									<div className="relative group">
										<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
											<span className="material-symbols-outlined text-primary/50 group-focus-within:text-primary">
												lock
											</span>
										</div>
										<input
											className="block w-full pl-11 pr-12 h-14 bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-primary/30 transition-all"
                      placeholder="••••••••"
                      name="password"
											type={showPassword ? "text" : "password"}
											value={formData.password}
											onChange={handleInputChange}
											required
										/>
										<button
											className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/50 hover:text-primary"
											type="button"
											onClick={() => setShowPassword((v) => !v)}
										>
											<span className="material-symbols-outlined">
												visibility
											</span>
										</button>
									</div>
								</div>
								<div className="flex justify-between items-center ml-1">
									<div className="flex items-center space-x-2">
										<input
											className="w-4 h-4 rounded border-slate-300 dark:border-primary/40 text-primary focus:ring-primary bg-transparent"
											id="remember"
											type="checkbox"
										/>
										<label
											className="text-sm text-slate-600 dark:text-slate-400"
											htmlFor="remember"
										>
											{t("Keep me logged in")}
										</label>
									</div>
									<Link
										className="text-sm font-bold text-primary hover:underline"
										to="/register"
									>
										{t("Create an account")}
									</Link>
								</div>
								<button
									className="w-full flex items-center justify-center gap-2 h-14 bg-primary text-background-dark font-black text-lg rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
									type="submit"
									disabled={isLoading}
								>
									<span>{isLoading ? t("Signing in...") : t("Sign In")}</span>
									<span className="material-symbols-outlined">
										arrow_forward
									</span>
								</button>
							</form>
							<div className="pt-6 border-t border-slate-200 dark:border-primary/10 text-center">
								<p className="text-slate-500 dark:text-primary/40 text-sm">
									{t("Protected by industry-leading 256-bit encryption.")} <br />
									{t("TradeZero is a registered broker-dealer.")}
								</p>
							</div>
						</div>
					</main>
					<footer className="p-6 text-center text-slate-400 dark:text-primary/30 text-xs">
						{t("© 2024 TradeZero Inc. All rights reserved. Member FINRA/SIPC.")}
					</footer>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
