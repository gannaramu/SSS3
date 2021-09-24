import * as React from "react";
import { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Switch, Typography } from "@mui/material";
import { useEffect } from "react";
// import { typography } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PWM(props) {
  const DCChangeHandler = useCallback(({ target: { name, value } }) => {
    console.log("DC Handler Inputs: ",name, value);
    // props.setDC((state) => ({ ...state, [name]: value }), []);
    // props.setPWMDuty(name, value);
    setPWMDuty("pwm1", 48);
    // if (value > 100) {
    //   props.set_DCHelperText(
    //     (state) => ({ ...state, [name]: "value should be between 0-100%" }),
    //     []
    //   );
    //   props.set_DC_error((state) => ({ ...state, [name]: true }), []);
    // } else {
    //   props.set_DCHelperText((state) => ({ ...state, [name]: "" }), []);
    //   props.set_DC_error((state) => ({ ...state, [name]: false }), []);
    // }
  });
  const FreqChangeHandler = useCallback(({ target: { name, value } }) => {
    console.log(props);
    // props.setFreq((state) => ({ ...state, [name]: value }), []);
    // if (value > 100) {
    //   props.set_Freq_HelperText(
    //     (state) => ({ ...state, [name]: "value should be between 0-500" }),
    //     []
    //   );
    //   props.set_Freq_error((state) => ({ ...state, [name]: true }), []);
    // } else {
    //   props.set_Freq_HelperText((state) => ({ ...state, [name]: "" }), []);
    //   props.set_Freq_error((state) => ({ ...state, [name]: false }), []);
    // }
  });

  function setPWMDuty(name, duty) {
    console.log("Props",props);

    console.log("Input of setPWMState",name,duty);
    console.log("State:",props.data.pwm);
    let items = props.data.pwm;
    console.log("Items:",items);
    let item = { ...items[name] };
    console.log("Item:",item);
    item.duty.value = 48;
    items[name] = item;
    // props.setPWMState(items);
  }


  useEffect(() => {
    console.log(props.data.pwm.pwm1.duty.value);
  });
  const DC_desc = "Duty Cycle";
  return (
    <div>
    <Stack direction="row" spacing={1} alignItems="top">
      <Typography style={{"margin-top":10}}>PWM1</Typography>
      <Switch name="pwm1-connect" onChange={DCChangeHandler} />
      <TextField
        name="pwm1"
        size="small"
        id="outlined-basic"
        error={props.data.pwm.pwm1.error}
        label={DC_desc}
        helperText={
          props.data.pwm.pwm1.duty.helperText +
          " " +
          props.data.pwm.pwm1.duty.value
        }
        onChange={DCChangeHandler}
        type="number"
      />
      <TextField
        name="pwm1"
        size="small"
        id="outlined-basic"
        label="Frequency"
        // error={props.Freq_error.pwm1}
        // onChange={props.FreqChangeHandler}
        // helperText={props.Freq_HelperText.pwm1}
        value={props.data.pwm.pwm1.duty.value}
      />
    </Stack>

    <Stack direction="row" spacing={1} alignItems="top">
      <Typography style={{"margin-top":10}}>PWM1</Typography>
      <Switch onChange={DCChangeHandler} />
      <TextField
        name="pwm1"
        size="small"
        id="outlined-basic"
        error={props.data.pwm.pwm1.error}
        label={DC_desc}
        helperText={
          props.data.pwm.pwm1.helperText +
          " " +
          props.data.pwm.pwm1.duty.value
        }
        onChange={DCChangeHandler}
        type="number"
      />
      <TextField
        name="pwm1"
        size="small"
        id="outlined-basic"
        label="Frequency"
        // error={props.Freq_error.pwm1}
        // onChange={props.FreqChangeHandler}
        // helperText={props.Freq_HelperText.pwm1}
        value={props.data.pwm.pwm1.duty.value}
      />
    </Stack>
    </div>
   
  );
}
