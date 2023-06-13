import React from 'react';
import styles from "../../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={`${styles.loaderContainer} fixed top-0 left-0 w-full h-full flex items-center justify-center`}>
      <div className={`${styles.loader} border-4 border-t-4 border-gray-200 rounded-full animate-spin-clockwise`} />
    </div>
  )
}

export default Loader;
