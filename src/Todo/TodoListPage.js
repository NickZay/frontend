import React, {useEffect, useState} from "react";
import TodoList from "./TodoList";
import Context from "../context";
import Loader from "../Loader";
import Modal from '../Modal/Modal'
import AddTodo from "./AddTodo";


function TodoListPage({token, setToken, setIsTodoListPage}) {
    const [todos, setTodos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = useState("");
    const [hasError, setHasError] = useState(false)

    function getAll() {
        console.log(token)
        return fetch("http://localhost:8080/todo/all?token=" + token)
            .then((response) => response.json())
            .then((todos) => {
                setLoading(false);
                return todos;
            });
    }

    useEffect(async () => {
        setTodos(await getAll());
        setLoading(false);
    }, []);

    function toggleTodo(todo) {

        console.log("todo", todo.id);
        fetch("http://localhost:8080/todo/update?" +
                    "token=" + token + "&" +
                    "todo_id=" + todo.id + "&" +
                    "task=" + todo.task + "&" +
                    "completed=" + (!todo.completed).toString()
            , {
            method: 'POST'
        }).then(async response => {
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                setToken(await response.text())
                setTodos(await getAll())
            } else {
                setError(await response.text())
                setHasError(true)
            }
        })
    }

    function removeTodo(id) {
        console.log(todos)
        fetch("http://localhost:8080/todo/delete?token=" + token + '&todo_id=' + id.toString(), {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(async response => {
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                setToken(await response.text())
                setTodos(await getAll())
            } else {
                setError(await response.text())
                setHasError(true)
            }
        })
    }

    function addTodo(task) {
        console.log(todos)
        setTodos([])
        setLoading(true)
        console.log('ADD ', token)
        fetch("http://localhost:8080/todo/add?token=" + token, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: task
        }).then(async response => {
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                setToken(await response.text())
                setTodos(await getAll())
            } else {
                setError(await response.text())
                setHasError(true)
            }
        })
    }

    return (
        <Context.Provider value={{removeTodo}}>
            <div className="wrapper">
                <h1>TodoList</h1>
                <Modal setIsTodoListPage={setIsTodoListPage}/>
                <AddTodo onCreate={addTodo}/>

                {loading && <Loader/>}
                {todos.length ? (
                    <TodoList todos={todos} onToggle={toggleTodo}/>
                ) : loading ? null : (
                    <p>No todos!</p>
                )}
                <p>{hasError ? error : ''}</p>
            </div>
        </Context.Provider>
    );
}

export default TodoListPage;
