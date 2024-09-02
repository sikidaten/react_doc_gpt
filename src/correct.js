import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';


export function Correct({ imgsrc, data, setState }) {
    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={6} sx={{ display: 'flex', flexDirection: "column", rowGap: "40px", padding: "16px", overflow: 'auto' }}>
                    {Object.entries(data).map(([key, value]) =>
                        <FormControl variant="standard" key={key}>
                            <InputLabel htmlFor="component-simple">{key}</InputLabel>
                            <Input id="component-simple" defaultValue={value} />
                        </FormControl>
                    )}
                    <Fab color="primary" aria-label="add"><SendIcon onClick={() => setState('send')} /></Fab>
                </Grid>
                <Grid size={6} padding="8px" textAlign="center">
                    <img className='correctimg' src={imgsrc} />
                </Grid>
            </Grid>
        </Box>
    </>
    );
}