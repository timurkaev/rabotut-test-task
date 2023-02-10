import React, { type FC } from "react";
import type { ITextProps } from "./Text.props";

import cn from "classnames";
import styles from "./Text.module.css";

export const Text: FC<ITextProps> = ({ children, size }): JSX.Element => {
	return (
		<div
			className={cn(styles.text, {
				[styles.small]: size === "s",
				[styles.medium]: size === "m",
			})}
		>
			{children}
		</div>
	);
};
