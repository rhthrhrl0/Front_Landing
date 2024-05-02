import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppRouter} from "./routes/AppRouter";

const App = () => {
    return <MuiThemeProvider>
        <AppRouter/>
    </MuiThemeProvider>
};

export default App;
