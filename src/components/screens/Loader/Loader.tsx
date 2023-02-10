import React, { type FC } from "react";
import styles from "./Loader.module.css";

export const Loader: FC = (): JSX.Element => {
	return <div className={styles.loading}></div>;
};
