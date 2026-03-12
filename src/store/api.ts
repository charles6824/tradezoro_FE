import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: `${
		import.meta.env.VITE_API_URL ?? "https://tradezero-be.onrender.com"
	}/api`,
	prepareHeaders: (headers, { getState }) => {
		const token = localStorage.getItem("crypto_auth");
		if (token && token !== "null") {
			try {
				const authData = JSON.parse(token);
				if (authData && authData.token) {
					headers.set("Authorization", `Bearer ${authData.token}`);
				}
			} catch (error) {
				if (token !== "null") {
					headers.set("Authorization", `Bearer ${token}`);
				}
			}
		}
		return headers;
	},
});

export const api = createApi({
	reducerPath: "api",
	baseQuery,
	tagTypes: ["User", "Package", "Investment", "Transaction", "Admin", "Referrals", "ReferralsAdmin"],
	keepUnusedDataFor: 300, // Keep data for 5 minutes
	refetchOnMountOrArgChange: 60, // Only refetch if data is older than 1 minute
	refetchOnFocus: false, // Disable refetch on window focus
	refetchOnReconnect: false, // Disable refetch on reconnect
	endpoints: () => ({}),
});

export default api;
