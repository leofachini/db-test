import React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import LoggerService from '../../services/LoggerService';
import './index.css';

class UploadForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: {
        name: '',
      },
      fileInputValue: '',
    };
  }

  render() {
    return (
      <div className="Form-container">
        <Typography variant="h5" gutterBottom>
          Choose a single log file to be uploaded!
        </Typography>
        <form className="Upload-form">
          {this.state.fileInputValue &&
            <Typography className="File-name-container" variant="body1" gutterBottom>
              <span className="File-span-label">File:</span><span className="File-span-name">{this.state.fileInputValue}</span>
            </Typography>
          }
          <input
            ref={input => this.inputFileElement = input}
            onChange={this.handleFileSelection}
            value={this.state.fileInputValue}
            type="file"
            hidden>
          </input>
          <Button
            onClick={this.triggerFileInputClick}
            aria-label="Choose file and submit log button"
            >
            Choose log file
          </Button>
          <Button
            onClick={this.uploadLogFile}
            aria-label="Choose file and submit log button"
            disabled={!this.state.fileInputValue}
            endIcon={!this.state.isLoading ? <CloudUploadIcon /> : undefined}
            >
            {!this.state.isLoading &&
              <span>Upload</span>
            }
            {this.state.isLoading &&
              <CircularProgress />
            }
          </Button>
        </form>
      </div>
    );
  }

  triggerFileInputClick = () => {
    this.inputFileElement.click();
  };

  handleFileSelection = (e) => {
    this.setState({ 
      file: e.target.files[0],
      fileInputValue: e.target.value,
    });
  };

  uploadLogFile = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await LoggerService.uploadLogFile(this.state.file);
      this.props.onLogUpload(data);
      this.setState({ isLoading: false });
    } catch(error) {
      alert('Some error has occurred when trying to upload the file!');
      console.error(error);
    }
  };

}

export default UploadForm;
