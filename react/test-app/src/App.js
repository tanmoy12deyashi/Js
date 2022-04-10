function getBtnText1() {
  return "Click on ME!";
}

function App1() {
  const btnText = "Click Me !";
  let style = {
    backgroundColor: 'red', color: '#fff'
  }

  function getBtnText() {
    return "Click on Me!";
  }

  return (
    <div>
      <label className="label1"  htmlFor="name">Usre Name</label>
      <br/>
      <input id="name" type="text"/>
      <button style={{backgroundColor: 'blue', color: '#fff'}}>
        {btnText}
      </button>
      <button style={style}>
        {getBtnText()}
      </button>
      <button style={{backgroundColor: 'blue', color: '#fff'}}>
        {getBtnText1()}
      </button>
    </div>
  )
}

function App() {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" />
        </a>
        <div>
          <a href="/" className="author">
            Tan
          </a>
          <div className="metadata">
            <span className="date">Today at 9:00PM</span>
          </div>
          <div className="text">
            Nice Blog Post
          </div>
        </div>
      </div>
    </div>
  )
}
export default App;