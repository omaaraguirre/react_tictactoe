import React from 'react'

const Modal = ({ children }) => {
    return (
        <div className="fixed z-50 inset-0 overflow-auto bg-black bg-opacity-80 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default Modal
