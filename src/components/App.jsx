import {useState} from "react";
import '../App.css';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish my homework',
      isComplete: false,
    },
    {
      id: 2,
      title: 'give sean a slap',
      isComplete: false,
    },
    {
      id: 3,
      title: 'Brush teeth',
      isComplete: false,
    },
  ]);

  // return (
  //
  // );
}

export default App;
