import React from 'react';
import axios from 'axios';

function App() {
  
  // states
  const [todos, setTodos] = React.useState([]); // populating data
  const [formData, setFormData] = React.useState({ id: '', name: '', text: '', });

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
  React.useEffect(() => {
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
    //event.preventDefault();
    axios.post('/app/', {
      id: formData.id,
      title: formData.title,
      body: formData.body,
    })
    .then((res) => {
      setFormData({ id: "", title: "", body: "", });
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
      <h4 className="p-3 pt-4">Add new with form rendering with react:</h4>
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

      {/* horizontal separator */}
      <hr style={{
        color: "#000000",
        backgroundColor: "#000000",
        height: 0.5,
        borderColor: "#000000",
      }}/>
    </div>        
  );
}

export default App;
