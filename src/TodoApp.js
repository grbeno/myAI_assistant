import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default function TodoApp() {
  
  // hooks
  const [todos, setTodos] = useState([]); // populating data
  const [formData, setFormData] = useState({ title: '', color: '', body: '', });
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [sendId, setSendId] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [updateData, setUpdateData] = useState({title: '', color: ''}); 
  
  // Toggle content
  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  // Get data from database
  
  const getTodos = () => {
    axios.get('/app/')
    .then(res => {
      setTodos(res.data);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Call getTodos on component mount
  
  useEffect(() => {
    getTodos();
  }, [] );

  // Handle input
  
  const handleInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle submit
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/app/', {
      title: formData.title,
      color: formData.color,
      body: formData.body,
      user: todos.user,
    })
    .then((res) => {
      const newItem = {
        id: res.data.id,
        title: res.data.title,
        color: res.data.color,
        body: res.data.body,
      };
      setFormData((prevFormData) => ({ 
        ...prevFormData,
        title: '',
        color: '',
        body: '' 
      }));  // clearing form
      setTodos((prevTodos) => [...prevTodos, newItem]);  // rendering
    })
    .catch((err) => {
      console.log(err);
    });

  };

   // Update item

  const returnTodo = () => {
    setFormData((prevFormData) => ({ 
      ...prevFormData,
      title: '',
      color: '',
      body: '' 
    }));
    setIsButtonVisible(!isButtonVisible);
    setSendId(null);
    getTodos();
  };

  const updateItem = (id) => {
    // find the item by id to be updated
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      // show information about the item
      setUpdateData({
        title: todo.title, 
        color: todo.color
      });
      // reload form with the appropriate data
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: todo.title,
        color: todo.color,
        body: todo.body
      }));
    }
    setTodos([]);
    setSendId(id);
    // make invisible the submit button
    setIsButtonVisible(!isButtonVisible);
  };

  // Apply put method to update item
  const handleUpdate = () => {
    axios.put(`/app/${sendId}/`, {
      title: formData.title,
      color: formData.color,
      body: formData.body,
    })
    .then((res) => {
      //console.log(res.data);
      setUpdateData({title: '', color: ''});
      // clear form after update
      setFormData((prevFormData) => ({ 
        ...prevFormData,
        title: '',
        color: '',
        body: ''
      }));
      setIsButtonVisible(!isButtonVisible);
      setSendId(null);
      getTodos();
    })
    .catch(err => {
      console.log(err);
    });
  };

  // Delete item
  
  const handleClear = (id) => {
    axios.delete(`/app/${id}/`)
    .then(res => {
      console.log(res.data);
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
        <h4 className="p-3">Todo App with form</h4>
        <ul>
          <li>CRUD</li>
          <li>Priority radio buttons</li>
          <li>Priority colours for label backgrounds of answer boxes.</li>
        </ul>
        
        {/* form */}
        <form className="p-3 pb-0" onSubmit={handleSubmit}>
          <span className={`p-3 mb-3 h6 text-light ${updateData.color}`} style={{ display: isButtonVisible ? 'none' : 'block' }}>Update this: {updateData.title}</span>
          <span className="input-group-text" id="basic-addon1">{" "}Task{" "}</span>
          <input className="form-control" type="text" value={formData.title} name="title" onChange={handleInput}/>
          <span className="input-group-text mt-4" id="basic-addon1">{" "}Priority{" "}</span>
          <div className='mx-2'>
            <input type="radio" name="color" value="bg-info" checked={formData.color === 'bg-info'} id="low-priority" onChange={handleInput}/>
            <label for="low-priority" className="p-2 text-info">Low</label>
            <input type="radio" name="color" value="bg-success" checked={formData.color === 'bg-success'} id="medium-priority" onChange={handleInput}/>
            <label for="medium-priority" className="p-2 text-success">Medium</label>
            <input type="radio" name="color" value="bg-danger" checked={formData.color === 'bg-danger'} id="high-priority" onChange={handleInput}/>
            <label for="high-priority" className="p-2 text-danger">High</label>
          </div>
          <span className="input-group-text" id="basic-addon1">{" "}Description{" "}</span>
          <textarea type="text" className="form-control" value={formData.body} name="body" onChange={handleInput}/>
          <button type="submit" className="btn btn-primary mt-3" style={{ display: isButtonVisible ? 'block' : 'none' }}>Submit</button>
        </form>
        <div class="p-3 pt-0" style={{ display: isButtonVisible ? 'none' : 'block' }}>
          <button type="submit" className="btn btn-primary" onClick={() => handleUpdate()}>Update</button>
          <button data-toggle="tooltip" title="Return" className="btn btn-success mx-3" onClick={() => returnTodo()}><i class="fa-solid fa-rotate-left"></i></button>
        </div>
        
        {/* submitted data */}
        {
          todos.map((item) => {
            return (
              <div className='p-3' key={item.id}>
                <div className={`d-flex h6 text-light p-3 mb-n1 justify-content-between ${item.color}`}>
                    <span>{item.title}</span><span></span><span><i data-toggle="tooltip" title="Edit" class="cursor-like fa-solid fa-pen-to-square mx-4" onClick={() => updateItem(item.id)}></i><i data-toggle="tooltip" title="Delete" class="cursor-like fa-solid fa-trash" onClick={() => handleClear(item.id)}></i></span>
                </div> 
                <div className="border border-secondary rounded bg-light p-5">
                    <h6>{item.body}</h6>
                </div>
              </div>
            );
          })
        }
        </div>
      )}
      <hr/>
    </div>        
  );
}

