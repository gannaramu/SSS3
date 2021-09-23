import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TabPanel from './Tabs';

import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<TabPanel />, document.getElementById('root'));


ReactDOM.render (
    <div>
        <body>
        <App/>
        <TabPanel/>
        </body>
        {/* <div id="footer">
        copyright &copy; 2021
        </div> */}

       

    </div>,

    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
