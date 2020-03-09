import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import TypeIt from 'typeit-react'

function Footer () {
  return (
    <footer id='footer'>
      <Container className='mt-2'>
        <Row>
          <Col>
            <TypeIt
              id='facemash'
              options={{
                strings: 'FaceMash',
                speed: 350,
                cursorChar: '.'
              }}
            />
            <p className='text-muted'>PS: 42 is a good number.</p>
          </Col>
          <Col className='raleway'>
            <Row><p>Test Project - TORDJMAN Mickaël</p></Row>
            <Row>
              <FontAwesomeIcon icon={faReact} className='text-danger' size='3x' />
              <Image src='https://www.micktdj.tech/img/graphql.svg' />
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
