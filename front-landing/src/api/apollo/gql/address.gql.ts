import {gql} from "apollo-boost";

export const POST_ADDRESS_INFO = gql`
    mutation ($phoneRequest: PhoneRequest){
        createOrUpdatePerson(request: $phoneRequest){
            name
            phone
        }
    }
`;