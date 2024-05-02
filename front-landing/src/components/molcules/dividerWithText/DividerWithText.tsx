import React from "react";
import classNames from "classnames";
import styles from "./style/DividerWithText.module.scss"


interface DividerWithTextProps {
    children: React.ReactNode;
}


const DividerWithText = ({children}: DividerWithTextProps) => {
    return (
        <div className={classNames(styles.container)}>
            <div className={classNames(styles.borderLeft)}/>
            <span className={classNames(styles.content)}>{children}</span>
            <div className={classNames(styles.borderRight)}/>
        </div>
    );
};

export default DividerWithText;