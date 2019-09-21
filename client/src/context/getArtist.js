
import React, {Component, createContext, useEffect} from 'react'
import axios from 'axios'


const userArtists = createContext();
export const CategoriasConsumer  = userArtists.Consumer



class infoProvider extends Component {
  

  state = {
    infoArtists : {}
   }

  componentDidMount() {
    this.getInfo()
  } 

  getInfo = async () => {
    let url = `http://localhost:3000/info/Yerim MG/Artists`

    let info = await axios.get(url)
    this.setState({
      infoArtists : info.data
    })


}

  render() {
    return (
      <userArtists.Provider         
      value={{
        infoArtists : this.state.infoArtists
        }}>
        {this.props.children}
      </userArtists.Provider>  

     );
  }
}

export default infoProvider 