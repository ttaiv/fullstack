import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Books = () => {

  const [selectedGenre, setSelectedGenre] = useState(null)

  const booksResult = useQuery(ALL_BOOKS)

  if (booksResult.loading) {
    return (
      <div>loading...</div>
    )
  }

  const allBooks = booksResult.data.allBooks
  const genres = [...new Set(allBooks.flatMap(b => b.genres))]
  const genreOptions = genres.map(g => ({ value: g, label: g }))
  const books = selectedGenre ? allBooks.filter(b => b.genres.includes(selectedGenre.value)) : allBooks

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <Select
          defaultValue={selectedGenre}
          onChange={setSelectedGenre}
          options={genreOptions}
          placeholder='all genres'
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
