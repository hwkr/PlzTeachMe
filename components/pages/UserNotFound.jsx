import React, { PropTypes } from 'react';

import Icon from 'parts/Icon';

const propTypes = {
  roomName: PropTypes.string.isRequired,
  createRoom: PropTypes.func.isRequired,
};

function RoomNotFound({ roomName }) {
  return (
    <div className="container">
      <div className="flex flex-center fill-page">
        <div className="col-md-12 col-6">
          <div className="empty">
            <Icon name="warning" />
            <p className="empty-title">User not Found</p>
            <p className="empty-meta">Hmm, we couldn't find that user in the room, <b>{roomName}</b>.</p>
            <a className="empty-action btn btn-primary" href={`/room/${roomName}`}>Create a new user in <b>{roomName}</b></a>
          </div>
        </div>
      </div>
    </div>
  );
}

RoomNotFound.propTypes = propTypes;

export default RoomNotFound;
