import { Routes, Route, HashRouter } from 'react-router-dom'
import Home from '../Pages/Home'
import Series from '../Pages/Series'
import Film from '../Pages/Film'
import ViewMovie from '../Pages/ViewMovie'
import Search from '../Pages/Search'
import NotFound from '../Pages/NotFound'

export default function MyRoutes(){
    return(
        <HashRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/Séries' element={ <Series /> } />
                <Route path='/Filmes' element={ <Film /> } />
                <Route path='/Search' element={ <Search /> } />
                <Route path='/:name/:id' element={ <ViewMovie /> } />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </HashRouter>
    )
}