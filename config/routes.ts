interface Route {
	path: string;
	component?: string;
	routes?: Route[];
	name?: string;
	redirect?: string;
}

const routes: Route[] = [
	{
		path: '/',
		component: '../pages/table',
	}
]
export default routes;



