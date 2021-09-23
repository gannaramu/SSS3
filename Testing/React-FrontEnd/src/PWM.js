import * as React from "react";
import { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import {Switch, Button} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PWM(props) {
 

  const DCChangeHandler = useCallback(({ target: { name, value } }) => {
    // console.log(props);
    props.setDC((state) => ({ ...state, [name]: value }), []);
    if (value > 100) {
      props.set_DCHelperText(
        (state) => ({ ...state, [name]: "value should be between 0-100%" }),
        []
      );
      props.set_DC_error((state) => ({ ...state, [name]: true }), []);
    } else {
      props.set_DCHelperText((state) => ({ ...state, [name]: "" }), []);
      props.set_DC_error((state) => ({ ...state, [name]: false }), []);
    }
  });
  const FreqChangeHandler = useCallback(({ target: { name, value } }) => {
    console.log(props.Freq);
    props.setFreq((state) => ({ ...state, [name]: value }), []);
    if (value > 100) {
      props.set_Freq_HelperText(
        (state) => ({ ...state, [name]: "value should be between 0-500" }),
        []
      );
      props.set_Freq_error((state) => ({ ...state, [name]: true }), []);
    } else {
      props.set_Freq_HelperText((state) => ({ ...state, [name]: "" }), []);
      props.set_Freq_error((state) => ({ ...state, [name]: false }), []);
    }
  });

  const DC_desc = "Duty Cycle";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center" allign style={{margin:20}}>
        <h3> PWM1</h3>
        <Switch onChange={DCChangeHandler}/>
         
         <div>
           <TextField
          name="pwm1"
          // size="small"
          id="outlined-basic"
          error={props.DC_error.pwm1}
          label={DC_desc}
          helperText={props.DC_HelperText.pwm1}
          onChange={DCChangeHandler}
          value={props.DC.pwm1}
          type="number"
        />
        </div>
       <TextField
            name="pwm1"
            // size="small"
            id="outlined-basic"
            label="Frequency"
            error={props.Freq_error.pwm1}
            onChange={props.FreqChangeHandler}
            helperText={props.Freq_HelperText.pwm1}
           value = {props.Freq.pwm1}
          /> 
          
      </Stack>

    </Box>
  );
}
