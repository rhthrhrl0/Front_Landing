import React from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Add, ListAlt} from "@mui/icons-material";
import classNames from "classnames";
import NumberAdd from "../../components/templates/NumberAdd/NumberAdd";
import NumberList from "../../components/templates/NumberList/NumberList";
import IconLabelTabs from "../../components/molcules/tabs/IconLabelTabs";
import Card from "../../components/atoms/card/Card";
import style from "./style/MainPage.module.scss";

const tabItems = [
    {icon: <Add/>, label: '추가'},
    {icon: <ListAlt/>, label: '목록'},
]

const MainPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number)  => {
        setValue(newValue);
        if (value === 0) return navigate(`${location.pathname}/add`);
        return navigate(`${location.pathname}/list`);
    };

    return <Card className={classNames(style['main-page'])}>
        <IconLabelTabs value={value} handleChange={handleChange} tabItems={tabItems}/>
        <Routes>
            <Route path="/*" element={<NumberAdd/>}/>
            <Route path="/list" element={<NumberList/>}/>
        </Routes>
    </Card>
};

export default MainPage;