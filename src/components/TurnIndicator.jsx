import useBoard from '../hooks/useBoard'
import Square from './Square'
import { TURNS } from '../utils/config'

const TurnIndicator = () => {
  const { turn } = useBoard()

  return (
    <section className='flex gap-5'>
      <Square isSelected={turn === TURNS.x}>
        {TURNS.x}
      </Square>
      <Square isSelected={turn === TURNS.o}>
        {TURNS.o}
      </Square>
    </section>
  )
}

export default TurnIndicator
