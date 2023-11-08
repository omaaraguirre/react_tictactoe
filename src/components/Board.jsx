import useBoard from '../hooks/useBoard'
import SoundsButton from './SoundsButton'
import Button from './Button'
import Square from './Square'
import Modal from './Modal'
import TurnIndicator from './TurnIndicator'

const Board = () => {
  const { board, winner } = useBoard()

  return (
    <main className='flex-1 flex flex-col justify-center items-center gap-10 container mx-auto text-white font-orbitron relative'>
      <SoundsButton />
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
  )
}

export default Board
