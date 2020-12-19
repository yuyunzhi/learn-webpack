import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  componentDidMount(){
      axios.get('/react/api/header.json').then(res=>{
            console.log(res)
      })
  }

  render() {
    return <div>hello world</div>
  }
}

ReactDom.render(<App/>, document.getElementById('root'))
