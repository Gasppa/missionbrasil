import React, { Component } from 'react'
import axios from 'axios'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from 'react-router-dom'
import '../views/public/cadastro.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const options = [
    { value: 'OPERACAO', label: 'Operação' },
    { value: 'ADMIN', label: 'Admin' }
  ]

const initialState = {
    username: '',
    password: '',
    role: 'OPERACAO',
    successAlert: false,
    errorAlert: false
}

export class CadastroForm extends Component {
    constructor(props){
        super(props);
        this.state = initialState;

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCloseSuccess = this.handleCloseSuccess.bind(this)
        this.handleCloseError = this.handleCloseError.bind(this)
        this.postUser = this.postUser.bind(this)
    }

    handleInputChange(ev){
        console.log(ev)
        this.setState({
            ...this.state,
            [ev.target.name]: ev.target.value
        })
    }

    handleCloseSuccess(){
        this.setState({
            ...this.state,
            successAlert: false
        })
    }

    handleCloseError(){
        this.setState({
            ...this.state,
            errorAlert: false
        })
    }

    async postUser(ev){
        ev.preventDefault()
        const result = await axios.post('http://localhost:3010/api/add-usuario', { user: { ...this.state }})
        
        if(result.status === 200){ 
            this.setState({
                ...this.state,
                successAlert: true
            })
        } else {
            this.setState({
                ...this.state,
                errorAlert: true
            })
        }
    }

    render() {
        return (
            <div className="register-user_container">
                <h2>Cadastro de usuário</h2>
                <form method="POST" onSubmit={this.postUser}>
                    <div>
                        <input type="text" name="username" placeholder="Usuário" value={this.state.username} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <input type="text" name="password" placeholder="Senha" value={this.state.password} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                    <select name="role" value={this.state.role} onChange={this.handleInputChange}>
                        {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                    </select>
                    </div>
                    <div>
                        <input type="submit" value="Cadastrar" placeholder="Senha"/>
                    </div>
                    <Snackbar open={this.state.successAlert} autoHideDuration={6000} onClose={this.handleCloseSuccess}>
                        <Alert onClose={this.handleCloseSuccess} severity="success">
                            Cliente registrado com sucesso
                        </Alert>
                    </Snackbar>

                    <Snackbar open={this.state.errorAlert} autoHideDuration={6000} onClose={this.handleCloseError}>
                        <Alert onClose={this.handleCloseError} severity="success">
                            Ocorreu um erro ao registrar o usuário.
                        </Alert>
                    </Snackbar>
                </form>
                <Link to="/">Voltar</Link>
            </div>
        )
    }
}

export default CadastroForm
