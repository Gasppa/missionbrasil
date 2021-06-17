import React, { Component } from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from 'react-router-dom'
import axios from 'axios'

const initialState = { 
    title: '',
    description: '',
    successAlert: false,
    errorAlert: false
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class NoticiasForm extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.state = initialState
    }

    async handleSubmit(ev){
        ev.preventDefault()
        const headers = {
            'x-auth-token': this.props.location.token
        }
        const result = await axios.post(
            'http://localhost:3010/api/add-noticia', 
            { noticia: { title: this.state.title, description: this.state.description }},
            { headers: headers })
        
        if(result.status === 200){ 
            this.setState({
                ...this.state,
                successAlert: true
            })
            this.props.setListaNoticias([...this.props.listaNoticias, { title: this.state.title, description: this.state.description }])
        } else {
            this.setState({
                ...this.state,
                errorAlert: true
            })
        }
    }

    handleInputChange(ev){
        this.setState({
            ...this.state,
            [ev.target.name]: ev.target.value
        })
    }

    render() {
        return (
            <div className="noticias-form_body">
                <form onSubmit={this.handleSubmit}>                    
                    <div>
                        <input type="text" name="title" placeholder="Titulo" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <textarea rows="5" cols="40" name="description" placeholder="Descrição" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                    <Link to={{
                        pathname: '/home',
                        state: this.props.location
                    }}>
                        Voltar
                    </Link>
                        <input type="submit" value="Cadastrar"/>
                    </div>
                </form>
                <Snackbar open={this.state.successAlert} autoHideDuration={6000} onClose={this.handleCloseSuccess}>
                    <Alert onClose={this.handleCloseSuccess} severity="success">
                        Noticia registrada com sucesso
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.errorAlert} autoHideDuration={6000} onClose={this.handleCloseError}>
                    <Alert onClose={this.handleCloseError} severity="success">
                        Ocorreu um erro ao registrar a noticia.
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default NoticiasForm
