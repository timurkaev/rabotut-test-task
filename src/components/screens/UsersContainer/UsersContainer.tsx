import React, {
	createRef,
	type FC,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import type {
	IResult,
	IUsersResponseType,
} from "../../../types/users.response.type";
import { Loader } from "../Loader/Loader";
import { UserItem } from "./UserItem";
import axios from "axios";

// eslint-disable-next-line react/display-name
export const UsersContainer: FC = (): JSX.Element => {
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
			await setUsers((prev) => ({
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

	const actionInSight = useCallback(
		(entries: any) => {
			const target = entries[0];
			if (target.isIntersecting) {
				getRandomUsers();
			}
		},
		[lastElement]
	);

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

	const renderUsersList = (users: IResult[]) => {
		const content = [];
		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			if (i + 1 === users.length) {
				content.push(
					<UserItem key={JSON.stringify(user)} obj={user} ref={lastElement} />
				);
			}
			content.push(<UserItem key={JSON.stringify(user)} obj={user} />);
		}
		return content;
	};

	return (
		<div className="container">
			{isLoading ? <Loader /> : renderUsersList(users?.results)}
		</div>
	);
};
