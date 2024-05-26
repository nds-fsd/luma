import App from "../App"
import { createContext, useState, useEffect } from "react"
import { getUserToken } from "../utils/localStorage.utils"

const UserData = createContext(null)

const UserContext = ({children}) => {

    const [userInfo, setUserInfo] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(!!getUserToken());
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [userFullName, setUserFullName] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [userId, setUserId] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = getUserToken();
            if (token) {
              const userData = await getUserTokenData(token);
              setUserInfo(userData)
              setUserFullName(userData.fullName);
              setUserPicture(userData.picTure);
              setUserId(userData.iD);
              setUserRole(userData.role);
            }
          } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
          }
        };
    
        if (isAuthenticated) {
          fetchUserData();
        } else {
        setUserInfo("");
          setUserFullName('');
          setUserPicture('');
          setUserId('');
          setUserRole('');
        }
      }, [isAuthenticated]);


    return (
        <UserData.Provider value={userInfo}>
           {children}
        </UserData.Provider>

    )
}

export default UserContext