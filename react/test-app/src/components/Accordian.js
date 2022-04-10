import React, {useState} from "react"


/*import React from 'react';
// Don't modify this line. It is here to make React
// work correctly in this exercise environment.
const useState = React.useState;*/


const items = [
  {
    title: "Test 1",
    desc: "Hi this is a test 111"
  },
  {
    title: "Test 2",
    desc: "Hi this is a test 2222"
  }
]

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  /* both are same
    const things = useState(10);
    activeIndex = things[0]
    setActiveIndex = things[1]
  */

  const titleClicked = (index) => {
    setActiveIndex(index)
  }

  const renderItems = items.map((item, index) => {
    return (
      <React.Fragment key={item.title}>
        <div className={`title ${activeIndex === index ? 'active' : ''}`} onClick={(e) => titleClicked(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${activeIndex === index ? 'active' : ''}`}>
          <p>{item.desc}</p>
        </div>
      </React.Fragment>
    )
  });

  return (
    <div className="ui styled accordion">
      {renderItems}
      {/* <h1>{activeIndex}</h1> */}
    </div>
  )
}


const AccordionApp = () => {
  return(
    <div>
      <Accordion />
    </div>
  )
}

export default AccordionApp;