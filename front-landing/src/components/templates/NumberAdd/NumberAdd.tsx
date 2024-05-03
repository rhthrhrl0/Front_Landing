import React, {useState} from "react";
import classNames from "classnames";
import {useMutation} from "@apollo/react-hooks";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import {POST_ADDRESS_INFO} from "../../../api/apollo/gql/address.gql";
import style from "./style/NumberAdd.module.scss";

interface NumberAdd {
    className?: string;
}

const NumberAdd = ({className}: NumberAdd) => {
    const [mutateFunction, {data, loading, error}] = useMutation(POST_ADDRESS_INFO);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const onNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setName(e.target.value)
    }
    const onPhoneChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setPhone(e.target.value)
    }

    if (loading) {
        console.log('loading중')
    }
    if (error) {
        console.log('error')
        console.log(`${error}`)
    } else if (data !== undefined) {
        console.log("data")
        console.log(data)
        console.log(data?.phoneRequest)
        window.confirm('성공')
    }

    const onSaveClick = () => {
        mutateFunction({variables: {phoneRequest: {name, phone}}}).catch((error)=>{
            console.log('error')
            console.log(`${error}`)
        })
    }
    return <div className={classNames(className, style['number-add'])}>
        <Input value={name} label='이름' onChange={onNameChange} autoFocus/>
        <Input value={phone} label='전화번호' onChange={onPhoneChange}/>
        <Button onClick={onSaveClick}>저장</Button>
    </div>
};

NumberAdd.defaultProps = {
    className: style['number-add']
}

export default NumberAdd;