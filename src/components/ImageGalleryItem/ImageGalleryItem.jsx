import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemStyles } from "./ImageGalleryItem.styled";
import Modal from "../Modal/Modal";

const ImageGalleryItem = ({ url, tags }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const getLargeImg = url => {
    toggleModal();
    setModalImg(url);
  };

  return (
    <>
      <ImageGalleryItemStyles>
        <img
          className="image"
          src={url}
          alt={tags}
          onClick={() => getLargeImg(url)}
        />
      </ImageGalleryItemStyles>
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
