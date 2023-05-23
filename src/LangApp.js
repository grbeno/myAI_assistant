import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './app.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const Button = ({ name, onClick, isActive }) => {
    const buttonStyle = isActive ? 'btn btn-primary mr-3' : 'btn btn-secondary mr-3';
    return (
      <button className={buttonStyle} onClick={onClick}>
        {name}
      </button>
    );
};

export default function LangApp() {
  
    // hooks
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [langAppData, setLangAppData] = useState([]); // populating data
    const [formData, setFormData] = useState({ prompt: ''});
    const [activeButton, setActiveButton] = useState(1);  // 1 = English, 2 = Deutsch

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

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

    //console.log(activeButton);

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
                <div className="p-3"> 
                    <span className="input-group-text" id="basic-addon1">{" "}Choose language{" "}</span>
                    <div className="d-flex mt-2 justify-content-start">
                        <Button onClick={() => handleButtonClick(1)} isActive={activeButton === 1} name='English' />
                        <Button onClick={() => handleButtonClick(2)} isActive={activeButton === 2} name='Deutsch' />     
                    </div>
                </div>
                
                {/* send prompt */}
                <form className="p-3" onSubmit={handleSubmit}>
                    <span className="input-group-text" id="basic-addon1">{" "}Prompt{" "}</span>
                    <textarea className="form-control" type="text" value={formData.prompt} name="prompt" onChange={handleInput}/>
                    <button className="btn btn-primary mt-2" type="submit">Response</button>
                </form>
            
                {/* submitted data */}
                {langAppData.map(item => (
                    <div className='p-3' key={item.id}>
                        <div class="d-flex h6 text-light bg-dark p-3 mb-n1 justify-content-between">
                            <span>{item.prompt}</span><span></span><i class="cursor-like fa-solid fa-trash" onClick={console.log('del-clicked')}></i>
                        </div> 
                        <div className="border border-secondary rounded bg-light p-5">
                            <h6>{item.answer}</h6>
                        </div>
                    </div>
                ))}

            </div>
            )}
            <hr/>
        </div>
    );
}


