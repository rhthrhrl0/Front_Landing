import React from "react";
import AddressList from "../../organisms/addressList/AddressList";
import Text from "../../atoms/text/Text";
import {AddressItemType} from "../../molcules/list/AddressItem";
import style from "./style/NumberList.module.scss";

interface NumberListProps {
    className?: string;
    items?: Array<AddressItemType>;
    loading?: boolean;
    onDelete?: (phone:string) => void;
}

const NumberList = ({className, items, loading, onDelete}: NumberListProps) => {
    if (loading) return <Text text="불러오는 중"/>
    return <AddressList items={items} onDelete={onDelete}/>
};

NumberList.defaultProps = {
    className: style['number-list'],
    items: [],
    loading: false,
    onDelete: () => {
        /** * */
    }
}

export default NumberList;