import * as React from 'react'

class BuildPageProps{
  params:{buildId}
}

export class BuildPage extends React.Component<BuildPageProps, {}>{
  render(){
    return (
      <div>This is build view {this.props.params.buildId}</div>
    )
  }
}
