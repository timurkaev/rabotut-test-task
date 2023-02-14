import React, { type FC, lazy, Suspense } from "react";
import { Loader } from "./components/screens/Loader/Loader";
const UsersContainer = lazy(
	() => import("./components/screens/UsersContainer/UsersContainer")
);

export const App: FC = (): JSX.Element => {
	return (
		<div className="container">
			<Suspense fallback={<Loader />}>
				<UsersContainer />
			</Suspense>
		</div>
	);
};
