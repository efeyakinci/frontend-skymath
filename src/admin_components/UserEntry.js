import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, TableRow, TableCell } from '@material-ui/core'
import { CheckOutlined } from '@material-ui/icons';
import socket from '../sockets/Socket'

export default function UserEntry(props) {
    let { user } = props;

    const [editing, setEditing] = useState(false);
    const [newValue, setNewValue] = useState(user.points);

    useLayoutEffect(() => {
        socket.on('debugEvent', message => console.log(message));
    }, [])

    let handleEdit = (e) => {
        setEditing(true);
        setNewValue(e.target.value);
    }

    let updatePoints = () => {
        socket.emit('setPoints', {
            name: user.name,
            password: props.password,
            points: newValue
        });
    }


    return (
        <React.Fragment>
                <TableRow key={user.name}>
                    <TableCell component="th" scope="row">
                        {user.name}
                    </TableCell>
                    <TableCell align="left"><TextField defaultValue={props.user.points} onChange={handleEdit}> </TextField> {(editing) ? <Button onClick={updatePoints}><CheckOutlined /></Button> : ''}</TableCell>

                    </TableRow>
                
            </React.Fragment>

    )
}

UserEntry.propTypes = {
    user: PropTypes.object.isRequired,
    password: PropTypes.string.isRequired
}