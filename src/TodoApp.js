import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function TodoApp() {
  
  // hooks
  const [todos, setTodos] = useState([]); // populating data
  const [formData, setFormData] = useState({ id: '', name: '', text: '', });
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  // axios get
  const getTodos = () => {
    axios.get('/app/')
    .then(res => {
      setTodos(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // call getTodos on component mount
  useEffect(() => {
    getTodos();
  }, []);

  // handle input
  const handleInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/app/', {
      id: formData.id,
      title: formData.title,
      body: formData.body,
    })
    .then((res) => {
      const newItem = {
        id: res.data.id,
        title: formData.title,
        body: formData.body,
      };
      setFormData({ id: '', title: '', body: '' });
      setTodos((prevTodos) => [...prevTodos, newItem]);
    })
    .catch((err) => {});
  };

  // delete item
  const handleClear = (id) => {
    axios.delete(`app/${id}/`)
    .then(response => {
      console.log(response.data);
      getTodos();
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div>
      <div class="d-flex h2 w-100 p-3 mt-3 bg-info text-light justify-content-between">
      <i class="m-2 fa-solid fa-terminal"></i>Todo App for testing django-restframework & react<i class="cursor-like m-2 fa-solid fa-sort" onClick={toggleContent}></i>
      </div>
      {isContentVisible && (
      <div>
        <h4 className="p-3">Add new with<a href="/app/"> django-restframework</a></h4>
        <hr/>
        <h4 className="p-3">Add new with form rendering with react:</h4>
        
        {/* form */}
        <form className="p-3" onSubmit={handleSubmit}>
          <span className="input-group-text" id="basic-addon1">{" "}Title{" "}</span>
          <input type="text" className="form-control" value={formData.title} name="title" onChange={handleInput}/>
          <span className="input-group-text" id="basic-addon1">{" "}Body{" "}</span>
          <input type="text" className="form-control" value={formData.body} name="body" onChange={handleInput}/>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      
        {/* submitted data */}
        {todos.map(item => (
          <div className='p-3' key={item.id}>
            <button type="button" onClick={() => handleClear(item.id)}>Delete</button>
            <h1>{item.title}</h1>
            <span>{item.body}</span>
          </div>
        ))}
        
        </div>
        )}
        <hr/>
    </div>        
  );
}
