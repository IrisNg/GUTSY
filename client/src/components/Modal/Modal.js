import React from 'react';
import ReactDOM from 'react-dom';
import history from '../../history';
import './Modal.css';

const Modal = ({ onAccept, item }) => {
   return ReactDOM.createPortal(
      <div className="modal__background" onClick={() => history.goBack()}>
         <div className="modal__prompt">
            <p className="modal__prompt-message">Are you sure you want to delete this {item}?</p>
            <div className="modal__prompt-buttons">
               <button onClick={onAccept}>
                  <i className="fas fa-trash-alt" />
                  Accept
               </button>
               <button onClick={() => history.goBack()}>Back</button>
            </div>
         </div>
      </div>,
      document.querySelector('#modal')
   );
};
export default Modal;
