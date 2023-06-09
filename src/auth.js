import axios from 'axios';

const isAuthenticated = async () => {
  try {
    const response = await axios.get('/accounts/session/'); // session-based authentication
    console.log('response.data.is_authenticated:', response.data.is_authenticated);
    console.log('response.data:', response.data['username']);
    return response.data //.is_authenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export default isAuthenticated;

