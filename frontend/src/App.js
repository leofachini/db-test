import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import './App.css';

// TODO: Move this to a proper Theme file
// TODO: Move common color pallets to a variable
const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      root: {
        '&$disabled': {
          background: 'rgba(172, 26, 30, 0.25)',
        },
      },
      text: {
        background: '#AC1A1E',
        border: 0,
        borderRadius: 3,
        color: 'white',
        '&:hover': {
          background: 'white',
          boxShadow: '0 0 0 1px #AC1A1E',
          color: '#AC1A1E',
        }
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: '#AC1A1E',
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#AC1A1E',
        },
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid #AC1A1E',
        },
      },
    },
  },
});

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Header />
          <UploadForm onLogUpload={this.onLogUpload}/>
        </ThemeProvider>
      </div>
    );
  }

  onLogUpload = (reportData) => {
    console.log(reportData);
    alert('Your file has been uploaded successfully!');
  };
}

export default App;
