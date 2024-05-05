import React, {useCallback, useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Add, ListAlt} from "@mui/icons-material";
import classNames from "classnames";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import NumberAdd from "../../components/templates/NumberAdd/NumberAdd";
import NumberList from "../../components/templates/numberList/NumberList";
import IconLabelTabs from "../../components/molcules/tabs/IconLabelTabs";
import Card from "../../components/atoms/card/Card";
import {GET_PEOPLE, POST_ADDRESS_DELETE} from "../../api/apollo/gql/address.gql";
import {AddressItemType} from "../../components/molcules/list/AddressItem";
import style from "./style/MainPage.module.scss";

const tabItems = [
    {icon: <Add/>, label: '추가'},
    {icon: <ListAlt/>, label: '목록'},
]

const MainPage = () => {
    const [refetch, {
        loading,
        error,
        data
    }] = useLazyQuery(GET_PEOPLE);

    const [a] = useMutation(POST_ADDRESS_DELETE);

    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (value === 1) {
            refetch().then((response) => {
                setItems(
                    response?.data?.getPeople?.map((item: AddressItemType) => {
                        return {name: item.name, phone: item.phone}
                    })
                );
            });
        }
    }, [value])
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)
        setValue(newValue);
        if (newValue === 0) return navigate(`/main`);
        return navigate(`/main/list`);
    };

    const onDeleteClick = useCallback((phone: string) => {
        a({variables: {request: {phone}}}).then((response) => {
            refetch().then((response) => {
                setItems(
                    response?.data?.getPeople?.map((item: AddressItemType) => {
                        return {name: item.name, phone: item.phone}
                    })
                );
            });
        });
    }, [])

    return <Card className={classNames(style['main-page'])}>
        <IconLabelTabs value={value} handleChange={handleChange} tabItems={tabItems}/>
        <Routes>
            <Route path="/list" element={<NumberList items={items} loading={loading} onDelete={onDeleteClick}/>}/>
            <Route path="/" element={<NumberAdd className={style['main-page__number-add-wrapper']}/>}/>
        </Routes>
    </Card>;
};

export default MainPage;