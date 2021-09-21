import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({images, onClick}) {
    return (
        images.map(image => (
            <li key={image.id} className={styles.ImageGalleryItem}>
                <img onClick={() => onClick(image)} src={image.webformatURL} alt={image.tags} className={styles.ImageGalleryItem_image} />
            </li>
        ))
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
};

export { ImageGalleryItem };