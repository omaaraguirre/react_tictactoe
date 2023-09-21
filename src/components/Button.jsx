import useBoard from '../hooks/useBoard'

const Button = () => {
  const { restartBoard } = useBoard()

  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300'
      onClick={restartBoard}
    >
      Restart
    </button>
  )
}

export default Button
