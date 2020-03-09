import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { TWO_PLAYERS, VERSUS_PLAYERS } from '../utils/graphql'
import { Container, Spinner, Row, Col, Button } from 'react-bootstrap'
import Avatar from 'react-avatar'
import Fade from 'react-reveal/Fade'
import { Redirect } from 'react-router-dom'

function Vote () {
  const { loading, error, data, refetch } = useQuery(TWO_PLAYERS, { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true })
  const [versusPlayers] = useMutation(VERSUS_PLAYERS)

  if (loading) return <div className='text-center'><Spinner animation='border' variant='primary' /></div>
  if (error) return `Error! ${error.message}`

  const handleVote = ([player1, player2], player1Win) => {
    versusPlayers({
      variables: {
        idPlayer1: player1.id,
        idPlayer2: player2.id,
        player1Win: player1Win
      }
    })
    refetch()
  }

  return (
    !(data && data.twoPlayers)
      ? <Redirect to='/auth/login' />
      : <Fade>
        <Container className='d-flex justify-content-center mt-3 raleway midScroll'>
          <Row>
            <Col>
              <Avatar src={data.twoPlayers[0].img} size={450} round='5px' />
              <p className='text-center mt-2 text-light'>{data.twoPlayers[0].name}</p>
              <div className='d-flex justify-content-center mt-3'>
                <Button variant='primary' onClick={() => handleVote(data.twoPlayers, true)}>Vote</Button>
              </div>
            </Col>
            <Col className='d-flex justify-content-center flex-column'>
              <h1 className='text-primary' id='versus'>Vs</h1>
            </Col>
            <Col>
              <Avatar src={data.twoPlayers[1].img} size={450} round='5px' />
              <p className='text-center mt-2 text-light'>{data.twoPlayers[1].name}</p>
              <div className='d-flex justify-content-center mt-3'>
                <Button variant='primary' onClick={() => handleVote(data.twoPlayers, false)}>Vote</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Fade>
  )
}

export default Vote
