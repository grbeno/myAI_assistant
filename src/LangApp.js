import React, {useState} from 'react';
import './App.css';

export default function LangApp() {
  
    // hooks
    const [isContentVisible, setIsContentVisible] = useState(false);
    /* const [langAppData, setLangAppData] = useState([]); // populating data
    const [formData, setFormData] = useState({ prompt: ''}); */

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    };

    // style
    /* const cursorStyle = {
        cursor: 'pointer',
    }; */

    /* // get langAppData
    const getLangAppData = () => {
        axios.get('/app/')
        .then(res => {
            setLangAppData(res.data);
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
        axios.post('/app/', {  
            prompt: formData.prompt,
        })
        .then((res) => {
            const newItem = {
                prompt: formData.prompt,
            };
            setFormData({ prompt: ''});
            setLangAppData((prevLangAppData) => [...prevLangAppData, newItem]);
        })
        .catch(err => {
            console.log(err);
        });
    }; */

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
                {/* <form onSubmit={handleSubmit}>
                    <span className="input-group-text" id="basic-addon1">{" "}Prompt{" "}</span>
                    <input type="text" className="form-control" value={formData.prompt} name="prompt" onChange={handleInput}/>
                    <button type="submit" className="btn btn-primary">Response</button>
                </form> */}
            
                {/* submitted data */}
                {/* {langAppData.map(item => (
                    <div className='p-3' key={item.id}>
                        <h4>{item.prompt}</h4>
                        <span>{item.answer}</span>
                     </div>
                ))} */}
            </div>
            )}
            <hr/>
        </div>
    );
}


