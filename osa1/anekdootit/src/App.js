import { useState } from 'react'

const MostPopular = ({mostPopular, anecdotes, points}) => {
  if (mostPopular !== null)
    return (
    <p>
          {anecdotes[mostPopular]} <br></br>
          has {points[mostPopular]} votes
    </p>
    )
  else
      return (
        <p> No votes yet. </p>
      )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const start_i = Math.floor(Math.random() * anecdotes.length)

  const [selected, setSelected] = useState(start_i)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostPopular, setMostPopular] = useState(null)

  const getMostPopular = (copyPoints) => copyPoints.indexOf(Math.max(...copyPoints))

  const randomizeSelected = () => {
    let i = 0
    do {
      i = Math.floor(Math.random() * anecdotes.length)
    } while(i === selected)  // if new anecdote would be the same, perform new randomization
    setSelected(i)
  }
  const voteCurrent = () => {
    const copyPoints = [...points]
    const newPoints = copyPoints[selected] + 1
    copyPoints[selected] = newPoints
    setPoints(copyPoints)
    setMostPopular(getMostPopular(copyPoints))
  }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <p> 
        {anecdotes[selected]} <br></br>
        has {points[selected]} votes
      </p>
      <button onClick={voteCurrent}> vote </button>
      <button onClick={randomizeSelected}> next anecdote </button>
      <h1> Anecdote with the most votes </h1>
      <MostPopular mostPopular={mostPopular} anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App