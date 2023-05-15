import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LangApp from './LangApp';
import ImgGen from './ImgGen';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const langapp = ReactDOM.createRoot(document.getElementById('lang-app'));
langapp.render(
  <React.StrictMode>
    <LangApp />
  </React.StrictMode>
);

const imgen = ReactDOM.createRoot(document.getElementById('img-gen'));
imgen.render(
  <React.StrictMode>
    <ImgGen />
  </React.StrictMode>
);