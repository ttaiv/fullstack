import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE_BOOKS } from '../queries'

const Recommendations = () => {

  const booksResult = useQuery(FAVORITE_GENRE_BOOKS)

  if (booksResult.loading) {
    return <div>loading...</div>
  }
  const books = booksResult.data.favoriteGenreBooks
  const favoriteGenre = booksResult.data.me.favoriteGenre

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <b>{favoriteGenre}</b></p>
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

export default Recommendations