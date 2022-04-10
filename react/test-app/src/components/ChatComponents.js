const ChatComponents = (props) => {
  console.log(props)
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="avatar" src="/assets/images/avatar.jpg"/>
      </a>
      <div>
        <a href="/" className="author">
          {props.author}
        </a>
        <div className="metadata">
          <span className="date">{props.timeAgo}</span>
        </div>
        <div className="text">
          {props.chatText}
        </div>
      </div>
    </div>
  )
}

export default ChatComponents;