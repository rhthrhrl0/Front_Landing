import React from 'react'
import {Button} from "@mui/material";

interface ButtonProps {
    content: string,
    onClick: () => void,
}

const Buttons = ({content, onClick}: ButtonProps) => {
    return <Button className="btn" type='button'
                   onClick={onClick} variant="outlined"
                   sx={{
                       marginTop: 3,
                       marginRight: 10,
                       marginLeft: 10,
                       width: 370,
                       justifyContent: "center",
                       flexDirection: "column",
                   }}>
        {content}</Button>
}


export default Buttons