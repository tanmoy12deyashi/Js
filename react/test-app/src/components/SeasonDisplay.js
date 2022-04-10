const seasonConfig = {
  summer: {
    text: 'Let\'s hit the beach',
    iconName: "sun"
  },
  winter: {
    text: 'Burr, Its chilly',
    iconName: "snowflake"
  }
}

function getSeason(latitude, month) {
  if(month > 2 && month < 9) {
    return latitude ? 'summer' : 'winter';
  } else {
    return latitude ? 'winter' : 'summer';
  }
}

const SeasonDisplay = (props) => {
  const season = getSeason(props.latitude, new Date().getMonth());
  const {text, iconName} = seasonConfig[season];
  
  return  (
  <div>
    <i className={`${iconName} icon`}></i>
    {/*<h1>{season === "winter" ? 'Let\'s hit the beach' : 'Burr, Its chilly'}</h1> */}
    <h1>{ text }</h1>
    <h2>{ props.time }</h2>
    <i className={`${iconName} icon`}></i>
  </div>
  );
}

export default SeasonDisplay;