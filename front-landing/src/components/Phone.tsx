import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
    GET_PEOPLE,
    CREATE_OR_UPDATE_PERSON,
    DELETE_PERSON,
} from './graphql';

interface PhoneBook {
    name: string;
    phone: string;
}

interface PhoneBookAppProps {
    // eslint-disable-next-line react/require-default-props
    accessToken?: string;
}

const PhoneBookApp: React.FC<PhoneBookAppProps> = () => {

    const accessToken = `Bearer ${window.localStorage.getItem("accessToken")}`;
    const [inputName, setInputName] = useState<string>('');
    const [inputPhone, setInputPhone] = useState<string>('');
    const [phoneBookList, setPhoneBookList] = useState<PhoneBook[]>([]);
    const [selectedPhoneBook, setSelectedPhoneBook] = useState<PhoneBook | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPhone(e.target.value);
    };

    const request = { name: "박", phone: "010-3333-3333" };

    const { loading, data} = useQuery(GET_PEOPLE, {
        context: {
            headers: {
                authorization: accessToken,
            },
        },
        variables: {
            request
        },

    });

    useEffect(() => {
        console.log('Before useEffect');
        if (data) {
            console.log('Data:', data);
        } else {
            console.log('Error fetching data:');
        }
        console.log('After useEffect');
    }, [loading, data]);
    const [createOrUpdatePerson] = useMutation(CREATE_OR_UPDATE_PERSON, {
        context: {
            headers: {
                authorization: accessToken,
            },
        },
    });

    const [deletePerson] = useMutation(DELETE_PERSON, {
        context: {
            headers: {
                authorization: accessToken,
            },
        },
    });

    const handleAddPhoneBook = async () => {
        console.log('Data:', data);
        if (inputName && inputPhone) {
            const newPhoneBook: PhoneBook = {
                name: inputName,
                phone: inputPhone,
            };
            const request = { name: inputName, phone: inputPhone };

            setPhoneBookList([...phoneBookList, newPhoneBook]);
            setInputName('');
            setInputPhone('');

            try {
                await createOrUpdatePerson({
                    variables: {
                        request
                    },
                });
            } catch (error) {
                console.error('Error creating or updating person:', error);
            }
        }
    };

    const handleSelectPhoneBook = (phoneBook: PhoneBook) => {
        setSelectedPhoneBook(phoneBook);
    };

    const handleDeletePhoneBook = async (index: number) => {
        const phoneToDelete = phoneBookList[index].phone;
        const request = { phone: phoneToDelete };
        const updatedPhoneBookList = phoneBookList.filter((_, i) => i !== index);
        setPhoneBookList(updatedPhoneBookList);
        setSelectedPhoneBook(null);

        try {
            await deletePerson({
                variables: {
                    request
                },
            });
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };



    return (
        <div className="phonebook">
            <h1>전화번호부</h1>

            <div className="input">
                <input
                    type="text"
                    placeholder="이름"
                    value={inputName}
                    onChange={handleNameChange}
                />
                <input
                    type="text"
                    placeholder="전화번호"
                    value={inputPhone}
                    onChange={handlePhoneChange}
                />
                {/* eslint-disable-next-line react/button-has-type */}
                <button onClick={handleAddPhoneBook}>추가</button>
            </div>
            <div className="list">
                <h2>전화번호부 목록</h2>
                <input
                    type="text"
                    placeholder="검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul>
                    {phoneBookList.map((phoneBook, index) => (
                        // eslint-disable-next-line react/no-array-index-key,jsx-a11y/click-events-have-key-events
                        <li key={index} onClick={() => handleSelectPhoneBook(phoneBook)}>
                            {phoneBook.name} - {phoneBook.phone}
                            {/* eslint-disable-next-line react/button-has-type */}
                            <button onClick={() => handleDeletePhoneBook(index)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="select">
                <h2>선택된 전화번호</h2>
                {selectedPhoneBook && (
                    <div>
                        <p>{selectedPhoneBook.name}</p>
                        <p>{selectedPhoneBook.phone}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhoneBookApp;