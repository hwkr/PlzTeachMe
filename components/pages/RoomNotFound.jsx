import React, { Component, PropTypes } from 'react';

import Icon from 'parts/Icon';

export default class RoomNotFound extends Component {
  static propTypes = {
    roomName: PropTypes.string.isRequired,
    fireRef: PropTypes.any,
  };

  createRoom = () => {
    const { roomName } = this.props;
    this.props.fireRef.post(`rooms/${this.props.roomName}`, {
      data: {
        title: roomName,
        users: {},
        instructor: {
          editorContent: {
            html: '',
            css: '',
            javascript: '',
          },
        },
        messages: {},
      },
    }).then(() => {
      window.location.href = `/teach/${this.props.roomName}`;
    }).catch(err => {
      // handle error
      console.error(err);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="flex flex-center fill-page">
          <div className="col-md-12 col-6">
            <div className="empty">
              <Icon name="warning" />
              <p className="empty-title">Room not Found</p>
              <p className="empty-meta">We couldn't find the room, <b>{this.props.roomName}</b>.</p>
              <button className="empty-action btn btn-primary" onClick={this.createRoom}>
                Create <b>{this.props.roomName}</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
