import React from 'react'
import { Modal, ResponsiveEmbed } from 'react-bootstrap'

function EasterEgg ({ konami, setKonami }) {
  return (
    <Modal show={konami} onHide={() => setKonami(false)}>
      <Modal.Header className='bg-primary' closeButton>
        <Modal.Title>The Answer is</Modal.Title>
      </Modal.Header>
      <Modal.Body className='embed-responsive'>
        <ResponsiveEmbed aspectRatio='16by9'>
          <iframe title='42' width='560' height='315' src='https://www.youtube.com/embed/jwEPCn6lRo4?start=76&autoplay=1' frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
        </ResponsiveEmbed>
      </Modal.Body>
    </Modal>
  )
}

export default EasterEgg
