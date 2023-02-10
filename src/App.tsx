import React, {
	createRef,
	type FC,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { UsersContainer } from "./components/screens/UsersContainer/UsersContainer";
import axios from "axios";
import type { IUsersResponseType } from "./types/users.response.type";
import { Loader } from "./components/screens/Loader/Loader";

export const App: FC = (): JSX.Element => {
	const [users, setUsers] = useState<IUsersResponseType>({
		results: [],
		info: {
			page: 1,
		},
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const limit = 20;

	const getRandomUsers = async (): Promise<void> => {
		try {
			setIsLoading(true);
			const res = await axios.get(
				`https://randomuser.me/api/?results=${limit}&page=${users.info.page}/`
			);
			setUsers((prev) => ({
				results: [...prev.results, ...res.data.results],
				info: {
					page: prev.info.page + 5,
				},
			}));
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getRandomUsers();
	}, []);

	const lastElement = createRef<HTMLDivElement>();
	const observerLoader = useRef<IntersectionObserver | null>(null);

	const actionInSight = (entries: any) => {
		const target = entries[0];
		if (target.isIntersecting) {
			getRandomUsers();
		}
	};

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		};
		if (observerLoader.current) {
			observerLoader.current.disconnect();
		}
		observerLoader.current = new IntersectionObserver(actionInSight, option);
		if (lastElement.current) {
			observerLoader.current.observe(lastElement.current);
		}
	}, [lastElement]);

	return (
		<div className="container">
			{isLoading ? (
				<Loader />
			) : (
				users?.results.map((obj, index) => {
					if (index + 1 === users.results.length) {
						return (
							<UsersContainer
								key={JSON.stringify(obj)}
								obj={obj}
								ref={lastElement}
							/>
						);
					}
					return <UsersContainer key={JSON.stringify(obj)} obj={obj} />;
				})
			)}
		</div>
	);
};
