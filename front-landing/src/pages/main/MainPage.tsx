import React from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Add, ListAlt} from "@mui/icons-material";
import classNames from "classnames";
import {ApolloProvider} from "@apollo/react-hooks";
import NumberAdd from "../../components/templates/NumberAdd/NumberAdd";
import NumberList from "../../components/templates/NumberList/NumberList";
import IconLabelTabs from "../../components/molcules/tabs/IconLabelTabs";
import Card from "../../components/atoms/card/Card";
import {AddressRepository} from "../../util/AddressRepository";
import style from "./style/MainPage.module.scss";

const tabItems = [
    {icon: <Add/>, label: '추가'},
    {icon: <ListAlt/>, label: '목록'},
]

const MainPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)
        setValue(newValue);
        if (newValue === 0) return navigate(`/main`);
        return navigate(`/main/list`);
    };

    // useEffect(() => {
    //     AddressRepository.createOrUpdatePerson('고명진', '010-7658-7639').then(r => {
    //             console.log('hi');
    //         }
    //     );
    // }, []);

    return <ApolloProvider client={AddressRepository.client}>
        <Card className={classNames(style['main-page'])}>
            <IconLabelTabs value={value} handleChange={handleChange} tabItems={tabItems}/>
            <Routes>
                <Route path="/list" element={<NumberList/>}/>
                <Route path="/" element={<NumberAdd className={style['main-page__number-add-wrapper']}/>}/>
            </Routes>
        </Card>
    </ApolloProvider>
};

export default MainPage;