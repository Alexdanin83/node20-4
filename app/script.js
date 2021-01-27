import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      timerWork: 10,
      timerRest: 5,
      timer: 10,
    };
    this.timeractual = null;
  }

formatTime(timestamp) {
  let minutes = Math.floor(timestamp / 60);
  let seconds = timestamp % 60;
  let formatted = [
  minutes.toString().padStart(2, '0'),
  seconds.toString().padStart(2, '0')
  ].join(':');
  return(formatted);
};

stopTimer = ()=> {
  const {timer,status,timerWork} = this.state;
  clearInterval(this.timeractual)
  this.setState({
          timer: timerWork,
          status: 'off',
          });
}

closeApp = ()=> {
  window.close();
}

step = () => {
  const {timer,timerWork,timerRest,status} = this.state;
  this.setState({
          timer: timer-1
  });
  if ((timer==timerWork) && (status=='off')) {
    this.setState({ status: 'work'})
  }
  if ((timer==0) && (status=='work')) {
    this.setState({timer: timerRest, status: 'rest'})
  }
  if ((timer==0) && (status=='rest')) {
    this.setState({timer: timerWork,  status: 'work'})
  }
return timer;
};

startTimer = () => {
  const {timer} = this.state;
  this.timeractual = setInterval(this.step, 1000);
};

render() {
 const { status,timer } = this.state;
      return (
        <div>
          <h1>Protect your eyes</h1>
          {(status === 'off') &&
          <div> <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p></div>}
          {(status === 'work') && <img src="./images/work.png" />}
          {(status === 'rest') && <img src="./images/rest.png" />}
          {(status !== 'off') && <div className="timer">{this.formatTime(timer)}</div>}
          {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
          {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
          <button className="btn btn-close" onClick={this.closeApp}>X</button>
        </div>
      )
  };
};
render(<App />, document.querySelector('#app'));
