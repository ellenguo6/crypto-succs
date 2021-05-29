import React from "react";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 20,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 50,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          {/*<span style={labelStyles}>{`${completed}%`}</span>*/}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;

/*
class ProgressBar extends React.Component {
    constructor(props) {
      super(props);
      
      this.firstDayOfYear = new Date(new Date().getFullYear(), 0, 1).getTime()
      this.firstDayOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1).getTime()
    }
    
    getProgress() {
      const now = new Date().getTime()
      return Math.round((now - this.firstDayOfYear) / (this.firstDayOfNextYear - this.firstDayOfYear) * 100);
    }
    
    render() {
      const progress = this.getProgress()
      return (
        <div className="container">
          <h1>Year progress</h1>
          <div className="progressbar-container">
            <div className="progressbar-complete" style={{width: `${progress}%`}}>
              <div className="progressbar-liquid"></div>
            </div>
            <span className="progress">{progress}%</span>
          </div>
        </div>
      )
    }
  }
  
  ReactDOM.render(<ProgressBar />, document.getElementById("bar"));
*/  