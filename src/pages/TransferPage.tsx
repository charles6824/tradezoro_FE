import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight, Search, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
	useSearchUserByWalletIdQuery,
	useTransferFundsMutation,
} from "@/store/transferApi";
import { useGetUserProfileQuery } from "@/store/userApi";

const TransferPage = () => {
	const { user } = useAuth();
	const { toast } = useToast();
	const { data: userProfileData } = useGetUserProfileQuery();
	const currentUser = userProfileData?.data || user;
	const [recipientWalletId, setRecipientWalletId] = useState("");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [searchWalletId, setSearchWalletId] = useState("");
	const [transferFunds, { isLoading: transferLoading }] =
		useTransferFundsMutation();
	const [loading, setLoading] = useState(false);

	const {
		data: recipientData,
		error: searchError,
		isLoading: searching,
	} = useSearchUserByWalletIdQuery(searchWalletId, { skip: !searchWalletId });

	useEffect(() => {
		if (recipientWalletId.trim()) {
			setSearchWalletId(recipientWalletId);
		} else {
			setSearchWalletId("");
		}
	}, [recipientWalletId]);

	const handleTransfer = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!recipientData?.data || !amount) {
			toast({
				title: "Incomplete Information",
				description: "Please complete all fields",
				variant: "destructive",
			});
			return;
		}

		if (parseFloat(amount) > (currentUser?.balance || 0)) {
			toast({
				title: "Insufficient Balance",
				description: "You don't have enough funds for this transfer",
				variant: "destructive",
			});
			return;
		}

		try {
			await transferFunds({
				recipientWalletId,
				amount: parseFloat(amount),
				description,
			}).unwrap();

			toast({
				title: "Transfer Successful!",
				description: `$${amount} sent to ${recipientData.data.name}`,
			});

			// Reset form
			setRecipientWalletId("");
			setAmount("");
			setDescription("");
			setSearchWalletId("");
		} catch (error: any) {
			toast({
				title: "Transfer Failed",
				description: error.data?.message || "Failed to complete transfer",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="space-y-6">
			TradeZero TradeZero TradeZero TradeZero
			<div className="flex items-center gap-3">
				<ArrowLeftRight className="w-8 h-8 text-primary" />
				<div>
					<h1 className="text-3xl font-bold text-foreground">Transfer Funds</h1>
					<p className="text-muted-foreground">
						Send money to other TradeZeroTrading users
					</p>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Transfer Form */}
				<Card>
					<CardHeader>
						<CardTitle>Send Money</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleTransfer} className="space-y-4">
							{/* Recipient Search */}
							<div className="space-y-2">
								<Label htmlFor="walletId">Recipient Wallet ID</Label>
								<Input
									id="walletId"
									placeholder="Enter wallet ID (e.g., MCT123456789)"
									value={recipientWalletId}
									onChange={(e) => setRecipientWalletId(e.target.value)}
								/>
							</div>

							{/* Recipient Info */}
							{recipientData?.data && (
								<div className="p-3 bg-green-50 border border-green-200 rounded-lg">
									<div className="flex items-center gap-2">
										<User className="w-4 h-4 text-green-600" />
										<span className="font-medium text-green-800">
											{recipientData.data.name}
										</span>
									</div>
									<p className="text-sm text-green-600">
										Wallet ID: {recipientData.data.walletId}
									</p>
								</div>
							)}

							{searchError && (
								<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
									<div className="flex items-center gap-2">
										<AlertCircle className="w-4 h-4 text-red-600" />
										<span className="text-red-800">User not found</span>
									</div>
								</div>
							)}

							{/* Amount */}
							<div className="space-y-2">
								<Label htmlFor="amount">Amount ($)</Label>
								<Input
									id="amount"
									type="number"
									step="0.01"
									min="1"
									max={Math.max(currentUser?.balance || 0, 1)}
									placeholder="Enter amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
								<p className="text-sm text-muted-foreground">
									Available balance: $
									{currentUser?.balance?.toLocaleString() || "0.00"}
								</p>
							</div>

							{/* Description */}
							<div className="space-y-2">
								<Label htmlFor="description">Description (Optional)</Label>
								<Input
									id="description"
									placeholder="What's this transfer for?"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={transferLoading || !recipientData?.data || !amount}
							>
								{transferLoading ? "Processing..." : `Send $${amount || "0"}`}
							</Button>
						</form>
					</CardContent>
				</Card>

				{/* Transfer Info */}
				<Card>
					<CardHeader>
						<CardTitle>Transfer Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
							<div className="flex items-center gap-2 mb-2">
								<AlertCircle className="w-4 h-4 text-blue-600" />
								<h4 className="font-medium text-blue-800">Important Notes</h4>
							</div>
							<ul className="text-sm text-blue-700 space-y-1">
								<li>• Transfers are instant and cannot be reversed</li>
								<li>• Verify recipient wallet ID before sending</li>
								<li>• Minimum transfer amount is $1</li>
								<li>• No fees for internal transfers</li>
							</ul>
						</div>

						<div className="space-y-3">
							<h4 className="font-medium">Your Wallet Information</h4>
							<div className="p-3 bg-muted/50 rounded-lg">
								<p className="text-sm text-muted-foreground">Your Wallet ID</p>
								<p className="font-mono font-medium">{currentUser?.walletId}</p>
							</div>
							<div className="p-3 bg-muted/50 rounded-lg">
								<p className="text-sm text-muted-foreground">
									Available Balance
								</p>
								<p className="text-lg font-semibold text-green-600">
									${currentUser?.balance?.toLocaleString() || "0.00"}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default TransferPage;
