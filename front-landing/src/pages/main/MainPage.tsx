import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import NumberAdd from "../../components/templates/NumberAdd/NumberAdd";
import NumberList from "../../components/templates/NumberList/NumberList";

const MainPage = () => {
    return <div>
        <ul>
            <li>
                <Link to="/main/add">add</Link>
            </li>
            <li>
                <Link to="/main/list">list</Link>
            </li>
        </ul>
        <Routes>
            <Route path="/*" element={<NumberAdd/>}/>
            <Route path="/list" element={<NumberList/>}/>
        </Routes>
    </div>
};

export default MainPage;