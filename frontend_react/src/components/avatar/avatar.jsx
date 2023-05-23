import React from "react"
import styles from "./avatar.module.css"

const Avatar = () => {
  const imageSource = "/src/assets/avatar-crop.jpg"

  return (
    <div className={styles.avatar_container}>
      <div className={styles.avatar_wrapper}>
        <img className={styles.avatar} src={imageSource} alt="Avatar" />
      </div>
    </div>
  )
}

export default Avatar
