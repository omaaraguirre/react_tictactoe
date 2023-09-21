import Square from './Square'
import Button from './Button'
import Modal from './Modal'
import useBoard from '../hooks/useBoard'
import TurnIndicator from './TurnIndicator'

const Board = () => {
  const { board, winner } = useBoard()

  return (
    <>
      <main className='flex-1 flex flex-col justify-center items-center gap-10 container mx-auto pt-5 text-white'>
        <h1 className='text-5xl font-bold'>TicTacToe</h1>
        <Button />
        <section className='grid grid-cols-3 gap-3'>
          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  hoverable
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>
        <TurnIndicator />
        {winner && <Modal />}
      </main>
    </>
  )
}

export default Board
