import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default function TodoApp() {
  
  // hooks
  const [todos, setTodos] = useState([]); // populating data
  const [formData, setFormData] = useState({ id: '', name: '', text: '', });
  const [isContentVisible, setIsContentVisible] = useState(false);
  // const [backgroundColor, setBackgroundColor] = useState('bg-primary');

  // random color
  // const randomColor = (id) => {
  //   const element = document.getElementById(id);
  //   const colors = ['bg-primary', 'bg-success', 'bg-danger', 'bg-dark'];
  //   var color = colors[Math.floor(Math.random() * colors.length)];
  //   element.classList.add(color);
  //   //return color;
  // };
  
  // toggle content
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
  }, [] );

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
      // setBackgroundColor(randomColor());
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // delete item
  const handleClear = (id) => {
    axios.delete(`app/${id}/`)
    .then(response => {
      console.log(response.data);
      getTodos();
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div>
      <div class="d-flex h2 w-100 p-3 mt-3 bg-info text-light justify-content-between">
      <i class="m-2 fa-solid fa-terminal"></i>Todo App for testing django-restframework & react<i class="cursor-like m-2 fa-solid fa-sort" onClick={toggleContent}></i>
      </div>
      {isContentVisible && (
      <div>
        <h6 className="p-3"><a href="/app/">Rendering API endpoint</a></h6>
        <hr/>
        <h4 className="p-3">Use the form to add data:</h4>
        
        {/* form */}
        <form className="p-3" onSubmit={handleSubmit}>
          <span className="input-group-text" id="basic-addon1">{" "}Title{" "}</span>
          <input type="text" className="form-control" value={formData.title} name="title" onChange={handleInput}/>
          <span className="input-group-text" id="basic-addon1">{" "}Body{" "}</span>
          
          {/*<div className="form-check"> 
             
            <input className="form-check-input" type="checkbox" value={formData.is_completed} name="is_completed" onChange={handleInput}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">Completed</label>
            
            <input className="form-check-input" type="checkbox" value={formData.is_completed} name="is_completed" onChange={handleInput}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">Completed</label>

            <input className="form-check-input" type="checkbox" value={formData.is_completed} name="is_completed" onChange={handleInput}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">Completed</label>
           
           </div> */}

          <input type="text" className="form-control" value={formData.body} name="body" onChange={handleInput}/>
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
      
        {/* submitted data */}
        {todos.map(item => (
          <div className='p-3' key={item.id}>
          <div id={`${item.id}`} className={`d-flex h6 text-light p-3 mb-n1 justify-content-between bg-dark`}>  {/* ${() => randomColor(item.id)}`}> */}
              <span>{item.title}</span><span></span><i class="cursor-like fa-solid fa-trash" onClick={() => handleClear(item.id)}></i>
          </div> 
          <div className="border border-secondary rounded bg-light p-5">
              <h6>{item.body}</h6>
          </div>
      </div>
        ))}

        </div>
        )}
        <hr/>
    </div>        
  );
}

