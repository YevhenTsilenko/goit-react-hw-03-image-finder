import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { fetchImages } from '../../services/imagesApiService';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
    openModal: PropTypes.func,
  };

  state = {
    images: [],
    error: null,
    page: 1,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
      if(prevProps.query !== this.props.query) {
        this.setState({status: 'pending', images: [], page: 1});
        await this.getImagesAfterNewSearch();
      }
      if(prevState.page !== this.state.page && this.state.page > 1) {
        this.setState({status: 'pending-ready'});
        await this.getImagesFromNextPage();
        this.scrollDown();
      }
  };
  
  getImagesAfterNewSearch = async () => {

    await fetchImages(this.props.query, this.state.page)
      .then(images => {
        this.setState({images: images.hits, status: 'resolved'});
      })
    .catch (error => this.setState({error, status: 'rejected'}))
  };

  getImagesFromNextPage = async () => {
    
    await fetchImages(this.props.query, this.state.page)
      .then(images => {
        const imagesArray = images.hits;
        this.setState((prevState) => ({images: [...prevState.images, ...imagesArray], status: 'resolved'}));
      })
      .catch (error => this.setState({error, status: 'rejected'}));
  };

  scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleLoadMore = () => {
      this.setState((prevState) =>{
          return {page: prevState.page + 1}
      })
  };

  render() {
      const {status, images, error} = this.state;

      if(status === 'idle') {
        return <p className={styles.text_before_search}>You can find everything you want</p>
      }

      if(status === 'pending') {
        return <Loader />
      }

      if(status === 'pending-ready') {
        return (
          <>
            <ul className={styles.ImageGallery}>
                <ImageGalleryItem images={images} onClick={this.props.onClick}/>
            </ul>
            <Loader />
          </>
        )
      }

      if(status === 'rejected') {
        return error;
      }

      if(status === 'resolved') {
        return (
          <>
            <ul className={styles.ImageGallery}>
              <ImageGalleryItem images={images} onClick={this.props.onClick}/>
            </ul>

            {images.length > 0 
              ? <Button onClick={this.handleLoadMore} /> 
              : <p>Try to find something else</p>}
          </>
        )
      }

  }
};

export { ImageGallery };