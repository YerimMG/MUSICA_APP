
import React, {Component, createContext} from 'react'
import axios from 'axios'


const UserTracksContext = createContext();
export const CategoriasConsumer  = UserTracksContext.Consumer



class infoProvider extends Component {
  

  state = {
    infoTracks : {}
   }

  componentDidMount() {
    this.getInfo()
  } 

  getInfo = async () => {
    let url = `http://localhost:3000/info/Yerim MG/tracks`

    let info = await axios.get(url)
    this.setState({
      infoTracks : info.data
    })


}

  render() {
    return (
      <UserTracksContext.Provider         
      value={{
        infoTracks : this.state.infoTracks
        }}>
        {this.props.children}
      </UserTracksContext.Provider>  

     );
  }
}

export default infoProvider 