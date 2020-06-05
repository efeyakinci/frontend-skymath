import React, { useState, useEffect, useLayoutEffect } from 'react'
import { TextField, Paper, Button, CircularProgress, Snackbar, SnackbarContent } from '@material-ui/core'
import { Container, Row, Col } from 'react-bootstrap'
import './register.css'
import socket from '../sockets/Socket'
import { useDispatch } from 'react-redux'
import setName from '../actions/setName'

export default function Register(props) {

    let dispatch = useDispatch();


    useLayoutEffect(() => {
        socket.on('connect', () => {
            setWaiting(false);
        });

        return ( () => {
            socket.removeListener('connect');
        })
    }, []);

    const [teamName, setTeamName] = useState('');
    const [waiting, setWaiting] = useState(!socket.connected);
    const [error, setError] = useState(false);

    let handleTextChange = (event)=>{
        setTeamName(event.target.value);
    }

    let handleRegister = () => {
        setWaiting(true);
        let to = setTimeout(() => {
            setError(true);
        }, 5000)
        socket.emit('register', teamName);
        socket.on('registerAck', (success) => {
            clearTimeout(to);
            if (success) {
                dispatch(setName(teamName));
                props.history.push('/skymath');
            } else {
                setWaiting(false);
            }
        });
    }

    let handleClose = () => {
        setError(false);
    }
    

    return (
        <Container>
            <Row>
                <Col className='col-center'>
                <h2 style={{fontSize: '3.5vh'}}> SkyMath Competition Platform </h2>
                </Col>                
            </Row>
            <Row style={{marginTop: '5%'}}>
                <Col />
                <Col xs="10" md="6">
                    <Paper style={{width: '100%', padding:'2em'}}>
                        <Container>
                            { (!waiting) ?
                            <React.Fragment>
                            <Row><Col className='col-center'> <b style={{fontSize: '2.5vh'}}>Join Competition</b></Col></Row>
                            <Row><Col style={{marginTop: '1em'}} className='col-center'><TextField style={{width: '100%'}} variant="outlined" label="Team Name" onChange={handleTextChange} /></Col></Row>
                            <Row><Col className='col-center'><Button disabled={teamName === ''} variant='contained' color="primary" onClick={handleRegister}>Continue</Button></Col></Row>
                            </React.Fragment>
                            : <Row><Col className='col-center'><CircularProgress /></Col></Row>}

                        </Container>
                    </Paper>
                </Col>
                <Col />
            </Row>
            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                <SnackbarContent style={{backgroundColor: '#ff3333', color: 'white', display: 'flex', justifyContent: 'center', alignContent: 'center'}} message='Request Timed Out'>
                </SnackbarContent>
            </Snackbar>
        </Container>
    )
}

