import { ArrowLeftIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../lib/axios'

export const CreatePage = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('All field are required')
      return
    }

    setLoading(true)

    try {
      await api.post('/notes', {
        title,
        content,
      })

      toast.success('Note created successfully')
      navigate('/')
    } catch (error) {
      console.log('Error creating note:', error)

      if (error.response.status === 429) {
        toast.error("You're creating notes too fast")
      } else {
        toast.error('Failed to create note')
      }
    } finally {
      setLoading(true)
    }
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to='/' className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>
          <div className='card bg-base-200 border-1 border-[#00ff9d]'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <fieldset className='fieldset mb-4'>
                  <legend className='fieldset-legend'>Title</legend>
                  <input
                    type='text'
                    placeholder='Note Title'
                    className='input w-full bg-base-200'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className='fieldset mb-4'>
                  <legend className='fieldset-legend'>Content</legend>
                  <textarea
                    type='text'
                    placeholder='Write your note here...'
                    className='textarea w-full h-32 bg-base-200'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </fieldset>
                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
