import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../components/router";

const AppRouter = () => {
	const isAuth = true;

	return (

		<Routes>
			{isAuth ? (
				privateRoutes.map((route) => (
					<Route
						path={route.path}
						element={<route.component />}
						key={route.path}
					/>
				))
			) : (
				publicRoutes.map((route) => (
					<Route
						path={route.path}
						element={<route.component />}
						key={route.path}
					/>
				))
			)}
		</Routes>

	);
}

export default AppRouter;
