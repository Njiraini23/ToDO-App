import { useEffect, useState } from 'react';
import classes from './styles.module.css';
import TodoItem from './components/todo-item';



function App() {
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]); 
  const [errorMsg, setErrorMsg] = useState(null);

  async function fetchListOfTodos(){
    try {
      setLoading(true);
      const apiResponse = await fetch('https://dummyjson.com/todos');
      const result = await apiResponse.json();

      console.log(result);
      if(result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos);
        setLoading(false)
        setErrorMsg('Some error occured');
      } else {
        setTodoList([]);
        setLoading(false)
      }
      
    } catch(e) {
      console.log(e);
      setErrorMsg('Some error occured')
    }
    
  }

  useEffect(()=>{
    fetchListOfTodos()
  }, [])

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>A simple Todo App </h1>
      <div>
        {todoList && todoList.length > 0
         ?todoList.map((todoItem) => <TodoItem todo={todoItem} />) 
          : null}
      </div>
    </div>
  );
}

export default App
