import React, {useState} from "react";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import "../styles/_user.scss"
import {useMutation, useQuery} from "@apollo/client";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import {CREATE_OR_UPDATE_PERSON, GET_PEOPLE} from "../api/apollo/gql/showtime.gql";
import UserList from "../components/atoms/UserList";
import Logout from "../components/atoms/Logout";

const LoginUserPage = () => {
    const accessToken = `Bearer ${window.localStorage.getItem("accessToken")}`;
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    // 해당 getPeople graphql 데이터를 가져오는 함수 만약 오류가 뜨면 error 데이터를 가져오는동안 loading을 띄운다.
    const {loading, error, data, refetch} = useQuery(GET_PEOPLE, {
        context: {
            headers: {
                authorization: accessToken
            },
            variables: {
                name: '',
                phone: ''
            }
        }
    });
    // refetch를 이용한 실시간 데이터 변경
    // const refetchUser: () => void = refetch;

    // graphql Mutation 연동
    const [createOrUpdatePerson] = useMutation(
        CREATE_OR_UPDATE_PERSON, {
            context: {
                headers: {
                    authorization: accessToken
                }
            }
        });

    const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onPhoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.currentTarget.value);
    }

    // createOrUpdatePerson mutation에 request값을 보내기위한 변수
    const phoneRequest = {name, phone}

    // 데이터 수정및추가를 위한 함수
    const onInsertClick = () => {
        try {
            console.log(name);
            console.log(phone);
            createOrUpdatePerson({
                variables: {request: phoneRequest},
                onCompleted: onInsertComplete,
            });
        } catch (error) {
            console.log(error)
        }
    }

    const onInsertComplete = () => {
        window.location.replace("/user");
    }

    // query로딩시 로딩화면출력
    if (loading) return <p>loading....</p>
    // query에러시 에러화면 출력
    if (error) return <p>Error :(</p>
    return (
        <>
            <Box className="userTemplate">
                <Box className="userList">
                    <UserList data={data}/>
                </Box>
                <Box className="userInfo">
                    <Box className="LoginID">
                        <TextField
                            value={name}
                            onChange={onNameHandler} label="이름"
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon/>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                marginTop: 2,
                                width: 370,
                                marginLeft: 3,
                            }}
                        />
                    </Box>
                    <Box className="LoginPW">
                        <TextField
                            value={phone}
                            onChange={onPhoneHandler} label="전화번호"
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon/>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                marginTop: 3,
                                marginLeft: 3,
                                width: 370,
                            }}
                        />
                    </Box>
                    <Button className="addtBtn" type="button" onClick={onInsertClick} variant="text">번호추가</Button>
                </Box>
            </Box>
            <Box className="signupBtn">
                <Logout/>
            </Box>
        </>
    );

}
export default LoginUserPage;