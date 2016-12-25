(function () {
  let {Link} = window.ReactRouter
  let {Component} = window.React
  let {axios} = window

  class BuildsIndex extends Component {

    constructor (props) {
      super(props)
      // http://stackoverflow.com/questions/37300933/allow-typescript-compiler-to-call-setstate-on-only-one-react-state-property
      this.state = {slug: props.slug, username: props.username, repositories: []}
    }

    getSlug () {
      return this.state.slug
    }

    loadData () {
      console.log(`getting data for ${this.state.slug}`)
      axios.get('https://api.travis-ci.org/repos/' + this.state.slug + '/builds').then((result) => {
        this.setState({builds: result.data})
      })
    }

    componentDidMount (props) {
      console.log('this.properties', this.props, props)
      console.log('state username is', this.state.username)
      if (this.state.username) {
        this.loadRepositories()
      }
    }

    setUsername (event) {
      this.setState({username: event.target.value})
    }

    loadRepositories () {
      console.log('loading repositories', this.state.username)
      axios.get(`https://api.travis-ci.org/repos/${this.state.username}.json?pretty=true`).then((result) => {
        console.log('this is repositories', result.data)
        this.setState({repositories: result.data})
      })
    }

    setSlug (event) {
      this.setState({slug: event.target.value})
    }

    getRowClassName (build) {
      return build.id % 2 === 0 ? 'even' : 'odd'
    }

    renderBuilds () {
      if (!this.state || !this.state.builds) {
        return <div>nothing to show</div>
      } else {
        return <div>

          <div>{this.props.children}</div>
          {this.state.slug} Builds Table :
          <table className='builds-table'>
            <tbody>
              {this.state.builds.map((build) => {
                return <tr key={build.id} className={this.getRowClassName(build)}>

                  <td>{build.branch}</td>
                  <td><Link to={`/builds/${build.id}`}>{build.id}</Link></td>

                </tr>
              })}
            </tbody>
          </table>
        </div>
      }
    }

    render () {
      return <div>
        <input type='text' onChange={this.setUsername.bind(this)} value={this.state.username} /><br />
        <button onClick={this.loadRepositories.bind(this)} disabled={!this.state.username}>Load Repositories</button><br /><br />
        <select value={this.state.slug} onChange={this.setSlug.bind(this)}>
          {this.state.repositories.map((repo) => {
            return <option key={repo.id} value={repo.slug}>{repo.slug}</option>
          })}
        </select>
        <button onClick={this.loadData.bind(this)}>Load</button>
        {this.renderBuilds()}
      </div>
    }
  }

  BuildsIndex.defaultProps = {
    username: 'GuyMograbi',
    slug: ''
  }

  window.BuildsIndex = BuildsIndex
})()

