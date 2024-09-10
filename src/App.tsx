import { createBrowserRouter } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Dashboard from "./Component/Dashboard";

function App() {
	return <></>;
}

export const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
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
