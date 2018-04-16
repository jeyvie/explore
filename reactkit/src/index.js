import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(
  <App/>,
  document.querySelector('#container')
)


if (module.hot) {
  module.hot.accept('./App', function() {
    
    console.log('hot updating');
    
    ReactDOM.render(
      <App/>,
      document.querySelector('#container')
    )
  })
}