import React, {useState} from 'react';
import './App.css';

export default function CodeExp() {

  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div>
      <div class="d-flex h2 w-100 p-3 mt-3 bg-secondary text-light justify-content-between">
      <i class="m-2 fa-solid fa-laptop-code"></i>Code explainer & analyzer<i class="cursor-like m-2 fa-solid fa-sort" onClick={toggleContent}></i>
      </div>  
      {isContentVisible && (
      <div className='p-3'>
        <h4>Code explainer & analyzer plan</h4>
        <ul>
          <li>Give descriptions about the pasted code snippet.</li>
          <li>Create unittests for individual functions.</li>
          <li>Refactoring, optimizing, correcting the code snippet.</li>
        </ul>
      </div>
      )}
      <hr/>
    </div>
  );
}