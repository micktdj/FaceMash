import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import { useParams } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Register from '../components/Authentication/Register'
import Login from '../components/Authentication/Login'
import TypeIt from 'typeit-react'

function Auth () {
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })
  const { mode } = useParams()

  useEffect(() => {
    document.body.classList.add('bg_auth')
    return () => {
      document.body.classList.remove('bg_auth')
    }
  }, [])

  return (
    <Fade>
      <Container>
        <Row className='bg-black rounded-lg p-5'>
          {!isTabletOrMobileDevice &&
            <Col className='d-flex flex-column justify-content-center'>
              <TypeIt id='typeit' options={{ strings: 'Vote Now.', speed: 150 }} />
            </Col>}
          <Col className='d-flex justify-content-center'>
            {mode === 'register' ? <Register /> : <Login />}
          </Col>
        </Row>
      </Container>
    </Fade>
  )
}

export default Auth
