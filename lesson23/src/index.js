import React, {Component} from 'react'
import _ from 'lodash'
import ReactDom from 'react-dom'
class App extends Component {
  render() {
    return (
        <div>
          <div>{_.join(['this','is','app'],' ')}</div>
        </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('root'))
