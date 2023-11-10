import { gql } from '@apollo/client';

const USER_LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      _id
      email
      name
    }
  }
`;

export default USER_LOGIN