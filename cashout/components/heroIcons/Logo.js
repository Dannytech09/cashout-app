import Image from 'next/image';
import styles from '../../styles/SideBar.module.css'

const Logo = () => {
  return (
  <Image className={styles.logoImg} src="/cashout-img.png" alt="logo" width="30" height="50"/>
  )
}

export default Logo