const Button = ({ children, click }) => {
  return (
    <button
      className='btn btn-primary bg-gray-900 text-white border py-2 px-4 rounded-3xl hover:bg-blue-700 transition-colors duration-300 font-bold'
      onClick={() => click()}
    >{children}
    </button>
  )
}

export default Button
