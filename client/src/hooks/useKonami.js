import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * A simple Hook allowing to use a chosen code sequence. (Konami Code)
 * @link Inspired by https://codesandbox.io/s/yq6lvqxo6x RaedsLab
 * @param  {Object} codeSequence An array of strings representing the code sequence.
 * @return {Object} konami (state) is a boolean indicating whether the code sequence has been typed or not. setKonami changes this boolean.
 */
export default function useKonami (codeSequence) {
  const [konami, setKonami] = useState(false)

  // Keep position in codeSequence.
  const refIndex = useRef(0)

  const onKeyUpCallback = useCallback(e => {
    const onKeyUp = ({ key }) => {
      if (refIndex.current === codeSequence.length - 1) {
        setKonami(true)
      }
      if (
        key != null &&
        codeSequence[refIndex.current] != null &&
        key.toLowerCase() === codeSequence[refIndex.current].toLowerCase()
      ) {
        refIndex.current++
      } else {
        refIndex.current = 0
        setKonami(false)
      }
    }
    onKeyUp(e)
  }, [])

  useEffect(() => {
    window.addEventListener('keyup', onKeyUpCallback)
    return () => {
      window.removeEventListener('keyup', onKeyUpCallback)
    }
  }, [onKeyUpCallback])

  return [konami, setKonami]
}
