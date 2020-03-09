import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { LOGOUT, ME } from '../../utils/graphql'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav as Navigation, Button } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

function Nav () {
  const history = useHistory()
  const [user, setUser] = useState('')
  useQuery(ME, {
    onCompleted (data) {
      if (data.me) setUser(data.me.firstName + ' ' + data.me.lastName)
    },
    fetchPolicy: 'no-cache'
  })

  const [logout] = useMutation(
    LOGOUT, {
      onCompleted () {
        history.push('/auth/login')
      }
    })

  return (
    <Navbar bg='dark' className='raleway'>
      <Navbar.Brand id='facemash' className='text-primary'>FaceMash</Navbar.Brand>
      <Navigation className='mr-auto'>
        <Navigation.Link className='text-light' as={Link} to='/app/home'>Ranking</Navigation.Link>
        <Navigation.Link className='text-light' as={Link} to='/app/vote'>Vote</Navigation.Link>
      </Navigation>
      <Navbar.Collapse className='justify-content-end'>
        <Navbar.Text className='text-light'>
          Hello <span className='font-weight-bold text-capitalize'>{user}</span>.
        </Navbar.Text>
        <Button onClick={logout} className='ml-3' variant='primary'><FontAwesomeIcon icon={faPowerOff} /></Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Nav
