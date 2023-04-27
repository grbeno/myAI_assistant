import React from 'react';
import axios from 'axios';

function App() {
  
  // states
  const [todos, setTodos] = React.useState([]);

  // axios call
  const getTodos = () => {
    axios.get('http://localhost:8000/app/').then(res => {
      setTodos(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // call getTodos on component mount
  React.useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {todos.map(item => (
        <div key={item.id} style={{paddingLeft: '1%'}}>
          <h1>{item.title}</h1>
          <span>{item.body}</span>
        </div>
      ))}
    </div>        
  );
}

export default App;
