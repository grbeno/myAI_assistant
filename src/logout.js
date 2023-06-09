import axios from 'axios';

const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/accounts/logout/');
      console.log('User logged out successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
};

export default logout;
