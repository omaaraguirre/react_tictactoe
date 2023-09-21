import PropTypes from 'prop-types'
import { TURNS } from '../utils/config'
import { createContext, useState } from 'react'

export const BoardContext = createContext()

const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(() =>
    JSON.parse(localStorage.getItem('board')) ?? Array(9).fill(null)
  )
  const [turn, setTurn] = useState(() =>
    JSON.parse(localStorage.getItem('turn')) ?? TURNS.x
  )
  const [winner, setWinner] = useState(null)

  return (
    <BoardContext.Provider value={{
      board,
      setBoard,
      turn,
      setTurn,
      winner,
      setWinner
    }}>
      {children}
    </BoardContext.Provider>
  )
}

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default BoardProvider
