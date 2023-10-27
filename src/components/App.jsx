import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { getImages, PER_PAGE } from "../Api/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button';
import { Loader } from "./Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [shouldShowLoadMore, setShouldShowLoadMore] = useState(false);

  useEffect(() => {
    const fetchLoad = async () => {
      setLoading(true);

      try {
        const response = await getImages(inputValue, page);
        if (response.hits.length === 0) {
          toast.error('Sorry, there are no images matching your search query. Please try again.');
        }

        setImages(prevImages => [...prevImages, ...response.hits]);
        setShouldShowLoadMore(page < Math.ceil(response.totalHits / PER_PAGE));
      } catch (error) {
        toast.error('Sorry, there was an error. Please try again.');
        setStatus('rejected');
      } finally {
        setLoading(false);
      }
    };

    if (inputValue && page) {
      fetchLoad();
    }
  }, [inputValue, page]);

  const getInputValue = handleValue => {
    setInputValue(handleValue);
    setPage(1);
    setShouldShowLoadMore(false);
    setImages([]);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar getInputValue={getInputValue} />
      {images.length > 0 && <ImageGallery images={images} />}
      {shouldShowLoadMore && <Button loadMoreBtn={loadMoreBtn} />}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {(status === 'pending' || loading) && <Loader />}
    </>
  );
};

export default App;
