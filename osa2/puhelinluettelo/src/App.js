import { useState } from 'react'

const FilterForm = ({filterText, handleFilterChange}) => (
  <div> filter shown with <input value={filterText} onChange={handleFilterChange}/> </div>
)
const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => (
  <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
const Persons = ({persons, filterText}) => (
  <div>
    {persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
      .map(person => 
        <p key={person.name}> {person.name} {person.number} </p>
      )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterText(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) 
      alert(`${newName} is already added to phonebook`)
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filterText={filterText} handleFilterChange={handleFilterChange} />
      <h2> Add a new </h2>
      <PersonForm {...{newName, newNumber, handleNameChange, handleNumberChange, addPerson}} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} />
    </div>
    
  )

}

export default App