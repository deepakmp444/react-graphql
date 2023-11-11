import { gql } from '@apollo/client';


const GET_ALL_USER = gql`
  query users{
   users {
      _id
      email
      name
   }
}
`;

export default GET_ALL_USER