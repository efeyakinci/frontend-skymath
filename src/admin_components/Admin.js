import React, { useState, useLayoutEffect } from 'react'
import { TextField, Paper, Button, Dialog, DialogContent, DialogContentText, DialogTitle, TableContainer, Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'
import { Container, Row, Col } from 'react-bootstrap'
import { SendOutlined } from '@material-ui/icons'
import socket from '../sockets/Socket'
import UserEntry from './UserEntry'


export default function Admin(props) {

    const [dialogShown, setDialogShown] = useState(true);
    const [password, setPassword] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [users, setUsers] = useState([]);

    let verifyPassword = () => {
        socket.emit('verifyPassword', password);
        socket.on('passwordCorrect', isit=>{
            if (isit) {
              setDialogShown(false);  
            } else {
                setWrongPassword(true);
            }
        })
    }

    useLayoutEffect(() => {
        socket.on('userUpdate', updatedUsers=>{
            setUsers(updatedUsers);
        });
        socket.emit('requestUpdate');
        return ( () => {
            socket.removeListener('update');
        }
        )
    }, [])

    let handlePasswordChange = (e) => { 
        setWrongPassword(false);
        setPassword(e.target.value);
    }

    let handleQuestionChange = (e) => {
        setNewQuestion(e.target.value);
    } 

    let sendQuestion = () => {
        socket.emit('newQuestion', {question: newQuestion, password: password});
    }


    return (
        <Container>
            <Dialog open={dialogShown}>
                <DialogTitle>
                    Verification
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Please enter the super secret password.
                    </DialogContentText>
                        <Container fluid='true'>
                            <Row><Col><TextField error={wrongPassword} style={{width: '100%'}} label='Password' onChange={handlePasswordChange} helperText={(wrongPassword) ? 'Wrong Password' : ''}></TextField></Col></Row>
                            <Row><Col style={{display: 'flex', justifyContent: 'flex-end'}}><Button variant='contained' color='primary' onClick={verifyPassword}>Verify</Button></Col></Row>
                        </Container>
                </DialogContent>
            </Dialog>
            <Row>
                <Col xs='12' className="col-center"><h1>Admin Console</h1></Col>
            </Row>
            <Row>   
                <Col xs="12">
                    <Paper style={{padding: '0.5em 0'}}>
                        <Container>
                            <Row>
                            <Col className='col-center' md="3" style={{fontSize: '2vh'}}>Send a Question</Col> <Col md="9"><TextField multiline style={{width: '100%'}} variant='outlined' label='Question' onChange={handleQuestionChange}></TextField></Col>
                            </Row>
                            <Row>
                                <Col className='col-center' xs='12'><Button variant='contained' color='primary' endIcon={<SendOutlined></SendOutlined>} onClick={sendQuestion}>Send</Button></Col>
                            </Row>
                        </Container>
                    </Paper>
                </Col>

            </Row>
            <Row>
                <Col>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>Team</TableCell>
                                <TableCell align="left">Points</TableCell>

                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {users.map((row) => (
                                <UserEntry user={row} password={password} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Col>
            </Row>
        </Container>
                )
}
