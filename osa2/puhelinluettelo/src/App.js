import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/notification'

const FilterForm = ({filterText, handleFilterChange}) => (
  <div> filter shown with <input value={filterText} onChange={handleFilterChange}/> </div>
)
const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, handleAdd}) => (
  <form onSubmit={handleAdd}>
        <div> name: <input value={newName} onChange={handleNameChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
const Persons = ({persons, filterText, handleDelete}) => (
  <div>
    {persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
      .map(person => 
        <p key={person.id}> 
          {person.name} {person.number} {' '}
          <button onClick={() => handleDelete(person.id)}> Delete</button>
        </p>
      )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterText(event.target.value)

  const handleAdd = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (newName.length === 0 || newNumber.length === 0) {
      setError(true)
      notification5sec('Name or number is missing')
    }
    else if (persons.map(person => person.name).includes(newName)
        && window.confirm(`${newPerson.name} is already added to the phonebook. Replace the old number with the new one?`)) {
          const idToUpdate = persons.find(person => person.name === newName).id
          personService
          .update(idToUpdate, newPerson)
          .then(returnedPerson => {
            const newPersons = persons.map(person => person.id !== idToUpdate ? person : returnedPerson)
            setPersons(newPersons)
            notification5sec(`Updated number of ${returnedPerson.name}.`)
          })
          .catch(error => {
            setError(true)
            notification5sec(`Information of ${newName} has already been removed from the server.`)
          })
        }
    else {
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notification5sec(`Added ${returnedPerson.name}.`)
      })
    }
    setNewName('')
    setNewNumber('')
  }
  const handleDelete = id => {
    const nameToDelete = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${nameToDelete}?`)) {
      personService
      .delete_(id)
      .then(response => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
        notification5sec(`Deleted ${nameToDelete}.`)
      })
      .catch(error => {
        setError(true)
        notification5sec(`Information of ${nameToDelete} has already been removed from the server.`)
      })
    }
  }
  
  const dataFetch = () => {
    personService.getAll()
    .then(initialPersons =>
      setPersons(initialPersons))
  }
  useEffect(dataFetch, [])

  const notification5sec = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
      setError(false)
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} isError={error} />
      <FilterForm filterText={filterText} handleFilterChange={handleFilterChange} />
      <h2> Add a new </h2>
      <PersonForm {...{newName, newNumber, handleNameChange, handleNumberChange, handleAdd}} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} handleDelete={handleDelete} />
    </div>
    
  )

}
export default App