import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CreatePage } from './pages/CreatePage'
import { NoteDetailPage } from './pages/NoteDetailPage'

export const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/create' element={<CreatePage />} />
      <Route path='/note/:id' element={<NoteDetailPage />} />
    </Routes>
  )
}
