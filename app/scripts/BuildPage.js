// import * as React from 'react'

// class BuildPageProps{
  // params:{buildId}
// }
(function () {
  let {Component} = window.React

  class BuildPage extends Component {
    render () {
      return (
        <div>This is build view {this.props.params.buildId}</div>
      )
    }
  }
  window.BuildPage = BuildPage
})()

