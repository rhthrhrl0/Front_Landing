import React, {useCallback} from "react";
import classNames from "classnames";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Text from "../../atoms/text/Text";
import style from "./style/AddressItem.module.scss";

export type AddressItemType = {
    name: string,
    phone: string
}

interface AddressItemProps {
    className?: string,
    item?: AddressItemType,
    onDelete?: (phone: string) => void
}

const AddressItem = ({className, item, onDelete}: AddressItemProps) => {
    const onDeleteClick = useCallback(() => {
        if (item?.phone === undefined) return;
        onDelete?.(item.phone)
    }, [item, onDelete])

    return <div className={classNames(className, style['address-item'])}>
        <Text text={item?.name}/>
        <Text text={item?.phone}/>
        <IconButton onClick={onDeleteClick}> <DeleteIcon/> </IconButton>
    </div>
}

AddressItem.defaultProps = {
    className: style['address-item'],
    item: {name: '', phone: ''}
}

export default AddressItem;