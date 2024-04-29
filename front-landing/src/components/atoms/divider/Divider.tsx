import React from "react";
import classNames from "classnames";
import styles from "./styles/Divider.module.scss";

interface DividerProps {
    className?: string
}

const Divider = ({className}: DividerProps) => {
    return <div className={classNames(className, styles.divider)} />
}

Divider.defaultProps = {
    className: styles.divider
}

export default Divider;