import useBoard from '../hooks/useBoard'
import { MutedIcon, MusicIcon } from './Icons'

const SoundsButton = () => {
  const { muted, setMuted } = useBoard()

  const handleClick = () => {
    window.localStorage.setItem('muted', !muted)
    setMuted(!muted)
  }

  return (
    <button
      className='absolute top-20 right-5 p-3 rounded-2xl text-white hover:text-blue-400 transition-colors duration-300'
      onClick={handleClick}
    >
      {muted ? <MutedIcon /> : <MusicIcon />}
    </button>
  )
}

export default SoundsButton
