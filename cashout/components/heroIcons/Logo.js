import Image from 'next/image';
import styles from '../../styles/SideBar.module.css'

const Logo = () => {
  return (
  <Image className={styles.logoImg} src="/favicon.png" alt="logo" width="40" height="50"/>
  )
}

export default Logo