import React from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import '../App.css';
import { FaAddressBook } from 'react-icons/fa';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Label, Input, FormText } from 'reactstrap';

//function App() {
export default class Employes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            modal: false,
            title: "",
            mail: "",
            position: "",
            birthday: "",
            address: "",
            skills: []
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(id = 0) {
        if (id > 0) {
            axios.get(`http://localhost:8000/get/employes/${id}`)
            .then((response) => {
                console.log(response)
                this.setState({ 
                    title: response.data.employed.nombre,
                    mail: response.data.employed.email,
                    position: response.data.employed.puesto,
                    birthday: response.data.employed.fecha_nacimiento,
                    address: response.data.employed.domicilio,
                    skills: response.data.skills
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
        this.setState({
          modal: !this.state.modal
        });
    }

    loadTable() {
        axios.get('http://localhost:8000/get/employes')
            .then((response) => {
                this.setState({ results: response.data.employes });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.loadTable();
    }

    render() {
        //this.loadTable();
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Puesto</th>
                            <th>Fecha de nacimiento</th>
                            <th>Domicilio</th>
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results.map(item =>
                            <tr>
                                <td>{item.nombre}</td>
                                <td>{item.email}</td>
                                <td>{item.puesto}</td>
                                <td>{item.fecha_nacimiento}</td>
                                <td>{item.domicilio}</td>
                                <td><a onClick={() => this.toggle(item.id)}><FaAddressBook /></a></td>
                            </tr>)}
                    </tbody>
                </Table>
                <Button href="/index" outline color="primary">Regresar</Button>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Emplead@: {this.state.title}</ModalHeader>
                    <ModalBody>
                        <p><b>Correo:</b> {this.state.mail}</p>
                        <p><b>Puesto:</b> {this.state.position}</p>
                        <p><b>Fecha de nacimiento:</b> {this.state.birthday}</p>
                        <p><b>Dirección:</b> {this.state.address}</p>
                        <p><b>Habilidades:</b></p>
                        {this.state.skills.map(item => 
                        <p>-. {item.name_skill}<br/></p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Aceptar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
