ошибки:

- роутинг: сверху BrowserRouter, иначе не сработало

- router push - cтарая версия, в новой просто router(path)

- В AppRouter не сработал такой код (он тупо не видел компонента privateRoutes)
					{privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />

                    Причины: Обновление реакта, работает следующее:

                    <Routes>
			    {privateRoutes.map((route, index) => {
				return (
					<Route key={index} path={route.path} element={<route.element />} />
				)
			})
			}
			<Route path="/*" element={<Navigate to="/posts" replace />} />
		</Routes>
        причем раз здесь <route.element />, то в Navbar должны быть без скобок
