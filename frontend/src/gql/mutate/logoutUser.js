import { gql } from '@apollo/client';

const USER_LOGOUT = gql`
mutation logoutByUser {
  logout
}
`;

export default USER_LOGOUT