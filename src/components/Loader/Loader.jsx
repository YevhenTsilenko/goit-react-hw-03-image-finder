import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoaderSpinner from "react-loader-spinner";
import styles from './Loader.module.css';

function Loader () {
    return (
        <div className={styles.Loader}>
            <LoaderSpinner
                type="Circles"
                color="#3f51b5"
                height={100}
                width={100}
                timeout={5000}
                margin-left={300} 
            />
        </div>
        
    );
} 

export { Loader };