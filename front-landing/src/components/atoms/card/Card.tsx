import React from "react";
import classNames from "classnames";
import styles from "./styles/Card.module.scss";

type CardProps = {
    className?: string,
    children: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}
const Card = ({className, children, onClick}: CardProps) => {
    return <div className={classNames(className, styles.card)} onClick={onClick} role="presentation">
        {children}
    </div>
}

Card.defaultProps = {
    className: styles.card,
    onClick: () => {
        /** * */
    }
}

export default Card;