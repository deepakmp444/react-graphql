import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation addUser($user: AddUserInput!){
  addUser(user: $user) {
    email
    name
    username
  }
}
`;

export default ADD_USER