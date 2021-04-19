import React, { Component } from "react";

import "./EditExcersiseModalNotificationWindow.css";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

export class EditExcersiseModalNotificationWindow extends Component {
  state = {};
  handleClose = () => {
    let closeModalWindow = this.props.handleClose;
    closeModalWindow(false);
  };

  render() {
    const { open, body } = this.props;

    return (
      <div className="edit-excersise-modal__wrapper">
        {!open ? null : (
          <Paper elevation={3}>
            <div className="edit-excersise-modal__wrapper-content">
              <div className="edit-excersise-modal__wrapper-content-header">
                <Button
                  onClick={this.handleClose}
                  className="edit-excersise-modal__btn"
                >
                  <CloseIcon />
                </Button>
              </div>
              <div className="edit-excersise-modal__wrapper-text">
                <h5>{body}</h5>
              </div>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

export default EditExcersiseModalNotificationWindow;
