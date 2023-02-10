import React, { type FC } from "react";
import { UsersContainer } from "./components/screens/UsersContainer/UsersContainer";

export const App: FC = (): JSX.Element => {
	return (
		<div className="container">
			<UsersContainer />
		</div>
	);
};
