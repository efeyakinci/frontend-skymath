import React, { useState, useLayoutEffect } from 'react'
import { Container, Col, Row } from "react-bootstrap"
import socket from '../sockets/Socket'
import { useSelector } from 'react-redux'
import { Card, CardContent, Button, Grid, Typography} from '@material-ui/core';
import QuestionContainer from './QuestionContainer';
import Leaderboard from './Leaderboard';

export default function Competition(props) {

    let username = useSelector(state => state.userReducer);
    let leaderboard = [];

    let requestUpdate = () => {
        socket.emit('requestupdate');
    };

    const [users, setUsers] = useState([]);

    if (username == '') {
        props.history.push('/skymath/register')
    }

    let sortLeaderboard = () => {

    }


    useLayoutEffect(() => {

        socket.on('connect', () => {
            socket.emit('register', username);
        });

        return ( () => {
            socket.removeListener('connect');
            socket.removeListener('update');
        }
        )
    }, [])

    return (
        <Grid container>
            <Grid container>
                <Grid item xs={11} style={{display: 'flex', justifyContent: 'flex-end'}}><Typography>{username}</Typography></Grid>
                <Grid xs />
            </Grid>
            <QuestionContainer />
            <Leaderboard />
        </Grid>
    );
}