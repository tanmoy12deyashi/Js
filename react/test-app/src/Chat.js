import ChatComponents from "./components/ChatComponents.js";
import ApprovalCard from "./components/ApprovalCard.js";

const Chat =  () => {
  const chatText="Nice Blog Post"
  return (
    <div className="ui container comments">
      <ApprovalCard>
        Are you sure you want to do this?
      </ApprovalCard>
      <ApprovalCard>
        <ChatComponents author="Tan Moy" timeAgo="Today at 9:00PM" chatText={chatText}/>
      </ApprovalCard>
      
      <ApprovalCard>
        <ChatComponents author="Tan Moy 1" timeAgo="Today at 7:00AM" chatText="Nice Blog Post 1111"/>
      </ApprovalCard>

      <ApprovalCard>
        <ChatComponents author="Tan Moy 2" timeAgo="Today at 10:00PM" chatText="Nice Blog Post 000"/>
      </ApprovalCard>
    </div>
  )
}
export default Chat;