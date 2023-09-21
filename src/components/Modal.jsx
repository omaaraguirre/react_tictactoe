import useBoard from '../hooks/useBoard'
import Button from './Button'

const Modal = () => {
  const { winner } = useBoard()

  return (
    <div className="fixed z-50 inset-0 overflow-auto bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center">
        <h2 className='text-3xl font-bold text-black mb-4'>
          {winner === 'Nobody' ? 'It\'s a tie!' : 'Winner!'}
        </h2>
        <p className='text-5xl font-bold text-blue-700 text-center mb-8'>
          {winner === 'Nobody' ? '🙁' : winner}
        </p>
        <Button />
      </div>
    </div>
  )
}

export default Modal
