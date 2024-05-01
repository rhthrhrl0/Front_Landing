import React from "react";
import MuiRadioGroup from "@mui/material/RadioGroup";
import classNames from "classnames";
import Radio, {RadioProps} from "../../atoms/radio/Radio";
import style from "./style/RadioGroup.module.scss";


interface RadioGroupProps {
    className?: string;
    groupName?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    items?: Array<RadioProps>
}


const RadioGroup = ({className, groupName, onChange, items}: RadioGroupProps) => {
    return <MuiRadioGroup name={groupName} className={classNames(className, style['radio-group'])} onChange={onChange}>
        {
            items?.map((item: RadioProps) => {
                    return <Radio value={item.value} control={item.control} label={item.label}/>
                }
            )
        }
    </MuiRadioGroup>
}

RadioGroup.defaultProps = {
    className: style['radio-group'],
    groupName: '',
    onChange: () => {/** * */
    },
    items: []
}
export default RadioGroup;