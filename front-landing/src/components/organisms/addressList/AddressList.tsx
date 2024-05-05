import React from "react";
import classNames from "classnames";
import AddressItem, {AddressItemType} from "../../molcules/list/AddressItem";
import style from "./style/AddressList.module.scss";

interface AddressListProps {
    className?: string;
    items?: Array<AddressItemType>;
    onDelete?: (phone:string) => void;
}

const AddressList = ({className, items, onDelete}: AddressListProps) => {
    return <div className={classNames(className, style['address-list'])}>
        {
            items?.map((item) => {
                return <AddressItem item={item} onDelete={onDelete}/>
            })
        }
    </div>
}

AddressList.defaultProps = {
    className: '',
    items: [],
    onDelete: () => {
        /** * */
    }
};

export default AddressList;