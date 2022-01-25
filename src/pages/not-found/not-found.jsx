import React, { useEffect } from 'react'
import Header from '../../components/header/header'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not Found - Sams SNS'
  }, [])
  return (
    <div>
      <Header />
      <div>NOT FOUND...</div>
    </div>
  )
}

export default NotFound
