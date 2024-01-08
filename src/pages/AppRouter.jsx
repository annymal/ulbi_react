// import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
// import { AuthContext } from "../components/context";
import { privateRoutes, publicRoutes } from "../components/router";
import Login from "./Login";

const AppRouter = () => {
	const isAuth = false
	// const { isAuth, setIsAuth } = useContext(AuthContext)
	console.log(isAuth);
	console.log(publicRoutes.element)

	return (
		<Routes>
			{isAuth &&
				privateRoutes.map((route, index) =>
					<Route key={index} path={route.path} element={<route.element />} />
				)
			}
			<Route path={publicRoutes.path} element={<Login />} />
		</Routes>
	)
}

export default AppRouter;
