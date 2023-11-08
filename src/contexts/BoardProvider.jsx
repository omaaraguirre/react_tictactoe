import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { TURNS } from '../utils/config'

export const BoardContext = createContext()

const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(() =>
    JSON.parse(window.localStorage.getItem('board')) ?? Array(9).fill(null)
  )
  const [turn, setTurn] = useState(() =>
    JSON.parse(window.localStorage.getItem('turn')) ?? TURNS.x
  )
  const [muted, setMuted] = useState(() =>
    JSON.parse(window.localStorage.getItem('muted')) ?? false
  )
  const [winner, setWinner] = useState(null)

  return (
    <BoardContext.Provider value={{
      board,
      setBoard,
      turn,
      setTurn,
      winner,
      setWinner,
      muted,
      setMuted
    }}
    >
      {children}
    </BoardContext.Provider>
  )
}

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default BoardProvider
