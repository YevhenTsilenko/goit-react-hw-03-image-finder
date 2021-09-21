import React, { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { Modal } from './components/Modal/Modal';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import './App.css';

class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    query: '',
    showModal: false,
    modalImg: '',
  };

  handleFormSubmit = (query) => {
    this.setState({query});
  };

  openModal = (modalImg) => {
    this.setState({
      showModal: true,
      modalImg,
    })
  } 

  closeModal = () => {
    this.setState({showModal: false})
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} onClick={this.openModal}/>
        {this.state.showModal && <Modal modalImg={this.state.modalImg} onClose={this.closeModal}/>}
      </div>
    );
  }
}

export default App;
