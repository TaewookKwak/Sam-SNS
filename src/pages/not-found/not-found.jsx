import React, { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not Found - Sams SNS'
  }, [])
  return <div>NOT FOUND...</div>
}

export default NotFound
