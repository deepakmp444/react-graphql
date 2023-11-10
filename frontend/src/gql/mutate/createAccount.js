import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation addUser($user: AddUserInput!){
  addUser(user: $user) {
    _id
    email
    name
  }
}
`;

export default ADD_USER