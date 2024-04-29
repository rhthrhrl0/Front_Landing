import React, {useMemo} from "react";
import classNames from "classnames";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import {convertSecondsToMinutes} from "../../../models/SecondsToMinutesTimeFormatter";
import style from "./style/EmailConfirm.module.scss"

interface EmailConfirmProps {
    className?: string;
    onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
    remainTime?: number;
    confirmValue?: string;
    onConfirmValueChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
}

// 인증번호 입력 가능 인풋 영역
const EmailConfirm = ({
                          className,
                          onSubmit,
                          remainTime,
                          confirmValue,
                          onConfirmValueChange,
                          disabled
                      }: EmailConfirmProps) => {
    const remainTimeFormat: React.ReactNode | undefined = useMemo(() => {
        if (remainTime === undefined) return undefined
        return <div className={style['email-confirm__input__time-limit']}>
            {convertSecondsToMinutes(remainTime)}
        </div>
    }, [remainTime])
    return <div className={classNames(className, style['email-confirm'])}>
        <Input className={style['email-confirm__input']} value={confirmValue} onChange={onConfirmValueChange} endItem={
            remainTimeFormat
        } placeholder="000000" label="인증번호" disabled={disabled}/>
        <Button onClick={onSubmit} className={style['email-confirm__button']} disabled={disabled}>
            인증
        </Button>
    </div>;
}

EmailConfirm.defaultProps = {
    className: style['email-confirm'],
    onSubmit: () => {/** * */
    },
    remainTime: undefined,
    confirmValue: '',
    onConfirmValueChange: () => {/** * */
    },
    disabled: false
}

export default EmailConfirm;