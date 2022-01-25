import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import styles from './write.module.css'
import * as ROUTES from '../../constants/routes'
import { useHistory } from 'react-router-dom'
const Write = () => {
  const history = useHistory()
  const handleGotoWrite = () => {
    history.push(ROUTES.WRITE)
  }
  return (
    <div onClick={handleGotoWrite} className={styles.icon}>
      <FontAwesomeIcon icon={faPen} />
    </div>
  )
}

export default Write
