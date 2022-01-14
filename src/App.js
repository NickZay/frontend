import React, {useState} from "react";
import Signing from "./Signing/Signing";
import TodoListPage from "./Todo/TodoListPage";


function App() {
    const [token, setToken] = useState("")
    const [isTodoListPage, setIsTodoListPage] = useState(false);

    return (
        <div>
            {isTodoListPage ?
                <TodoListPage token={token} setToken={setToken} setIsTodoListPage={setIsTodoListPage}/> :
                <Signing setToken={setToken} setIsTodoListPage={setIsTodoListPage}/>}
        </div>
    );
}

export default App;
