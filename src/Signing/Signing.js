import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Signing.css";

export default function Signing({setToken, setIsTodoListPage}) {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [hasError, setHasError] = useState(false)

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        let path;

        if (isLogin) {
            path = "http://localhost:8080/my_login"
        } else {
            path = "http://localhost:8080/registration"
        }
        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        }).then(async response => {
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                setToken(await response.text())
                setIsTodoListPage(true)
            } else {
                setError(await response.text())
                setHasError(true)
            }
        })

    }

    return (
        <div className="Signing">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit"
                        disabled={!validateForm()} onClick={() => setIsLogin(true)}>
                    Login
                </Button>
                <Button block size="lg" type="submit"
                        disabled={!validateForm()} onClick={() => setIsLogin(false)}>
                    Sign Up
                </Button>
            </Form>
            <p>{hasError ? error : ''}</p>
        </div>
    );
}