import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useGetTransactionsQuery } from "@/store/transactionsApi";
import { useGetUserProfileQuery } from "@/store/userApi";
import { useGetInvestmentsQuery } from "@/store/investmentsApi";
import { Wallet, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

export const WithdrawalPage = () => {
	const { toast } = useToast();
	const { user } = useAuth();
	const { data: userProfileData } = useGetUserProfileQuery();
	const currentUser = userProfileData?.data || user;
	const { data: transactionsData } = useGetTransactionsQuery({
		type: "withdrawal",
		limit: 10,
	});
	const { data: investmentsData } = useGetInvestmentsQuery();
	const [withdrawalAmount, setWithdrawalAmount] = useState("");
	const [withdrawalMethod, setWithdrawalMethod] = useState("");
	const [withdrawalAddress, setWithdrawalAddress] = useState("");

	const minWithdrawal = 100;
	const maxWithdrawal = currentUser?.balance || 0;
	const processingFee = 10;
	const recentWithdrawals = transactionsData?.data || [];

	// Available withdrawal methods based on user's saved addresses
	const availableMethods = [];
	if (currentUser?.withdrawalAddresses?.tether)
		availableMethods.push({
			value: "tether",
			label: "Tether (USDT)",
			address: currentUser.withdrawalAddresses.tether,
		});
	if (currentUser?.withdrawalAddresses?.solana)
		availableMethods.push({
			value: "solana",
			label: "Solana (SOL)",
			address: currentUser.withdrawalAddresses.solana,
		});
	if (currentUser?.withdrawalAddresses?.trx)
		availableMethods.push({
			value: "trx",
			label: "Tron (TRX)",
			address: currentUser.withdrawalAddresses.trx,
		});

	// Auto-fill address when method is selected
	useEffect(() => {
		if (withdrawalMethod) {
			const method = availableMethods.find((m) => m.value === withdrawalMethod);
			if (method) {
				setWithdrawalAddress(method.address);
			}
		}
	}, [withdrawalMethod]);

	const handleWithdrawal = async () => {
		const amount = parseFloat(withdrawalAmount);

		// Check if user has made any investments
		const hasInvestments =
			investmentsData?.data && investmentsData.data.length > 0;
		if (!hasInvestments) {
			toast({
				title: "Investment Required",
				description:
					"You must make at least one investment before requesting a withdrawal. This helps prevent money laundering.",
				variant: "destructive",
			});
			return;
		}

		if (!amount || amount < minWithdrawal) {
			toast({
				title: "Invalid Amount",
				description: `Minimum withdrawal amount is $${minWithdrawal}`,
				variant: "destructive",
			});
			return;
		}

		if (amount > maxWithdrawal) {
			toast({
				title: "Insufficient Balance",
				description: `You can only withdraw up to $${maxWithdrawal.toLocaleString()}`,
				variant: "destructive",
			});
			return;
		}

		if (!withdrawalMethod) {
			toast({
				title: "Select Withdrawal Method",
				description: "Please select a withdrawal method",
				variant: "destructive",
			});
			return;
		}

		try {
			const storedAuth = localStorage.getItem("crypto_auth");
			let authToken = "";
			if (storedAuth) {
				try {
					const parsed = JSON.parse(storedAuth);
					authToken = parsed?.token || "";
				} catch (err) {
					authToken = storedAuth;
				}
			}

			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			};
			if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

			const response = await fetch(
				`${import.meta.env.VITE_API_URL ?? "https://TradeZero-backend.onrender.com"}/api/transactions/withdrawal`,
				{
					method: "POST",
					headers,
					body: JSON.stringify({
						amount,
						method: withdrawalMethod,
						address: withdrawalAddress,
					}),
				},
			);

			if (response.ok) {
				toast({
					title: "Withdrawal Requested",
					description: `Your withdrawal of $${amount} has been submitted for approval.`,
				});
				setWithdrawalAmount("");
				setWithdrawalMethod("");
				setWithdrawalAddress("");
			} else {
				const error = await response.json();
				toast({
					title: "Withdrawal Failed",
					description: error.message,
					variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to submit withdrawal request",
				variant: "destructive",
			});
		}
	};

	const netAmount = withdrawalAmount
		? parseFloat(withdrawalAmount) - processingFee
		: 0;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-foreground">Withdraw Funds</h1>
				<div className="flex gap-2">
					<Badge variant="outline">
						Available: ${currentUser?.balance?.toLocaleString() || "0"}
					</Badge>
					<Badge variant="outline">Min: ${minWithdrawal}</Badge>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Withdrawal Form */}
				<Card className="bg-card/50 backdrop-blur">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Wallet className="w-5 h-5" />
							Request Withdrawal
						</CardTitle>
						<CardDescription>
							Withdraw your earnings to your preferred payment method
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label htmlFor="amount">Withdrawal Amount ($)</Label>
							<Input
								id="amount"
								type="number"
								placeholder={`Min $${minWithdrawal} - Max $${maxWithdrawal}`}
								value={withdrawalAmount}
								onChange={(e) => setWithdrawalAmount(e.target.value)}
								className="text-lg"
							/>
							{withdrawalAmount &&
								parseFloat(withdrawalAmount) >= minWithdrawal &&
								parseFloat(withdrawalAmount) <= maxWithdrawal && (
									<p className="text-sm text-green-500 mt-1">
										✓ Valid withdrawal amount
									</p>
								)}
						</div>

						<div>
							<Label htmlFor="method">Withdrawal Method</Label>
							{availableMethods.length > 0 ? (
								<Select
									value={withdrawalMethod}
									onValueChange={setWithdrawalMethod}
								>
									<SelectTrigger>
										<SelectValue placeholder="Choose withdrawal method" />
									</SelectTrigger>
									<SelectContent>
										{availableMethods.map((method) => (
											<SelectItem key={method.value} value={method.value}>
												<div className="flex items-center gap-2">
													<Wallet className="w-4 h-4" />
													{method.label}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							) : (
								<div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
									<p className="text-sm text-yellow-800">
										No withdrawal methods configured. Please add withdrawal
										addresses in Settings first.
									</p>
								</div>
							)}
						</div>

						{withdrawalMethod && withdrawalAddress && (
							<div>
								<Label>Withdrawal Address</Label>
								<Input
									value={withdrawalAddress}
									readOnly
									className="bg-muted/50"
								/>
								<p className="text-sm text-muted-foreground mt-1">
									This address is from your saved withdrawal methods in
									Settings.
								</p>
							</div>
						)}

						{withdrawalAmount &&
							parseFloat(withdrawalAmount) >= minWithdrawal && (
								<div className="p-4 bg-muted/20 rounded-lg border">
									<h4 className="font-medium mb-2">Withdrawal Summary</h4>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span>Withdrawal Amount:</span>
											<span>
												${parseFloat(withdrawalAmount).toLocaleString()}
											</span>
										</div>
										<div className="flex justify-between text-muted-foreground">
											<span>Processing Fee:</span>
											<span>-${processingFee}</span>
										</div>
										<hr className="border-muted" />
										<div className="flex justify-between font-medium">
											<span>You'll Receive:</span>
											<span className="text-primary">
												${netAmount.toLocaleString()}
											</span>
										</div>
									</div>
								</div>
							)}

						<div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
							<div className="flex items-start gap-2">
								<AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
								<div className="text-sm">
									<p className="font-medium text-yellow-700 dark:text-yellow-400">
										Important Notice:
									</p>
									<ul className="text-muted-foreground mt-1 space-y-1">
										<li>
											• You must have at least one active investment to withdraw
										</li>
										<li>• All withdrawals require admin approval</li>
										<li>• Processing time: 24-48 hours</li>
										<li>• Minimum withdrawal: ${minWithdrawal}</li>
										<li>• Processing fee: ${processingFee} per transaction</li>
									</ul>
								</div>
							</div>
						</div>

						<Button
							className="w-full"
							size="lg"
							onClick={handleWithdrawal}
							disabled={
								!withdrawalAmount ||
								parseFloat(withdrawalAmount) < minWithdrawal ||
								parseFloat(withdrawalAmount) > maxWithdrawal ||
								!withdrawalMethod ||
								availableMethods.length === 0
							}
						>
							Request Withdrawal
						</Button>
					</CardContent>
				</Card>

				{/* Recent Withdrawals */}
				<Card className="bg-card/50 backdrop-blur">
					<CardHeader>
						<CardTitle>Withdrawal History</CardTitle>
						<CardDescription>Your recent withdrawal requests</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentWithdrawals.length > 0 ? (
								recentWithdrawals.map((withdrawal) => (
									<div
										key={withdrawal._id}
										className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
									>
										<div className="flex items-center gap-3">
											<Wallet className="w-4 h-4 text-primary" />
											<div>
												<p className="font-medium">
													${withdrawal.amount.toLocaleString()}
												</p>
												<p className="text-sm text-muted-foreground capitalize">
													{withdrawal.method}
												</p>
											</div>
										</div>
										<div className="text-right">
											<div className="flex items-center gap-1">
												{withdrawal.status === "pending" && (
													<Clock className="w-3 h-3 text-yellow-500" />
												)}
												{withdrawal.status === "approved" && (
													<CheckCircle2 className="w-3 h-3 text-green-500" />
												)}
												{withdrawal.status === "rejected" && (
													<AlertTriangle className="w-3 h-3 text-red-500" />
												)}
												<Badge
													variant={
														withdrawal.status === "approved"
															? "default"
															: withdrawal.status === "pending"
																? "secondary"
																: "destructive"
													}
												>
													{withdrawal.status}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground mt-1">
												{new Date(withdrawal.createdAt).toLocaleDateString()}
											</p>
										</div>
									</div>
								))
							) : (
								<div className="text-center py-8 text-muted-foreground">
									<Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
									<p>No withdrawal history yet</p>
									<p className="text-sm">
										Your withdrawal requests will appear here
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
