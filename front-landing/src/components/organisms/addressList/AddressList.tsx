import React from "react";
import classNames from "classnames";
import AddressItem, {AddressItemType} from "../../molcules/list/AddressItem";
import style from "./style/AddressList.module.scss";

interface AddressListProps {
    className?: string;
    items?: Array<AddressItemType>;
}

const AddressList = ({className, items}: AddressListProps) => {
    return <div className={classNames(className, style['address-list'])}>
        {
            items?.map((item) => {
                return <AddressItem item={item}/>
            })
        }
    </div>
}

AddressList.defaultProps = {
    className: '',
    items: []
};

export default AddressList;