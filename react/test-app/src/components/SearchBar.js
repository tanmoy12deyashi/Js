import React from "react"

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      term : 'Hello World'
    }
  }
  onInputChange(event) {
    console.log(event.target.value)
  }

  onFormSubmit1 = (event) => {
    event.preventDefault();
    console.log(this.state.term)
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.term)
    this.props.onSearchSubmit(this.state.term)
  }
  render() {
    return (
      <div className="ui segment">
        {/* <form onSubmit={this.onFormSubmit} className="ui form"> */}
        <form onSubmit={(event) => this.onFormSubmit(event)} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input type="text" value={this.state.term.toUpperCase()} onChange={e => this.setState({term: e.target.value})}/>
            {/*<input type="text" onChange={this.onInputChange}/>
            <input type="text" onChange={(event) => console.log(event.target.value)}/>*/}
          </div>
        </form>
      </div>
    )
  }
}