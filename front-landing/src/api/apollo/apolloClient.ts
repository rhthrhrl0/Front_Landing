import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {ACCESS_TOKEN, getCookie} from "../../util/cookieUtil";

const cache = new InMemoryCache(); // apollo client는 gql 결과를 인메모리캐시에 저장함.

const httpLink = createHttpLink({
    uri: 'https://deamhome.synology.me/land/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getCookie(ACCESS_TOKEN);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    defaultOptions:  {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});