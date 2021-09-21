import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    modalImg: PropTypes.object,
    onClose: PropTypes.func,
  };

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
  };

  handleKeyDown = (e) => {
    if(e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if(e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg } = this.props;
    return (
        <div className={styles.Overlay} onClick={this.handleOverlayClick}>
            <div className={styles.Modal}>
                <img src={modalImg.largeImageURL} alt={modalImg.tags} />
            </div>
        </div>
    )
  }
}

export { Modal };