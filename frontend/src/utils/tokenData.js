import { api } from '../../utils/api';

export const getUserTokenData = async (token) => {
    try {
      const response = await api.get('/api/user/token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const userData = {
          fullName: response.data.fullName,
          email: response.data.email,
          iD: response.data.id,
          picTure: response.data.picTure,
          role: response.data.role, 
        };
        return userData;
      } else {
        console.error('Error al obtener los datos del usuario:', response.statusText);
        return null; 
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return null; 
    }
  };