import { combineReducers } from 'redux'

const songReducer = () => {
  return [
    {title: "Test yrere", duration: "4:05"},
    {title: "Test sadsadsa", duration: "2:05"},
    {title: "Test 1", duration: "5:05"},
    {title: "Test 121321321", duration: "9:05"},
    {title: "Test 21312", duration: "3:05"}
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if(action.type === 'SONG_SELECTED') {
    return action.payload
  }

  return selectedSong;
}

export default combineReducers({
  songs: songReducer,
  selectedSong: selectedSongReducer
});