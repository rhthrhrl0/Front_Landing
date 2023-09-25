import {gql} from "@apollo/client";

export const GET_PEOPLE = gql`
query GetPeople($request: SearchRequest) {
  getPeople(request: $request) {
    name
    phone
  }
}`;

export const CREATE_OR_UPDATE_PERSON = gql`
mutation CreateOrUpdatePerson($request: PhoneRequest) {
    createOrUpdatePerson(request: $request) {
        name
        phone
    }
  }
`;

export const DELETE_PERSON= gql`
mutation DeletePerson($request: DeleteRequest)
{
    deletePerson(request: $request)
}
`;