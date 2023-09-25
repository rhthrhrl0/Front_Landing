import React from 'react';
import {ApolloClient, InMemoryCache,ApolloProvider} from '@apollo/client'
import {AppRouter} from './routes/AppRouter';

const App = () => {
    const client = new ApolloClient({
        uri: 'https://moviethree.synology.me/back/graphql',
        cache: new InMemoryCache()
    })
    return (
        <ApolloProvider client={client}>
            <AppRouter/>
        </ApolloProvider>
    );

};

export default App;
