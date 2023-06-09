import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import TodoApp from './TodoApp';
import LangApp from './LangApp';
import CodeExp from './CodeExp';
import ImgGen from './ImgGen';
import LoginForm from './Login';

function App() {
  
  // login

  return(
    <div>
      <Nav />
      <div className='p-2 container bg-transparent'>
        <LoginForm />
        <TodoApp />
        <LangApp />
        <CodeExp />
        <ImgGen />
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
