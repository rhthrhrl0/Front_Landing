import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {ApolloProvider} from "@apollo/client/react";
import SignupForm from './components/SignUp';
import LoginForm from './components/Login';
import PhoneBookApp from './components/Phone';

const client = new ApolloClient({
    uri: 'https://moviethree.synology.me/back/graphql',
    cache: new InMemoryCache()
});
const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
        <Router>
            <Routes>
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/phonebook" element={<PhoneBookApp />} />
            </Routes>
        </Router>
        </ApolloProvider>
    );
};

export default App;