import React from "react";
import { Box, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_PERSON } from "../../api/apollo/gql/showtime.gql";

interface UserProps {
    name: string;
    phone: string;
}

const User = ({ name, phone }: UserProps) => {
    const accessToken = `Bearer ${window.localStorage.getItem("accessToken")}`;

    const [deletePerson] = useMutation(DELETE_PERSON, {
        context: {
            headers: {
                authorization: accessToken,
            },
        }, // 삭제가 성공하면 호출될 함수
    });

    const request = { phone };

    const onDelete = () => {
        try {
            console.log(phone);
            deletePerson({
                variables: { request },
                onCompleted: onDeletecomplete
            });
        } catch (error) {
            console.log(error);
        }
        // window.location.reload();
    };

    const onDeletecomplete = () => {
        window.location.replace("/user");
    };

    return (
        <Box className="userData">
            <div className="userText">
                이름:{name} 번호:{phone}
                <Button className="deleteBtn" type="button" onClick={onDelete} variant="contained">
                    삭제
                </Button>
            </div>
        </Box>
    );
};

export default User;