import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalBackdropStyle } from "./Modal.styled";
import { ReactComponent as CloseIcon } from "../../icon/close.svg";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, onClose }) => {
    useEffect(() => {
      const clickEsc = event => {
        if (event.code === 'Escape') {
          onClose();
        }
      };
  
      window.addEventListener('keydown', clickEsc);
  
      return () => {
        window.removeEventListener('keydown', clickEsc);
      };
    }, [onClose]);
  
    const clickBackdrop = event => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    return createPortal(
        <ModalBackdropStyle onClick={clickBackdrop}>
            <div className="modal">
                <button type="button" className="close-btn" onClick={onClose}>
                    <CloseIcon className="close-icon" width="40" height="40" />
                </button>
                <img src={url} alt="modal" />
            </div>
        </ModalBackdropStyle>,
        modalRoot
    );
};

Modal.propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
