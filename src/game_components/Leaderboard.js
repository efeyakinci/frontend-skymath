import React, {useState, useEffect} from "react";
import { Paper, Grid, Button } from "@material-ui/core"
import LeaderboardItem from "./LeaderboardItem";
import socket from "../sockets/Socket.js"


export default function Leaderboard(props) {
    const [contenders, setContenders] = useState([]);

    let getContenders = () => {
        socket.emit('requestUpdate');
    }

    let displayItems = () => {
        let retArray = [];
        contenders.forEach(contender => {
            retArray.push(<LeaderboardItem name={contender.name} score={contender.score}></LeaderboardItem>)
        });
        return retArray;
    }

    useEffect(() => {
        getContenders();
    }, [])

    useEffect(() => {
        socket.on('userUpdate', users=>{
            users.sort((a, b) => {
                if (a.points > b.points) {
                    return -1;
                } else if (a.points < b.points) {
                    return 1;
                } else {
                    return 0;
                }
            });
            setContenders(users);
            console.log(users);
        });
    });

    return (
        <Paper>
            <Button onClick={()=>{socket.emit('requestUpdate')}}>Update</Button>
            <Grid container>
                {displayItems()}
            </Grid>
        </Paper>
    )
}