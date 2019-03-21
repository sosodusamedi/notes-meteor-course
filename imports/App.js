import React, { Component } from 'react'
import Signup from './ui/Signup'
import Dashboard from './ui/Dashboard'

class App extends Component {
  render() {
    return (
      <div>
        <Signup />
        <Dashboard />
      </div>
    )
  }
}

export default App
