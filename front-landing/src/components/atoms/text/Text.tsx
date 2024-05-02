import React from "react";
import classNames from "classnames";
import styles from "./styles/Text.module.scss";

type TextProps = {
    className?: string,
    text?: string,
    onClick?: React.MouseEventHandler<HTMLSpanElement>
}

const Text = ({text, className, onClick}: TextProps) => {
    return (<span className={classNames(className, styles.text)} onClick={onClick} role="presentation">
        {text}
    </span>);
}

Text.defaultProps = {
    text: '',
    className: styles.text,
    onClick: () => {
        /** * */
    }
}

export default Text;