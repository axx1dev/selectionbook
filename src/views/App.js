import React from 'react';
import axios from 'axios';
import '../App.css';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Container, Row, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, InputGroupAddon, Input, Form, Col, Label } from 'reactstrap';

//function App() {
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      email: false,
      totalinputs: ['input0'],
      totalskills: []
    };
  }

  handleValidSubmit(event, values) {
    let valueSkill = [];
    this.state.totalinputs.map(item => 
      valueSkill.push({skill: values[item]})
    );
    this.setState({totalskills: valueSkill});
    //console.log(this.state.totalskills)

    const address = `${values.entity},  ${values.town}, ${values.suburb} ${values.street} ${values.ext} ${values.int}`
    axios.post('http://localhost:8000/create/employes', {
      name: values.name,
      mail: values.email,
      position: values.position,
      birthday: values.date,
      address: address,
      skills: this.state.totalskills
    })
      .then(() => {
        this.setState({ email: values.email });
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  handleInvalidSubmit(event, errors, values) {
    this.setState({ email: values.email, error: true });
  }

  closeModal() {
    this.setState({ email: false, error: false });
  }

  addSkill() {
    //const inputadd = `input-${this.state.totalinputs.length}`;
    let inputadd = this.state.totalinputs.concat(`input${this.state.totalinputs.length}`);
    this.setState({ totalinputs: inputadd });
    console.log(this.state.totalinputs);
  }

  render() {
    const modalError = this.state.error ? 'no' : '';
    return (
      <div>
        <Container>
          <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
            <Row>
              <Col sm={4}>
                <h4>Agregar emplead@s</h4>
                <br />
                <InputGroup size="sm">
                  <AvField name="name" label="Nombre completo" required />
                </InputGroup>

                <InputGroup size="sm">
                  <AvField name="email" label="Correo" type="email" required />
                </InputGroup>

                <InputGroup size="sm">
                  <AvField name="position" label="Puesto" required />
                </InputGroup>

                <InputGroup size="sm">
                  <AvField validate={{ date: { format: 'YYYY/MM/DD' } }} name="date" label="Fecha de nacimiento" type="date" required />
                </InputGroup>
              </Col>

              <Col sm={4}>
                <Label for="exampleSelect">Domicilio</Label>
                <InputGroup size="sm">
                  <AvField name="entity" label="Entidad" required />
                </InputGroup>
                <InputGroup size="sm">
                  <AvField name="town" label="Municipio ó delegación" required />
                </InputGroup>
                <InputGroup size="sm">
                  <AvField name="suburb" label="Colonia" required />
                </InputGroup>
                <InputGroup size="sm">
                  <AvField name="street" label="Calle" required />
                </InputGroup>
                <InputGroup size="sm">
                  <AvField name="ext" label="Num Ext" required />
                </InputGroup>
                <InputGroup size="sm">
                  <AvField name="int" label="Num Int" required />
                </InputGroup>
                <br />
                <Button outline color="success">Guardar</Button>{" "}
                <Button href="/show-employes" outline color="primary">Ver empleados</Button>
              </Col>

              <Col sm={4}>
                <Label for="exampleSelect">Habilidades</Label>
                <br />
                <Button outline color="success" onClick={() => {this.addSkill()}}>Agregar</Button>
                {this.state.totalinputs.map(input => <AvField name={input} required placeholder="Escriba una habilidad"/>)}
              </Col>
            </Row>
          </AvForm>

          <Modal isOpen={this.state.email !== false} toggle={this.closeModal}>
            <ModalHeader toggle={this.closeModal}>Formulario {modalError} valido!</ModalHeader>
            <ModalBody>
              {modalError == 'no' ? 'Es necesario llenar todos los campos de manera correcta' : 'Los datos son correctos y se han guardado de manera correcta.'}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.closeModal}>Cerrar </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }

}

//export default App;
