import React from "react";
import classNames from "classnames";
import Text from "../../atoms/text/Text";
import style from "./style/AddressItem.module.scss";

export type AddressItemType = {
    name: string,
    phone: string
}

interface AddressItemProps {
    className?: string,
    item?: AddressItemType
}

const AddressItem = ({className, item}: AddressItemProps) => {
    return <div className={classNames(className, style['address-item'])}>
        <Text text={item?.name}/>
        <Text text={item?.phone}/>
    </div>
}

AddressItem.defaultProps = {
    className: style['address-item'],
    item: {name: '', phone: ''}
}

export default AddressItem;