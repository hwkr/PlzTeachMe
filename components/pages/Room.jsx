import React from 'react';
import Editor from 'components/editor/Editor';

const firstNames = ['Jack', 'Frank', 'John', 'Larry', 'Billy', 'Mike'];
const lastNames = ['Cooper', 'Reid', 'Tesla', 'Faraday', 'Baggings', 'The Great'];

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}


export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * firstNames.length)]}`,
      userID: guid(),
    };
  }

  changeName = (e) => {
    this.setState({
      userName: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.userName} type="text" placeholder="username" onChange={this.changeName} />
        <Editor userID={this.state.userID} userName={this.state.userName} />
      </div>
    );
  }
}
