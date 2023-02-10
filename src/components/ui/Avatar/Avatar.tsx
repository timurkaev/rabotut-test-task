import React, { type FC } from "react";

import cn from "classnames";
import styles from "./Avatar.module.css";

import type { IAvatarProps } from "./Avatar.props";

import DefaultImage from "./assets/default.jpg";

export const Avatar: FC<IAvatarProps> = ({ src, className }): JSX.Element => {
	const isImage = src ? src : DefaultImage;

	return (
		<div>
			<img
				className={cn(styles.avatar, className)}
				src={isImage}
				alt="avatar"
			/>
		</div>
	);
};
