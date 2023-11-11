import { useContext, useEffect } from 'react'
import { userAuthContextAPI } from '../context/UserAuthContext'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(userAuthContextAPI)
    console.log('ProtectedRoute:')

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }
    }, [])

    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute