import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'

export const NoteDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`)
        setNote(data)
      } catch (error) {
        console.log('Error fetching note:', error)
        toast.error('Failed to fetch the note')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`)

      toast.success('Note deleted successfully')
      navigate('/')
    } catch (error) {
      console.log('Error deleting note:', error)
      toast.error('Failed to delete note')
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Please add a title or content')
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)

      toast.success('Note updated successfully')
      navigate('/')
    } catch (error) {
      console.log('Error updating note:', error)
      toast.error('Failed to update note')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to='/' className='btn btn-ghost'>
              <ArrowLeftIcon className='size-5' />
              Back to Notes
            </Link>
            <button type='button' onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='size-5' />
              Delete Note
            </button>
          </div>
          <div className='card bg-base-200'>
            <div className='card-body'>
              <div className='mb-4'>
                <h2 className='card-title'>Title</h2>
                <input
                  type='text'
                  placeholder='Note title'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  className='input w-full bg-base-200'
                />
              </div>
              <div className='mb-4'>
                <h2 className='card-title'>Content</h2>
                <textarea
                  type='text'
                  placeholder='Write your note here...'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                  className='textarea w-full bg-base-200'
                />
              </div>
              <div className='card-actions justify-end'>
                <button onClick={handleSave} disabled={saving} className='btn btn-primary'>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
