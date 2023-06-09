import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function getCookie(name) {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return cookieValue ? cookieValue.pop() : '';
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrftoken = getCookie('csrftoken');
      const response = await axios.post('/accounts/login/', { username, password },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': csrftoken,
        },
      });

      if (response.data.success) {
        // Login successful
        console.log('Login successful!');
        //setError('Welcome ' + username + '! You are now logged in.');
        window.location.href = '/'; // Redirect to home page  
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <form className="text-light" onSubmit={handleSubmit} style={{ backgroundColor: '#131954', padding: '3%', paddingLeft: '10%', paddingRight: '10%' }}>
        <label htmlFor="username">Username</label>
          <div>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <label htmlFor="password" className="mt-2">Password</label>
          <div>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="d-flex p-2 justify-content-center">
            <button type="submit" className="mt-4 btn btn-primary">Login</button>
          </div>
        </form>
      </div>
      <div className="d-flex h5 p-2 text-danger justify-content-center">
        {error && <span><i class="fa-solid mx-2 fa-triangle-exclamation"></i>{error}</span>}
      </div>
    </>
  );
};

export default LoginForm;







