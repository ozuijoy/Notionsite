import Image from 'next/image'
import Link from 'next/link'
import siteConfig from 'site.config'

import styles from '@/styles/components/HomeButton.module.css'

export function HomeButton() {
  return (
    <Link href='/' className={styles.homeButton}>
      <Image
        className={styles.icon}
        src='/icon.png'
        alt='favicon'
        width={42}
        height={42}
      />
      <div className={styles.textContainer}>
        <span className={styles.name}>{siteConfig.name}</span>
        <span className={styles.description}>{siteConfig.description}</span>
      </div>
    </Link>
  )
}
