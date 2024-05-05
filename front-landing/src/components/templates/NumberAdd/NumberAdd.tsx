import React, {useState} from "react";
import classNames from "classnames";
import {useMutation} from "@apollo/react-hooks";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import {POST_ADDRESS_INFO} from "../../../api/apollo/gql/address.gql";
import {detectKoreanPhoneNumber} from "../../../models/KoreanPhoneNumberFormat";
import style from "./style/NumberAdd.module.scss";

interface NumberAdd {
    className?: string;
}

const NumberAdd = ({className}: NumberAdd) => {
    const [mutateFunction, {data, loading, error}] = useMutation(POST_ADDRESS_INFO);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneFormatError, setPhoneFormatError] = useState(false);

    const onNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setName(e.target.value)
    }
    const onPhoneChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setPhone(e.target.value)
    }

    if (loading) {
        console.log('loading중')
    } else if (data !== undefined) {
        console.log(`data ${data}`)
    }

    const onSaveClick = () => {
        if (!detectKoreanPhoneNumber(phone)) {
            setPhoneFormatError(true);
            return;
        }
        setPhoneFormatError(false);
        mutateFunction({variables: {phoneRequest: {name, phone}}}).catch((error) => {
            console.log(`error ${error}`)
        }).then(()=> {
            window.confirm('성공적으로 등록됐습니다!')
            setName('')
            setPhone('')
        })
    }

    return <div className={classNames(className, style['number-add'])}>
        <Input value={name} label='이름' onChange={onNameChange} autoFocus/>
        <Input value={phone} label='전화번호' onChange={onPhoneChange} error={phoneFormatError}/>
        <Button onClick={onSaveClick}>저장</Button>
    </div>
};

NumberAdd.defaultProps = {
    className: style['number-add']
}

export default NumberAdd;