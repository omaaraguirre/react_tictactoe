import PropTypes from 'prop-types'
import useBoard from '../hooks/useBoard'

const Square = ({ children, isSelected, hoverable, index }) => {
  const { updateBoard } = useBoard()

  return (
    <div
      className={`
        flex justify-center items-center border w-20 h-20 rounded-md select-none 
        ${isSelected && 'bg-white text-gray-900'} 
        ${hoverable && 'hover:bg-gray-800 hover:cursor-pointer'}
      `}
      onClick={() => updateBoard(index)}
    >
      <span className='font-bold text-3xl'>{children}</span>
    </div>
  )
}

Square.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool,
  hoverable: PropTypes.bool,
  index: PropTypes.number
}

export default Square
