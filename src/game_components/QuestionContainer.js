import React from 'react'
import { Card, CardContent, Button, Grid, Typography} from '@material-ui/core';

export default function QuestionContainer() {
    return (
        <Grid container>
            <Grid item xs/>
            <Grid item xs={6}>
                <Card>
                    <CardContent className='col-center'>
                        <Grid container><Grid item xs={12} style={{textAlign: "center"}}><Typography variant="h4"> Question </Typography></Grid></Grid>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs />
        </Grid>
    )
}
