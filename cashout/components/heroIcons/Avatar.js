import Image from "next/image";
import styles from "../../styles/SideBar.module.css";

const Avatar = () => {
  return (
    <div className="relative w-10 h-10">
      <Image
        className={styles.logoImg}
        src="/avatar.png"
        alt="logo"
        width="50"
        height="50"
      />
      <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
    </div>
  );
};

export default Avatar;
