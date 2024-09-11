import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SignupFormState {
	email: string;
	password: string;
}

const Signup: React.FC = () => {
	const [formData, setFormData] = useState<SignupFormState>({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(null);

		try {
			const response = await fetch(
				"https://intern-task-api.bravo68web.workers.dev/auth/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: formData.email,
						password: formData.password,
					}),
				}
			);

			const result = await response.json();

			if (response.ok) {
				setSuccess("Signup successful!");
				navigate("/login");
			} else {
				setError(result.message || "Something went wrong. Please try again.");
			}
		} catch (err) {
			setError("Failed to sign up. Please check your network connection.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
				<h2 className="text-2xl font-bold text-center mb-6 ml-5">Sign Up</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							onChange={handleChange}
							className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={formData.password}
							onChange={handleChange}
							className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							required
						/>
					</div>

					<div>
						<button
							type="submit"
							className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
							disabled={loading}
						>
							{loading ? "Signing Up..." : "Sign Up"}
						</button>
					</div>

					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
					{success && <p className="text-green-500 text-sm mt-2">{success}</p>}
				</form>

				<div className="text-center mt-4">
					<p className="text-gray-600">
						Already have an account?{" "}
						<Link to="/login" className="text-indigo-600 hover:underline">
							Log in here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
