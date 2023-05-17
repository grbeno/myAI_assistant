import React, {useState} from 'react';

function ImgGen() {

  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  const cursorStyle = {
    cursor: 'pointer',
  };

  return (
    <div>
      <div class="d-flex h2 w-100 p-3 mt-3 bg-secondary text-light justify-content-between">
      Image Generator soon ...<i class="m-2 fa-solid fa-sort" style={cursorStyle} onClick={toggleContent}></i>
      </div>  
      {isContentVisible && (
      <div>
        <h4 className='p-3'>Image Generator soon ...</h4>
      </div>
      )}
    </div>
  );
}

export default ImgGen;