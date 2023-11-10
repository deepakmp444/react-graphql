import { gql } from '@apollo/client';

const VERIFY_USER = gql`
query verifyUser{
  verifyUser {
    _id
    email
    name
  }
}
`;

export default VERIFY_USER