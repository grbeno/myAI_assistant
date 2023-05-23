import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './app.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default function LangApp() {
  
    // hooks
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [langAppData, setLangAppData] = useState([]); // populating data
    const [formData, setFormData] = useState({ prompt: ''});

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    };

    // get langAppData
    const getLangAppData = () => {
        axios.get('/lang/')
        .then(res => {
            setLangAppData(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });    
    }

    // call getLangAppData on component mount
    useEffect(() => {
        getLangAppData();
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
        axios.post('/lang/', {  
            prompt: formData.prompt,
        })
        .then((res) => {
            const newItem = {
                prompt: formData.prompt,
                answer: res.data.answer,
            };
            setFormData({ prompt: '', answer: ''});
            setLangAppData((prevLangAppData) => [...prevLangAppData, newItem]);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <div class="d-flex h2 w-100 p-3 mt-3 bg-info text-light justify-content-between">
            <i class="m-2 fa-solid fa-chalkboard-user"></i>Language Assistant<i class="cursor-like m-2 fa-solid fa-sort" onClick={toggleContent}></i>
            </div>  
            {isContentVisible && (
            <div>
                <h4 className='p-3'>Language Assistant plan</h4>
                <ul>
                    <li>Gramatical correction in English and German.</li>
                    <li>Usage suggestion.</li>
                </ul>

                {/* choose language */}
                <div className="d-flex p-3 justify-content-start">
                    <button className="btn btn-primary mr-3">English</button>
                    <button className="btn btn-primary">Deutsch</button>     
                </div>
                
                {/* send prompt */}
                <form className="p-3" onSubmit={handleSubmit}>
                    <span className="input-group-text" id="basic-addon1">{" "}Prompt{" "}</span>
                    <input type="text" className="form-control" value={formData.prompt} name="prompt" onChange={handleInput}/>
                    <button type="submit" className="btn btn-primary mt-2">Response</button>
                </form>
            
                {/* submitted data */}
                {langAppData.map(item => (
                    <div className='p-3' key={item.id}>
                        <h6 className='text-secondary'>{item.prompt}</h6>
                        <h6>{item.answer}</h6>
                     </div>
                ))}

            </div>
            )}
            <hr/>
        </div>
    );
}


