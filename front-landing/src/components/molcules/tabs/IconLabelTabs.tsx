import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import classNames from "classnames";
import style from "./style/IconLabelTabs.module.scss";

interface IconLabelTabs {
    className?: string;
    value?: number;
    handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
    tabItems?: Array<{ icon: React.ReactElement, label: string }>;
    centered?: boolean;
    variant?: "standard" | "fullWidth" | "scrollable" | undefined;
}

const IconLabelTabs = ({className, value, handleChange, tabItems, centered, variant}: IconLabelTabs) => {
    return (
        <Tabs className={classNames(className, style.tabs)}
              value={value}
              onChange={handleChange}
              aria-label="icon label tabs" centered={centered} variant={variant}>
            {
                tabItems?.map((item) => {
                    return <Tab icon={item.icon} label={item.label}/>
                })
            }
        </Tabs>
    );
}

IconLabelTabs.defaultProps = {
    className: style.tabs,
    value: 0,
    handleChange: () => {
        /** * */
    },
    tabItems: [],
    centered: true,
    variant: "fullWidth"
}

export default IconLabelTabs;