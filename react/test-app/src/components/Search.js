import React from "react"
import Unplash from "../apis/Unplash"
import SearchBar from "./SearchBar"


export default class Search extends React.Component {
  state = {
    images: [],
    total: 0
  }
  onSearchSubmit = async (term) => {
    const { data } = await Unplash.get("/search/photos", {
      params: {
        query: term
      }
    })
    this.setState({images: data.results, total: data.total})
  }

  render() {
    return (
      <div className="ui container" style={{marginTop: '10px'}}>
       <SearchBar app="test" onSearchSubmit = {this.onSearchSubmit}/>
       Total: {this.state.total} images, Found: {this.state.images.length} images
      </div>
    )
  }
  
}