import React, { forwardRef, type RefObject } from "react";
import styles from "./UserContainer.module.css";
import type { IResult } from "../../../types/users.response.type";
import { Avatar } from "../../ui/Avatar/Avatar";
import { Text } from "../../ui/Text/Text";

interface IUsersInterface {
	obj: IResult;
	ref: RefObject<HTMLDivElement>;
}

// eslint-disable-next-line react/display-name
export const UserItem = forwardRef<HTMLDivElement, IUsersInterface>(
	({ obj }, ref): JSX.Element => {
		return (
			<div className={styles.userContainer}>
				<div ref={ref} className={styles.userInfo}>
					<div className={styles.avatarBlock}>
						<Avatar className={styles.avatar} src={obj?.picture?.medium} />
						<div className={styles.user}>
							<Text size="m">
								{obj?.name?.first} {obj?.name?.last}
							</Text>
							<Text size="s">
								<span>{obj?.gender}</span> <span>{obj?.email}</span>
							</Text>
						</div>
					</div>
				</div>
			</div>
		);
	}
);
