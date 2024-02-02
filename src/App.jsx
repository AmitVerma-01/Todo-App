import { useEffect, useState } from "react";
import { TodoProvider } from "./contexs";
import { TodoForm } from "./components";
import TodoItem from "./components/TodoItem";
import Footer from "./components/Footer.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => { 
    setTodos((prev)=> [{id : Date.now(),...todo}, ...prev])
  }

  const updateTodo = (id , todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id ) )
  }

  const toggleComplete = (id) => {
    setTodos((prevTodo)=> prevTodo.map((todo)=> todo.id === id ? {...todo , completed :!todo.completed} : todo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])
  
  useEffect(()=>{
      localStorage.setItem('todos',JSON.stringify(todos))
    },[todos]
  )

  return (
    <TodoProvider value={{todos , addTodo , updateTodo , deleteTodo , toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
           </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo)=>(
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
      </TodoProvider>
  );
}

export default App;
