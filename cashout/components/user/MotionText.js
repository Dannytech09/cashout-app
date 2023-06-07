import React from "react";
import styles from "../../styles/MotionText.module.css";

const MotionText = ({ text }) => {
  return ( 
    <div className={`${styles.motionTextContainer} text-xs`}>
        <div className={styles.motionText}>{text}</div>;
    </div>

  )
};

export default MotionText;
