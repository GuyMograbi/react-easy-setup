import * as React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

class BuildsIndexProps {
  username:string;
  slug:string;
}

class BuildsIndexState {
  username:string;
  slug:string;
  builds:Array<any>;
  repositories:Array<any>;
}

export class BuildsIndex extends React.Component<BuildsIndexProps,BuildsIndexState> {

  public static defaultProps:BuildsIndexProps = {
    username: 'GuyMograbi',
    slug: '',
  }

  constructor(props) {
    super(props)
    console.log('constructor is running')
    // http://stackoverflow.com/questions/37300933/allow-typescript-compiler-to-call-setstate-on-only-one-react-state-property
    this.state = {slug: props.slug, username: props.username, repositories: []} as BuildsIndexState;
   

  }

  getSlug() {
    return this.state.slug;
  }

  loadData() {
    console.log(`getting data for ${this.state.slug}`)
    axios.get('https://api.travis-ci.org/repos/' + this.state.slug + '/builds').then((result)=> {
      this.setState({builds: result.data} as BuildsIndexState)
    })
  }

  componentDidMount(props) {
    console.log('this.properties', this.props, props)
    console.log('state username is', this.state.username)
    if (this.state.username) {
      this.loadRepositories()
    }
  }

  setUsername(event) {
    this.setState({username: event.target.value} as BuildsIndexState)
  }

  loadRepositories() {
    console.log('loading repositories', this.state.username);
    axios.get(`https://api.travis-ci.org/repos/${this.state.username}.json?pretty=true`).then((result)=> {
      console.log('this is repositories', result.data);
      this.setState({repositories: result.data} as BuildsIndexState)
    })
  }

  setSlug(event) {
    this.setState({slug: event.target.value} as BuildsIndexState)
  }
  
  renderBuilds(){
    { if (!this.state || !this.state.builds) {
      return <div>nothing to show</div>
    }else{

      return <div>
        
        <div>{this.props.children}</div>
        {this.state.slug} Builds Table :
        <table>
          <tbody>
            {this.state.builds.map((build) => {
              return <tr key={build.id}>

                <td>{build.branch}</td>
                <td><Link to={`/builds/${build.id}`}>{build.id}</Link></td>

              </tr>
            })}
          </tbody>
        </table>
      </div>
    }
    } 
  }

  render() {
    return <div>
      <input type="text" onChange={this.setUsername.bind(this)} value={this.state.username}/><br/>
      <button onClick={this.loadRepositories.bind(this)} disabled={!this.state.username}>Load Repositories</button><br/><br/>
      <select value={this.state.slug} onChange={this.setSlug.bind(this)}>
        {this.state.repositories.map((repo)=> {
          return <option key={repo.id} value={repo.slug}>{repo.slug}</option>
        })}
      </select>
      <button onClick={this.loadData.bind(this)}>Load</button>
      {this.renderBuilds()}
    </div>
  }
}






