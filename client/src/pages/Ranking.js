import React from 'react'
import { Container, Card, Spinner } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { ALL_PLAYERS } from '../utils/graphql'
import Avatar from 'react-avatar'
import TypeIt from 'typeit-react'
import Fade from 'react-reveal/Fade'
import { Redirect } from 'react-router-dom'

function Ranking () {
  const { loading, error, data } = useQuery(ALL_PLAYERS, { fetchPolicy: 'no-cache' })

  if (loading) return <div className='text-center'><Spinner animation='border' variant='primary' /></div>
  if (error) return `Error! ${error.message}`
  const items = (data && data.allPlayers) && data.allPlayers.map((player, index) =>
    <Card key={player.id} className='flex-row p-2 m-4'>
      <div className='d-flex justify-content-center flex-column ml-2 mr-3'>
        <TypeIt
          className='rank text-primary'
          options={{
            strings: (index + 1).toString() + '.',
            speed: 150,
            cursor: false,
            startDelay: (index * 150 + 700)
          }}
        />
      </div>
      <Avatar src={player.img} round='50px' />
      <div className='d-flex justify-content-center flex-column ml-4 p-2 raleway'>
        <h4 className='font-weight-bold text-dark'>{player.name}<span className='text-primary'>{` - ${Number(player.elo).toFixed(3)}`}</span></h4>
        <p className='font-italic'>{`" ${player.misc}. "`}</p>
      </div>
    </Card>
  )

  return (!items ? <Redirect to='/auth/login' />
    : <Fade>
      <Container className='mt-4 midScroll'>
        {items}
      </Container>
      </Fade>
  )
}

export default Ranking
