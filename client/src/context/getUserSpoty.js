
import React, {Component, createContext, useEffect} from 'react'
import axios from 'axios'


const userContext = createContext();
export const CategoriasConsumer  = userContext.Consumer



class infoProvider extends Component {
  

  state = {
    info : {}
   }

  componentDidMount() {
    this.getInfo()
  } 

  getInfo = async () => {
    let url = `http://localhost:3000/info/Yerim MG`

    let info = await axios.get(url)
    this.setState({
      info : info.data
    })


}

  render() {
    return (
      <userContext.Provider         
      value={{
        info : this.state.info
        }}>
        {this.props.children}
      </userContext.Provider>  

     );
  }
}

export default infoProvider 