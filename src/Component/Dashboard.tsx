import UserProfile from "./UserProfile";
import ProductsPage from "./ProductsPage";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("authToken");
	useEffect(() => {
		if (!token) {
			navigate("/signup");
		}
	}, [token]);
	return (
		<>
			<UserProfile />
			<ProductsPage />
		</>
	);
};

export default Dashboard;
