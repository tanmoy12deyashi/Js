import React from "react";
import SeasonDisplay from "./SeasonDisplay"
import Spinner from "./Spinner"

class Location extends React.Component {
  /*constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      lat: null,
      errorMessage: '',
      error: null
    }
  }*/

  state =  {
    lat: null,
    errorMessage: '',
    error: null,
    time: new Date().toLocaleString()
  }

  componentDidCatch() {
    console.log("catch")
  }

  componentDidMount() {
    console.log("My component was rendered to the screen");

    window.navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude);
      this.setState({
        lat: position.coords.latitude
      })
    }, err => {
      console.error(err);
      this.setState({
        errorMessage: err.message,
        error: "test"
      })
    });

    setInterval(() => {
      this.setState({
        time: new Date().toLocaleString()
      })
    }, 1000)
  }

  componentDidUpdate() {
    console.log("My component was just updated");
  }

  componentWillUnmount() {
    console.log("My component was unmounted");
  }

  renderContent() {
    if(this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    } else if(!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay latitude = {this.state.lat} time={this.state.time}/>
    } else {
      return <Spinner message="Please accept location"/>;
    }
  }

  render() {
    console.log("render")
    console.log(this.state)
    return(
      <div className="border red">
        {this.renderContent()}
      </div>
    )
  }
}

export default Location;