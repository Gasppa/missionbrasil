import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import logo from '../views/public/Logo-Header.png'

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginForm() {
    const [errorAlert, setErrorAlert] = useState(false)

    const history = useHistory()

    const handleCloseError = () => {
        setErrorAlert(false)
    }
    
    const handleLogin = async (ev) => {
        ev.preventDefault()

        const username = ev.target.elements.username.value
        const password = ev.target.elements.password.value

        const apiKey = process.env.REACT_APP_API_KEY
        const headers = {
            'apikey': apiKey
        }

        try {
            const result = await axios.post(
                'http://localhost:3010/api/login', 
                { user: { username, password }},
                { headers: headers })
            
            if(result.status === 200){ 
                history.push({ 
                    pathname: '/home',
                    state: {
                        token: result.data.token,
                        role: result.data.role
                    }
                })
            }
        } catch (error) {
            setErrorAlert(true)
            throw error
        }
    }

    return (
        <div className="login-form">
            <div className="login-form_header">
                <img src={logo} alt="mission brasil logo"/>
            </div>
            <div className="login-form_body">
                <form onSubmit={handleLogin}>                    
                    <div>
                        <input type="text" name="username" placeholder="Usuário"/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Senha"/>
                    </div>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
                <p>Ainda não possui acesso? <Link to="/register">Cadastre-se</Link></p>
            </div>

            <Snackbar open={errorAlert} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    Ocorreu um erro de autenticação.
                </Alert>
            </Snackbar>
        </div>
    )
}
