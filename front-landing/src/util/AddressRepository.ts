import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {ACCESS_TOKEN, getCookie} from "./cookieUtil";


export class AddressRepository {
    private static cache = new InMemoryCache(); // apollo client는 gql 결과를 인메모리캐시에 저장함.

    private static httpLink = createHttpLink({
        uri: 'https://deamhome.synology.me/land/graphql',
    });

    static authLink = setContext((_, { headers }) => {
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

    static client = new ApolloClient({
        link: this.authLink.concat(this.httpLink),
        cache: this.cache,
    });

    static createOrUpdatePerson = async (name: string, phone: string) => {
        // const [mutateFuction, {data, loading, error}] = useMutation(POST_ADDRESS_INFO);
        // mutateFuction({variables: {phoneRequest: {name, phone}}});
        //
        // if (loading) {
        //     console.log('loading중')
        // }
        // if (error) {
        //     console.log('error')
        //     console.log(`${error}`)
        // } else {
        //     console.log(data)
        //     console.log(data.phoneRequest)
        // }

        // return this.client.mutate({
        //     mutation: POST_ADDRESS_INFO()
        // }).then(response => {
        //     console.log('성공')
        //     console.log(response)
        //     return response
        // }).catch(error => {
        //     console.log('실패')
        //     console.log(error)
        //     return error
        // })
    }

}