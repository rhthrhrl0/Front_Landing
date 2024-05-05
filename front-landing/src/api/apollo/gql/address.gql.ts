import {gql} from "apollo-boost";

export const POST_ADDRESS_INFO = gql`
    mutation ($phoneRequest: PhoneRequest){
        createOrUpdatePerson(request: $phoneRequest){
            name
            phone
        }
    }
`;

export const GET_PEOPLE = gql`
    query {
        getPeople {
            name
            phone
        }
    }
`;

export const POST_ADDRESS_DELETE = gql`
    mutation ($request: DeleteRequest) {
        deletePerson (request: $request)
    }
`;
