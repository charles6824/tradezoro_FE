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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChangePasswordModal } from "@/components/ui/change-password-modal";
import { useToast } from "@/hooks/use-toast";
import { useChangePasswordMutation } from "@/store/authApi";
import {
	Settings,
	Shield,
	Bell,
	Mail,
	Database,
	Globe,
	Lock,
	Save,
} from "lucide-react";

export const AdminSettingsPage = () => {
	const { toast } = useToast();
	const [changePassword, { isLoading: changePasswordLoading }] =
		useChangePasswordMutation();
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [settings, setSettings] = useState({
		// Platform Settings
		platformName: "TradeZero Trading",
		platformDescription: "Advanced cryptocurrency investment platform",
		maintenanceMode: false,
		allowRegistrations: true,

		// Security Settings
		requireEmailVerification: true,
		enforceStrongPasswords: true,
		enableTwoFactor: false,
		sessionTimeout: "24",

		// Investment Settings
		minDepositAmount: "100",
		maxDepositAmount: "50000",
		withdrawalProcessingTime: "24",
		autoApproveWithdrawals: false,

		// Notification Settings
		emailNotifications: true,
		smsNotifications: false,
		webhookUrl: "",

		// System Settings
		defaultCurrency: "USD",
		timezone: "UTC",
		backupFrequency: "daily",
	});

	const handleSaveSettings = () => {
		// Save settings to localStorage
		localStorage.setItem("admin_settings", JSON.stringify(settings));

		toast({
			title: "Settings Saved",
			description: "All platform settings have been updated successfully.",
		});
	};

	const handleSettingChange = (key: string, value: any) => {
		setSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleChangePassword = async (data: {
		currentPassword: string;
		newPassword: string;
	}) => {
		try {
			await changePassword(data).unwrap();
			toast({
				title: "Password Changed",
				description: "Your admin password has been successfully updated.",
			});
			setShowPasswordModal(false);
		} catch (error: any) {
			toast({
				title: "Password Change Failed",
				description: error.data?.message || "Failed to change password",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="space-y-6 animate-fade-in">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-foreground">
					Platform Settings
				</h1>
				<Button onClick={handleSaveSettings}>
					<Save className="w-4 h-4 mr-2" />
					Save All Settings
				</Button>
			</div>

			<div className="grid gap-6">
				{/* Platform Configuration */}
				<Card className="bg-card/50 backdrop-blur">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Globe className="w-5 h-5" />
							Platform Configuration
						</CardTitle>
						<CardDescription>
							Basic platform settings and configuration
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="platformName">Platform Name</Label>
								<Input
									id="platformName"
									value={settings.platformName}
									onChange={(e) =>
										handleSettingChange("platformName", e.target.value)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="defaultCurrency">Default Currency</Label>
								<Select
									value={settings.defaultCurrency}
									onValueChange={(value) =>
										handleSettingChange("defaultCurrency", value)
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="USD">USD - US Dollar</SelectItem>
										<SelectItem value="EUR">EUR - Euro</SelectItem>
										<SelectItem value="GBP">GBP - British Pound</SelectItem>
										<SelectItem value="BTC">BTC - Bitcoin</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="platformDescription">Platform Description</Label>
							<Textarea
								id="platformDescription"
								value={settings.platformDescription}
								onChange={(e) =>
									handleSettingChange("platformDescription", e.target.value)
								}
								rows={3}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Maintenance Mode</Label>
								<p className="text-sm text-muted-foreground">
									Enable to temporarily disable user access
								</p>
							</div>
							<Switch
								checked={settings.maintenanceMode}
								onCheckedChange={(checked) =>
									handleSettingChange("maintenanceMode", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Allow New Registrations</Label>
								<p className="text-sm text-muted-foreground">
									Allow new users to register on the platform
								</p>
							</div>
							<Switch
								checked={settings.allowRegistrations}
								onCheckedChange={(checked) =>
									handleSettingChange("allowRegistrations", checked)
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Security Settings */}
				<Card className="bg-card/50 backdrop-blur">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Shield className="w-5 h-5" />
							Security Settings
						</CardTitle>
						<CardDescription>
							Configure platform security and authentication
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
							<div className="space-y-0.5">
								<Label>Change Admin Password</Label>
								<p className="text-sm text-muted-foreground">
									Update your admin account password
								</p>
							</div>
							<Button onClick={() => setShowPasswordModal(true)}>
								Change Password
							</Button>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Require Email Verification</Label>
								<p className="text-sm text-muted-foreground">
									Users must verify their email before accessing features
								</p>
							</div>
							<Switch
								checked={settings.requireEmailVerification}
								onCheckedChange={(checked) =>
									handleSettingChange("requireEmailVerification", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Enforce Strong Passwords</Label>
								<p className="text-sm text-muted-foreground">
									Require passwords with special characters and numbers
								</p>
							</div>
							<Switch
								checked={settings.enforceStrongPasswords}
								onCheckedChange={(checked) =>
									handleSettingChange("enforceStrongPasswords", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Two-Factor Authentication</Label>
								<p className="text-sm text-muted-foreground">
									Enable 2FA for enhanced security
								</p>
							</div>
							<Switch
								checked={settings.enableTwoFactor}
								onCheckedChange={(checked) =>
									handleSettingChange("enableTwoFactor", checked)
								}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
							<Input
								id="sessionTimeout"
								type="number"
								value={settings.sessionTimeout}
								onChange={(e) =>
									handleSettingChange("sessionTimeout", e.target.value)
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Investment Settings */}
				<Card className="bg-card/50 backdrop-blur">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Database className="w-5 h-5" />
							Investment Settings
						</CardTitle>
						<CardDescription>
							Configure investment limits and processing
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="minDeposit">Minimum Deposit Amount ($)</Label>
								<Input
									id="minDeposit"
									type="number"
									value={settings.minDepositAmount}
									onChange={(e) =>
										handleSettingChange("minDepositAmount", e.target.value)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="maxDeposit">Maximum Deposit Amount ($)</Label>
								<Input
									id="maxDeposit"
									type="number"
									value={settings.maxDepositAmount}
									onChange={(e) =>
										handleSettingChange("maxDepositAmount", e.target.value)
									}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="withdrawalTime">
								Withdrawal Processing Time (hours)
							</Label>
							<Input
								id="withdrawalTime"
								type="number"
								value={settings.withdrawalProcessingTime}
								onChange={(e) =>
									handleSettingChange(
										"withdrawalProcessingTime",
										e.target.value,
									)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Auto-Approve Withdrawals</Label>
								<p className="text-sm text-muted-foreground">
									Automatically approve withdrawal requests
								</p>
							</div>
							<Switch
								checked={settings.autoApproveWithdrawals}
								onCheckedChange={(checked) =>
									handleSettingChange("autoApproveWithdrawals", checked)
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Notification Settings */}
				<Card className="bg-card/50 backdrop-blur">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Bell className="w-5 h-5" />
							Notification Settings
						</CardTitle>
						<CardDescription>
							Configure platform notifications and alerts
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Email Notifications</Label>
								<p className="text-sm text-muted-foreground">
									Send email notifications to users
								</p>
							</div>
							<Switch
								checked={settings.emailNotifications}
								onCheckedChange={(checked) =>
									handleSettingChange("emailNotifications", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>SMS Notifications</Label>
								<p className="text-sm text-muted-foreground">
									Send SMS notifications to users
								</p>
							</div>
							<Switch
								checked={settings.smsNotifications}
								onCheckedChange={(checked) =>
									handleSettingChange("smsNotifications", checked)
								}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="webhookUrl">Webhook URL</Label>
							<Input
								id="webhookUrl"
								placeholder="https://your-webhook-url.com"
								value={settings.webhookUrl}
								onChange={(e) =>
									handleSettingChange("webhookUrl", e.target.value)
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* System Settings */}
				<Card className="bg-card/50 backdrop-blur">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Lock className="w-5 h-5" />
							System Settings
						</CardTitle>
						<CardDescription>
							System configuration and maintenance
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="timezone">System Timezone</Label>
								<Select
									value={settings.timezone}
									onValueChange={(value) =>
										handleSettingChange("timezone", value)
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="UTC">UTC</SelectItem>
										<SelectItem value="EST">Eastern Time</SelectItem>
										<SelectItem value="PST">Pacific Time</SelectItem>
										<SelectItem value="GMT">Greenwich Mean Time</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="backupFreq">Backup Frequency</Label>
								<Select
									value={settings.backupFrequency}
									onValueChange={(value) =>
										handleSettingChange("backupFrequency", value)
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="hourly">Every Hour</SelectItem>
										<SelectItem value="daily">Daily</SelectItem>
										<SelectItem value="weekly">Weekly</SelectItem>
										<SelectItem value="monthly">Monthly</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<ChangePasswordModal
				isOpen={showPasswordModal}
				onClose={() => setShowPasswordModal(false)}
				onSubmit={handleChangePassword}
				isLoading={changePasswordLoading}
			/>
		</div>
	);
};
