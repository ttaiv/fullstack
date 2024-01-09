const Header = (props) => (
    <>
      <h2>
        {props.course}
      </h2>
    </>
  )
  
const Part = (props) => (
<>
<p>{props.name} {props.exercises}</p>
</>
)

const Content = ({parts}) => (
<>
{parts.map(part => 
    <Part key={part.id} name={part.name} exercises={part.exercises} />
)}
</>
)

const Total = ({parts}) => (
<>
<p>
    <strong> Total number of exercises {parts.reduce( (sum, next) => sum + next.exercises, 0)} </strong>
</p>
</>
)

const Course = ({course}) => {
    return (
        <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
         <Total parts={course.parts}/>
        </div>
    )
}
    
export default Course