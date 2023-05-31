import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default function TodoApp() {
  
  // hooks
  const [todos, setTodos] = useState([]); // populating data
  const [formData, setFormData] = useState({ id: '', title: '', color: '', body: '', });
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [labelColor, setLabelColor] = useState({});
  
  // const [backgroundColor, setBackgroundColor] = useState({});

  // random color
  // const randomColor = () => {
  //   const colors = ['bg-primary', 'bg-success', 'bg-danger', 'bg-dark'];
  //   return colors[Math.floor(Math.random() * colors.length)];
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
      console.log(res.data);
      // Save state data
      // localStorage.setItem('background', JSON.stringify(labelColor));
      // localStorage.clear();
      //console.log(initialState);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // call getTodos on component mount
  useEffect(() => {
    getTodos();
    const savedState = localStorage.getItem('background');
    const initialState = savedState ? JSON.parse(savedState) : {};
    setLabelColor(initialState);
    //console.log(initialState);
  }, [] );

  // handle input
  const handleInput = (event) => {
    event.preventDefault();
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
      color: formData.color,
      body: formData.body,
    })
    .then((res) => {
      const newItem = {
        id: res.data.id,
        title: formData.title,
        color: formData.color,
        body: formData.body,
      };
      setFormData({ id: '', title: '', color: '', body: '' });
      setTodos((prevTodos) => [...prevTodos, newItem]);

      // Generate random color if not already assigned
      // const newColor = randomColor();
      // setSelectedColor((prevMap) => ({
      //   ...prevMap,
      //   [res.data.id]: newColor,
      // }));
      
      if (formData.color !== '') {
        setLabelColor((prevMap) => ({
          ...prevMap,
          [res.data.id]: formData.color,
        }));
      }
    
    })
    .catch((err) => {
      console.log(err);
    });
  
    // Save state data
    localStorage.setItem('background', JSON.stringify(labelColor));
    // localStorage.clear();
    
  };

  // delete item
  const handleClear = (id) => {
    axios.delete(`app/${id}/`)
    .then(response => {
      setLabelColor((prevMap) => {
        const updatedMap = { ...prevMap };
        delete updatedMap[id];
        return updatedMap;
      });
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
        <h4 className="p-3">Todo App with form</h4>
        <ul>
          <li>CRUD</li>
          <li>Priority radio buttons</li>
          <li>Random generated colours for label backgrounds of answer boxes.</li>
        </ul>
        
        {/* form */}
        <form className="p-3" onSubmit={handleSubmit}>
          <span className="input-group-text" id="basic-addon1">{" "}Task{" "}</span>
          <input className="form-control" type="text" value={formData.title} name="title" onChange={handleInput}/>
          <span className="input-group-text mt-4" id="basic-addon1">{" "}Priority{" "}</span>
          <div className='mx-2'>
            <input type="radio" name="color" value="bg-info" id="low-priority" onChange={handleInput}/>
            <label for="low-priority" className="p-2">Low</label>
            <input type="radio" name="color" value="bg-success" id="medium-priority" onChange={handleInput}/>
            <label for="medium-priority" className="p-2">Medium</label>
            <input type="radio" name="color" value="bg-danger" id="high-priority" onChange={handleInput}/>
            <label for="high-priority" className="p-2">High</label>
          </div>
          <span className="input-group-text" id="basic-addon1">{" "}Description{" "}</span>
          <textarea type="text" className="form-control" value={formData.body} name="body" onChange={handleInput}/>
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
        
        {/* submitted data */}
        {
          todos.map((item) => {
            // console.log(labelColor);
            console.log(labelColor);
            const bgColor = labelColor[item.id]; // || 'bg-success'; // Retrieve assigned color or empty string
            return (
              <div className='p-3' key={item.id}>
                <div id={item.id.toString()} className={`d-flex h6 text-light p-3 mb-n1 justify-content-between ${bgColor}`}>  {/* ${() => randomColor(item.id)}`}> */}
                    <span>{item.title}</span><span></span><i class="cursor-like fa-solid fa-trash" onClick={() => handleClear(item.id)}></i>
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

