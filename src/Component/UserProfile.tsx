import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
	email: string;
}

const Navbar: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const handleLogout = async () => {
		navigate("/signup");
		localStorage.setItem("authToken", "");
	};
	const fetchUserData = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			setError("No token found, please log in.");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(
				"https://intern-task-api.bravo68web.workers.dev/api/me",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const result = await response.json();

			if (response.ok) {
				const email = result.user.sub;
				setUser({ email });
			} else {
				setError(result.message || "Failed to fetch user data.");
			}
		} catch (err) {
			setError("An error occurred while fetching user data.");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<nav className="flex justify-between p-4">
			<div className="container mx-auto text-center text-lg text-gray-900">
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p className="text-red-500">{error}</p>
				) : (
					user && <p className="text-2xl">Logged in as {user.email}</p>
				)}
			</div>
			<button
				onClick={() => handleLogout()}
				className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
			>
				Logout
			</button>
		</nav>
	);
};

export default Navbar;
