import React, { useEffect } from 'react'
import Nav from '../components/Global/Nav'
import Footer from '../components/Global/Footer'
import { Route, Switch } from 'react-router-dom'
import Ranking from './Ranking'
import Vote from './Vote'
import useKonami from '../hooks/useKonami'
import EasterEgg from '../components/Global/EasterEgg'

function App () {
  const [konami, setKonami] = useKonami(['4', '2'])

  useEffect(() => {
    document.body.classList.add('bg-black')
    return () => {
      document.body.classList.remove('bg-black')
    }
  }, [])
  return (
    <>
      <Nav />
      <EasterEgg konami={konami} setKonami={setKonami} />
      <Switch>
        <Route exact path='/app/home'><Ranking /></Route>
        <Route exact path='/app/vote'><Vote /></Route>
      </Switch>
      <Footer />
    </>
  )
}

export default App
