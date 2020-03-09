import React, { useEffect } from 'react'
import Fade from 'react-reveal/Fade'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NoMatch404 () {
  useEffect(() => {
    document.body.classList.add('bg_auth')
    return () => {
      document.body.classList.remove('bg_auth')
    }
  }, [])

  return (
    <div>
      <Fade>
        <h2 className='raleway text-danger mb-3'>404 Page Not Found</h2>
        <Link to='/app/home'><Button className='raleway' variant='danger'>Back</Button></Link>
      </Fade>
    </div>
  )
}

export default NoMatch404
