import ReactDOM from 'react-dom/client'
import BoardProvider from './contexts/BoardProvider'
import App from './App'
import './index.css'
import '@fontsource-variable/orbitron'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BoardProvider>
    <App />
  </BoardProvider>
)
