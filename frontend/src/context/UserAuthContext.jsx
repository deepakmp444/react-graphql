import { createContext, useEffect, useState } from "react"
import VERIFY_USER from "../gql/query/verify";
import { useQuery } from "@apollo/client";

// eslint-disable-next-line react-refresh/only-export-components
export const userAuthContextAPI = createContext()

// eslint-disable-next-line react/prop-types
function UserAuthProvider({ children }) {
  const { error, data, loading } = useQuery(VERIFY_USER);

  const [userAuthData, setUserAuthData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchEmail, setSearchEmail] = useState("")

  useEffect(() => {
    if (!error && !loading) {
      setUserAuthData(data)
      setIsLoggedIn(true)
    } else {
      setUserAuthData({})
      setIsLoggedIn(false)
    }
  }, [data, error, loading])

  return (
    <userAuthContextAPI.Provider value={{ userAuthData, setUserAuthData, isLoggedIn, setIsLoggedIn, searchEmail, setSearchEmail }}>{children}</userAuthContextAPI.Provider>
  )
}

export default UserAuthProvider