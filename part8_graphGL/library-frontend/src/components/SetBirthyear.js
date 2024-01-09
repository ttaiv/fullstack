import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const SetBirthyear = () => {

  const [selectedName, setSelectedName] = useState(null)
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const authorsResult = useQuery(ALL_AUTHORS)

  if (authorsResult.loading) {
    return (
      <div>loading...</div>
    )
  }
  const authors = authorsResult.data.allAuthors
  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selectedName.value, setBornTo: parseInt(born) } })

    setSelectedName(null)
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedName}
            onChange={setSelectedName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear