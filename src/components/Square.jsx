import React from 'react'

const Square = ({ children, isSelected, updateBoard, hoverable, index }) => {
    const handleClick = (e) => {
        updateBoard(index)
    }

    return (
        <div
            className={`
                flex justify-center items-center border w-20 h-20 rounded-md select-none 
                ${isSelected && 'bg-white text-gray-900'} 
                ${hoverable && 'hover:bg-gray-800 hover:cursor-pointer'}
            `}
            onClick={handleClick}
        >
            <span className='font-bold text-3xl'>{children}</span>
        </div>
    )
}

export default Square
