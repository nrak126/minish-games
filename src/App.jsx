import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from './routes/home'
import Game1 from './routes/game1'
import Game2 from './routes/game2'
import Game3 from './routes/game3'
import Game4 from './routes/game4'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game1' element={<Game1 />} />
        <Route path='/game2' element={<Game2 />} />
        <Route path='/game3' element={<Game3 />} />
        <Route path='/game4' element={<Game4 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
