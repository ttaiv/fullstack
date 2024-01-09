import { useState } from 'react'

const Button = ({handeClick, text}) => (
  <button onClick={handeClick}> {text} </button>
)

const StatisticLine = ({text, value}) => (
  <tr><td>{text}:</td><td>{value}</td></tr>
) 

const Statistics = ({goodCount, neutralCount, badCount}) => {
  const totalCount = goodCount + neutralCount + badCount
  if (totalCount > 0)
    return (
    <table>
      <tbody>
      <StatisticLine text="Good" value={goodCount} />
      <StatisticLine text="Neutral" value={neutralCount} />
      <StatisticLine text="Bad" value={badCount} />
      <StatisticLine text="All" value={totalCount} />
      <StatisticLine text="Average" value={(goodCount - badCount) / totalCount} />
      <StatisticLine text="Positive" value={goodCount/totalCount * 100 + " %"} />
      </tbody>
    </table>
    )
  else
      return (
        <>
          <p> No feedback given. </p>
        </>
      )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementCounter = (counter, setCounter) => setCounter(counter + 1)

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handeClick={() => incrementCounter(good, setGood)} text="Good" />
      <Button handeClick={() => incrementCounter(neutral, setNeutral)} text="Neutral" />
      <Button handeClick={() => incrementCounter(bad, setBad)} text="Bad" />
      <h1>Statistics</h1>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
    </div>
  )
}

export default App