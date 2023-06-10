import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import TodoApp from './TodoApp';
import LangApp from './LangApp';
import CodeExp from './CodeExp';
import ImgGen from './ImgGen';
import LoginForm from './Login';
import isAuthenticated from './auth'; 

function App() {
  
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticatedResult = await isAuthenticated();
      setAuth(isAuthenticatedResult['is_authenticated']);
      setUser(isAuthenticatedResult['username']);
    };

    checkAuth();
  }, []);

  if (auth === null) {
    // Show a loading state while authentication status is being checked
    return <div>Loading...</div>;
  }

  return(
    <div>
      <Nav auth={auth} user={user}/>
      <div className='p-2 container bg-transparent'> 
        {auth ? (
          <>
            <TodoApp />
            <LangApp />
            <CodeExp />
            <ImgGen />
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
