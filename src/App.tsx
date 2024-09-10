import { createBrowserRouter, Outlet } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Dashboard from "./Component/Dashboard";

function App() {
	return (
		<>
			<Dashboard />
		</>
	);
}

export const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);
export default App;
