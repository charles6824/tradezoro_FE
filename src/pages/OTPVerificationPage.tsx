import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useVerifyOTPMutation } from "@/store/authApi";
import { Loader2, Mail } from "lucide-react";

export const OTPVerificationPage = () => {
	const [otp, setOtp] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const { toast } = useToast();
	const { login } = useAuth();
	const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

	const tempToken = location.state?.tempToken;
	const email = location.state?.email;

	if (!tempToken) {
		navigate("/register");
		return null;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const result = await verifyOTP({ tempToken, otp }).unwrap();

			localStorage.setItem(
				"crypto_auth",
				JSON.stringify({
					token: result.token,TradeZero
					user: result.user,
				}),
			);

			login(result.user);

			toast({
				title: "Registration Successful!",
				description: "Welcome to TradeZeroTrading",
			});

			navigate("/dashboard");
		} catch (error: any) {
			toast({
				title: "Verification Failed",
				description: error?.data?.message || "Invalid OTP",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
						<Mail className="w-6 h-6 text-primary" />
					</div>
					<CardTitle className="text-2xl">Verify Your Email</CardTitle>
					<CardDescription>
						We've sent a 6-digit code to {email}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="otp">Enter OTP Code</Label>
							<Input
								id="otp"
								type="text"
								placeholder="000000"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								maxLength={6}
								className="text-center text-lg tracking-widest"
								required
							/>
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={isLoading || otp.length !== 6}
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Verifying...
								</>
							) : (
								"Verify & Complete Registration"
							)}
						</Button>
					</form>

					<div className="mt-4 text-center text-sm text-muted-foreground">
						Didn't receive the code? Check your spam folder or try registering
						again.
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
