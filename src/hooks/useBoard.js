import { useContext } from 'react'
import { BoardContext } from '../contexts/BoardProvider'
import { TURNS, WINNER_SETS } from '../utils/config'
import confetti from 'canvas-confetti'
import { AUDIOS, playSound } from '../utils/player'

const useBoard = () => {
  const { board, setBoard, turn, setTurn, winner, setWinner, muted, setMuted } = useContext(BoardContext)

  const updateBoard = index => {
    // if the square is already filled or there is a winner, do nothing
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    if (turn === TURNS.o) {
      !muted && playSound(AUDIOS.circle)
    } else {
      !muted && playSound(AUDIOS.cross)
    }

    // check if there is a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setTimeout(() => {
        setWinner(newWinner)
        // create confetti effect
        confetti({
          // how many confetti particles will be created
          particleCount: 200,
          // how long the confetti will last
          ticks: 300
        })
        // Play audio when there is a winner
        !muted && playSound(AUDIOS.winner)
        clearLocalStorage()
      }, 300)
    } else if (newBoard.every(square => square !== null)) {
      setTimeout(() => {
        // if the board is full it's a tie
        setWinner('Nobody')
        clearLocalStorage()
        !muted && playSound(AUDIOS.tie)
      }, 300)
    } else {
      const nextTurn = turn === TURNS.x ? TURNS.o : TURNS.x
      // change the turn
      setTurn(nextTurn)
      window.localStorage.setItem('board', JSON.stringify(newBoard))
      window.localStorage.setItem('turn', JSON.stringify(nextTurn))
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
    !muted && playSound(AUDIOS.reset)
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return {
    board,
    turn,
    winner,
    updateBoard,
    restartBoard,
    muted,
    setMuted
  }
}

export default useBoard
