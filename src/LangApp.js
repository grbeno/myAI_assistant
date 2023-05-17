import React, {useState} from 'react';

function LangApp() {
  
    const [isContentVisible, setIsContentVisible] = useState(false);

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    };

    const cursorStyle = {
        cursor: 'pointer',
    };
    
    return (
        <div>
            <div class="d-flex h2 w-100 p-3 mt-3 bg-info text-light justify-content-between">
            Language Assistant soon ...<i class="m-2 fa-solid fa-sort" style={cursorStyle} onClick={toggleContent}></i>
            </div>  
            {isContentVisible && (
            <div>
                <h4 className='p-3'>Language Assistant soon ...</h4>
            </div>
            )}
        </div>
    );
}

export default LangApp;

