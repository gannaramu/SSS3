import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import PWM from "./PWM";
import { useState, useEffect } from "react";



function TabPanel(props) {
  const { children, value, index,...other } = props;



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
      )}{" "}
    </div>
  );
}

const StyledTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

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
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const [DC, setDC] = useState({pwm1:0,pwm2:0,pwm3:0,pwm4:0,pwm5:0,pwm6:0});
  const [DC_HelperText, set_DCHelperText] = useState({});
  const [DC_error, set_DC_error] = useState({pwm1:false,pwm2:false,pwm3:false,pwm4:false,pwm5:false,pwm6:false});

  const [Freq, setFreq] = useState({});
  const [Freq_HelperText, set_Freq_HelperText] = useState({});
  const [Freq_error, set_Freq_error] = useState({});
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <StyledTabs value={value} onChange={handleChange} variant="fullWidth">
          <StyledTab label="PWM" {...a11yProps(0)} />
          <StyledTab label="Potentiometers" {...a11yProps(1)} />
          <StyledTab label="CAN" {...a11yProps(2)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PWM DC={DC}
        setDC={setDC}
        DC_error={DC_error}
        set_DC_error={set_DC_error}
        DC_HelperText={DC_HelperText}
        set_DCHelperText={set_DCHelperText}
        Freq={Freq}
        setFreq={setFreq}
        Freq_error={Freq_error}
        set_Freq_error={set_Freq_error}
        Freq_HelperText={Freq_HelperText}
        set_Freq_HelperText={set_Freq_HelperText}
        onChange={handleChange}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
