import React, {useState} from 'react';
import './app.css';

export default function ImgGen() {

  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div>
      <div class="d-flex h2 w-100 p-3 mt-3 bg-secondary text-light justify-content-between">
      <i class="m-2 fa-regular fa-object-group"></i>Image Generator<i class="cursor-like m-2 fa-solid fa-sort" onClick={toggleContent}></i>
      </div>  
      {isContentVisible && (
      <div className='p-3'>
        <h4>Image Generator plan</h4>
        <ul>
          <li>Generate image by short descriptions.</li>
        </ul>
      </div>
      )}
      <hr/>
    </div>
  );
}
