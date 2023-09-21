import { useContext } from 'react'
import { BoardContext } from '../contexts/BoardProvider'
import { TURNS, WINNER_SETS } from '../utils/config'
import confetti from 'canvas-confetti'

const useBoard = () => {
  const { board, setBoard, turn, setTurn, winner, setWinner } = useContext(BoardContext)

  const updateBoard = index => {
    // if the square is already filled or there is a winner, do nothing
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // check if there is a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      // create confetti effect
      confetti({
        // how many confetti particles will be created
        particleCount: 200,
        // how long the confetti will last
        ticks: 300
      })
      clearLocalStorage()
    } else if (newBoard.every(square => square !== null)) {
      // if the board is full it's a tie
      setWinner('Nobody')
      clearLocalStorage()
    } else {
      const nextTurn = turn === TURNS.x ? TURNS.o : TURNS.x
      // change the turn
      setTurn(nextTurn)
      localStorage.setItem('board', JSON.stringify(newBoard))
      localStorage.setItem('turn', JSON.stringify(nextTurn))
    }
  }

  const checkWinner = board => {
    for (const set of WINNER_SETS) {
      const [a, b, c] = set
      // if all the squares of the winner set are the same
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // return the winner
        return board[a]
      }
    }
    // if no winner
    return null
  }

  const restartBoard = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    clearLocalStorage()
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('board')
    localStorage.removeItem('turn')
  }

  return {
    board,
    turn,
    winner,
    updateBoard,
    restartBoard
  }
}

export default useBoard
