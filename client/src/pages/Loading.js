import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi } from '@fortawesome/free-solid-svg-icons'

function Loading ({ auth, error }) {
  useEffect(() => {
    const loadingClass = !auth ? 'bg_auth' : 'bg_app'

    document.body.classList.add(loadingClass)
    return () => {
      document.body.classList.remove(loadingClass)
    }
  }, [auth])

  return error
    ? <FontAwesomeIcon icon={faWifi} size='2x' id='wifi' />
    : <Spinner animation='border' variant='primary' />
}

export default Loading
