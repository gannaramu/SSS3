// import {Component} from 'react';
import * as React from "react";

import ToggleButton from "react-toggle-button";
import "./App.css";
import { Switch, Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import { styled } from "@mui/system";
import { styled } from "@mui/material/styles";
import CSULogo from "./CSU-Ram-357-617.svg";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PWM from "./PWM";
import Pot from "./Pot";

import { PWMD, Duty, Freq, SW } from "./data";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1E4D2B",
  },
});

// const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
//   ({ theme }) => ({
//     textTransform: "none",
//     minWidth: 0,
//     [theme.breakpoints.up("sm")]: {
//       minWidth: 0,
//     },
//     fontWeight: theme.typography.fontWeightRegular,
//     marginRight: theme.spacing(1),
//     color: "rgba(0, 0, 0, 0.85)",
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:hover": {
//       color: "#40a9ff",
//       opacity: 1,
//     },
//     "&.Mui-selected": {
//       color: "#1890ff",
//       fontWeight: theme.typography.fontWeightMedium,
//     },
//     "&.Mui-focusVisible": {
//       backgroundColor: "#d1eaff",
//     },
//   })
// );

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#1E4D2B",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1E4D2B",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#1E4D2B",
    },
  })
);

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
const DC_desc = "Duty Cycle";


const pwm1 = PWMD(Duty(50, false, "test_child"), Freq(331, false, "test_child"), SW(false, "test_child"));
const pwm2 = PWMD(Duty(50, false, "test_child"), Freq(331, false, "test_child"), SW(false, "test_child"));
const pwm3 = PWMD(Duty(50, false, "test_child"), Freq(331, false, "test_child"), SW(false, "test_child"));
const pwm4 = PWMD(Duty(50, false, "test_child"), Freq(331, false, "test_child"), SW(false, "test_child"));
const pwm5 = PWMD(Duty(50, false, "test_child"), Freq(331, false, "test_child"), SW(false, "test_child"));
const pwm6 = PWMD(Duty(50, false, "test_child"), Freq(331, false, "test_child"), SW(false, "test_child"));



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ledOn: false,
      tab: 0,
      pwm: {
        pwm1: pwm1,
        pwm2: pwm2,
        pwm3: pwm3,
        pwm4: pwm4,
        pwm5: pwm5,
        pwm6: pwm6,
        // {
        //   // duty: { value: 0, error: 0, helperText: "test" },
        //   // freq: { value: 0, error: 0, helperText: "test" },
        //   // switch: { value: false, meta: "" },
        // },
        // pwm2: {
        //   duty: { value: 0, error: 0, helperText: "test" },
        //   freq: { value: 0, error: 0, helperText: "test" },
        //   switch: { value: false, meta: "" },
        // },
        // pwm3: {
        //   duty: { value: 0, error: 0, helperText: "test" },
        //   freq: { value: 0, error: 0, helperText: "test" },
        //   switch: { value: false, meta: "" },
        // },
        // pwm4: {
        //   duty: { value: 0, error: 0, helperText: "test" },
        //   freq: { value: 0, error: 0, helperText: "test" },
        //   switch: { value: false, meta: "" },
        // },
        // pwm5: {
        //   duty: { value: 0, error: 0, helperText: "test" },
        //   freq: { value: 0, error: 0, helperText: "test" },
        //   switch: { value: false, meta: "" },
        // },
        // pwm6: {
        //   duty: { value: 0, error: 0, helperText: "test" },
        //   freq: { value: 0, error: 0, helperText: "test" },
        //   switch: { value: false, meta: "" },
        // },
      },
    };
    this.handleChange = this.handleChange.bind(this);
    // this.setPWMDuty = this.setPWMDuty.bind(this);
    this.setPWMSwitch = this.setPWMSwitch.bind(this);
    this.setPWMDuty = this.setPWMDuty.bind(this);
    this.setPWMFreq = this.setPWMFreq.bind(this);
    this.post_pwm = this.post_pwm.bind(this);
  }

  setLedState(state) {
    this.setState({
      ledOn: state !== "0",
    });
  }
  setPWMState(state) {
    this.setState({
      pwm: state,
    });
  }

  handleChange(event, newValue) {
    console.log(event, newValue);
    this.setState({
      tab: newValue,
    });
  }

  setPWMState_fromResponse(state) {
    console.log("input of setPWMstatea from response", state);
    let items = this.state.pwm;
    for (const [key, value] of Object.entries(state)) {
      let item = { ...items[key] };
      item["freq"] = {};
      for (const [key, duty] of Object.entries(value)) {
        console.log(key, duty);
        if (!(key in item)) {
          item[key] = {};
        }
        item[key]["value"] = duty.value;
        item[key]["error"] = false;
        // item[key]["helperText"] = "teast";
        // item["freq"]["value"] = 123;
        // item["freq"]["error"] = false;
        // item["freq"]["helperText"] = "Test";
      }
      items[key] = item;
    }
    console.log("items: ", items);
    this.setState({
      pwm: items,
    });
  }

  setPWMDuty(name, duty) {
    console.log("Input of setPWMDuty", name, duty);
    // console.log("State:", this.state.pwm);
    let items = this.state.pwm;
    console.log("Items:", items);
    let item = { ...items[name] };
    console.log("Item:", item);
    item.duty.value = duty;
    if (duty > 4096 || duty < 0) {
      item.duty.error = true;
      item.duty.helperText = "value should be between 0-4096";
    } else {
      item.duty.error = false;
      item.duty.helperText = "";
      items[name] = item;
    }
    this.setState({
      pwm: items,
    });
  }

  setPWMSwitch(name, value) {
    console.log("Input of setPWMSwitch", name, value);
    let items = this.state.pwm;
    console.log("Items:", items);
    let item = { ...items[name] };
    console.log("Item:", item);
    item.sw.value = value;
    items[name] = item;

    this.setState({
      pwm: items,
    });
    this.post_pwm();
  }

  async post_pwm(event) {
    console.log("input to post_pwm: ", this.state.pwm);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var body = this.state.pwm;
    var raw = JSON.stringify(body);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch("/pwm", requestOptions);
    let state = await response.json();
    console.log(state);
    this.setPWMState_fromResponse(state);
    // this.setState({
    //   ledOn: state !== "0",
    // });
    console.log(this.state);
  }

  setPWMFreq(name, freq) {
    console.log("Input of setPWMState", name, freq);
    console.log("State:", this.state.pwm);
    let items = this.state.pwm;
    console.log("Items:", items);
    let item = { ...items[name] };
    console.log("Item:", item);
    item.freq.value = freq;
    if (freq > 4096 || freq < 0) {
      item.freq.error = true;
      item.freq.helperText = "value should be between 0-4096";
      items[name] = item;
    } else {
      item.freq.error = false;
      item.freq.helperText = "";
      items[name] = item;
    }
    this.setState({
      pwm: items,
    });
  }

  DCChangeHandler(event) {
    console.log("DC Handler Inputs: ", event.target.name, event.target.value);
    let value = event.target.value;
    let name = event.target.name;

    this.setPWMDuty(name, value);
  }

  SwitchHandler(event) {
    console.log(
      "SwitchHandler Inputs: ",
      event.target.name,
      event.target.checked
    );
    let value = event.target.checked;
    let name = event.target.name;

    this.setPWMSwitch(name, value);
  }

  FreqChangeHandler(event) {
    console.log(
      "Freq Change Handler Inputs: ",
      event.target.name,
      event.target.value
    );
    let value = event.target.value;
    let name = event.target.name;

    if (event.target.name === "pwm1" || event.target.name === "pwm2") {
      this.setPWMFreq("pwm1", value);
      this.setPWMFreq("pwm2", value);
    } else if (event.target.name === "pwm4" || event.target.name === "pwm5") {
      this.setPWMFreq("pwm4", value);
      this.setPWMFreq("pwm5", value);
    } else {
      this.setPWMFreq(name, value);
    }
  }

  componentDidMount() {
    // Promise.all([
    //   fetch("/led")
    //     .then((response) => response.text())
    //     .then((state) => this.setLedState(state)),
    //   fetch("/pwm")
    //     .then((response) => response.json())
    //     // .then((state) => console.log(state)),
    //     .then((state) => this.setPWMState_fromResponse(state)),
    // ]);
  }

  async handleStateChange(ledOn) {
    // console.log("input to handleStateChange: ", ledOn);
    this.setPWMDuty("pwm1", 48);
    console.log(this.state.pwm);
  }

  async handleStateChange2(event) {
    console.log("input to handleStateChange2: ", event.target.checked);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var body = {
      ledOn: event.target.checked,
    };
    var raw = JSON.stringify(body);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch("/led", requestOptions);
    const state = await response.text();
    console.log(state);
    this.setState({
      ledOn: state !== "0",
    });
    console.log(this.state);
  }

  render() {
    return (
      <>
        <header className="App-header">
          <Stack direction="row" spacing={1} style={{ margin: 10 }}>
            <img
              src={CSULogo}
              alt="React Logo"
              width="50"
              style={{ allign: "left" }}
            />
            <h2>Smart Sensor Simulator 3</h2>
          </Stack>
        </header>
        <body className="App">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Off</Typography>
            <Switch
              checked={this.state.ledOn}
              id="ledOn"
              onChange={(event) => this.handleStateChange2(event)}
            />
            <Typography>On</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Off</Typography>
            <MaterialUISwitch
              onChange={(event) => this.handleStateChange(event)}
            />
            <Typography>On</Typography>
          </Stack>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={this.state.tab}
                onChange={this.handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="PWM" {...a11yProps(0)} />
                <Tab label="Potentiometer" {...a11yProps(1)} />
                <Tab label="CAN" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={this.state.tab} index={0}>
             
              <PWM
                name="pwm1"
                data={this.state.pwm.pwm1}
                Title={"PWM1"}
                setPWMSwitch={this.setPWMSwitch}
                setPWMDuty={this.setPWMDuty}
                setPWMFreq={this.setPWMFreq}
                setPWMSwitch={this.setPWMSwitch}
              />
              <PWM
                name="pwm2"
                data={this.state.pwm.pwm2}
                Title={"PWM1"}
                setPWMSwitch={this.setPWMSwitch}
                setPWMDuty={this.setPWMDuty}
                setPWMFreq={this.setPWMFreq}
                setPWMSwitch={this.setPWMSwitch}
              />
              <PWM
                name="pwm3"
                data={this.state.pwm.pwm3}
                Title={"PWM2"}
                setPWMSwitch={this.setPWMSwitch}
                setPWMDuty={this.setPWMDuty}
                setPWMFreq={this.setPWMFreq}
                setPWMSwitch={this.setPWMSwitch}
              />
              <PWM
                name="pwm4"
                data={this.state.pwm.pwm4}
                Title={"PWM3"}
                setPWMSwitch={this.setPWMSwitch}
                setPWMDuty={this.setPWMDuty}
                setPWMFreq={this.setPWMFreq}
                setPWMSwitch={this.setPWMSwitch}
              />
              <PWM
                name="pwm5"
                data={this.state.pwm.pwm5}
                Title={"PWM4"}
                setPWMSwitch={this.setPWMSwitch}
                setPWMDuty={this.setPWMDuty}
                setPWMFreq={this.setPWMFreq}
                setPWMSwitch={this.setPWMSwitch}
              />
              <PWM
                name="pwm6"
                data={this.state.pwm.pwm6}
                Title={"PWM5"}
                setPWMSwitch={this.setPWMSwitch}
                setPWMDuty={this.setPWMDuty}
                setPWMFreq={this.setPWMFreq}
                setPWMSwitch={this.setPWMSwitch}
              />
            </TabPanel>
            <TabPanel value={this.state.tab} index={1}>
              <Pot
                data={this.state.pwm.pwm1}
                setPWMSwitch={this.setPWMSwitch}
                setPWMDuty={this.setPWMDuty}
              />
            </TabPanel>
            <TabPanel value={this.state.tab} index={2}>
              <PWM
                name="pwm1"
                data={this.state.pwm.pwm1}
                Title={"PWM1-Test"}
                setPWMSwitch={this.setPWMSwitch}
                setPWMDuty={this.setPWMDuty}
                setPWMFreq={this.setPWMFreq}
                setPWMSwitch={this.setPWMSwitch}
              />
            </TabPanel>
          </Box>
        </body>
      </>
    );
  }
}

export default App;
