import { useState } from 'react'
import Square from './Square'
import Button from './Button'
import confetti from 'canvas-confetti'
import Modal from './Modal'

const Board = () => {
  const turns = {
    x: '❌',
    o: '⭕'
  }
  const winnerSets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const getBoardFromLocalStorage = () => {
    const boardFromLocalStorage = JSON.parse(window.localStorage.getItem('board'))
    return boardFromLocalStorage ?? Array(9).fill(null)
  }

  const getTurnFromLocalStorage = () => {
    const turnFromLocalStorage = JSON.parse(window.localStorage.getItem('turn'))
    return turnFromLocalStorage ?? turns.x
  }

  const [board, setBoard] = useState(getBoardFromLocalStorage())
  const [turn, setTurn] = useState(getTurnFromLocalStorage())
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return // if the square is already filled or there is a winner, do nothing

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard) // check if there is a winner
    if (newWinner) {
      setWinner(newWinner)
      confetti({ // create confetti effect
        particleCount: 200, // how many confetti particles will be created
        ticks: 300 // how long the confetti will last
      })
      clearLocalStorage()
    } else if (newBoard.every((square) => square !== null)) { // if the board is full
      setWinner('Nobody') // it's a tie
      clearLocalStorage()
    } else {
      const nextTurn = turn === turns.x ? turns.o : turns.x
      setTurn(nextTurn) // change the turn
      window.localStorage.setItem('board', JSON.stringify(newBoard)) // save the board to local storage
      window.localStorage.setItem('turn', JSON.stringify(nextTurn)) // save the board to local storage
    }
  }

  const checkWinner = (board) => {
    for (const set of winnerSets) {
      const [a, b, c] = set
      if (board[a] && board[a] === board[b] && board[a] === board[c]) { // if all the squares are the same
        return board[a] // return the winner
      }
    }
    return null // no winner
  }

  const restartBoard = () => {
    setBoard(Array(9).fill(null)) // reset the board
    setTurn(turns.x) // reset the turn
    setWinner(null) // reset the winner
    clearLocalStorage() // clear the local storage
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <>
      <main className='flex flex-col justify-center items-center gap-10 container text-white'>
        <h1 className='text-5xl font-bold'>TicTacToe</h1>
        <Button click={restartBoard}>Reset</Button>
        <section className='grid grid-cols-3 gap-3'>
          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                  hoverable
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>

        <section className='flex gap-5'>
          <Square isSelected={turn === turns.x}>{turns.x}</Square>
          <Square isSelected={turn === turns.o}>{turns.o}</Square>
        </section>

        {winner && (
          <Modal>
            <h2 className='text-3xl font-bold text-black mb-4'>
              {winner === 'Nobody' ? 'It\'s a tie!' : 'Winner!'}
            </h2>
            <p className='text-5xl font-bold text-blue-700 text-center mb-8'>
              {winner === 'Nobody' ? '🙁' : winner}
            </p>
            <Button click={restartBoard}>Reset</Button>
          </Modal>
        )}
      </main>
    </>
  )
}

export default Board
