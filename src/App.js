import React, { Component, Suspense } from 'react';
import './App.css';

import Page1 from './components/Page1';
// import Page2 from './components/Page2';
// import Page3 from './components/Page3';
// import asyncComponent from './components/AsyncComponent';
const Page2Lazy = React.lazy(() => import('./components/Page2'));
const Page3Lazy = React.lazy(() => import('./components/Page3'));


class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'page1',
      component: null
    }
  }

  onRouteChange = (route) => {
    // No code splitting
    this.setState({ route: route });
    // With code splitting
    // if (route === 'page1') {
    //   this.setState({ route: route });
    // } else if (route === 'page2') {
    //   import('./components/Page2')
    //     .then((Page2) => {
    //       this.setState({ route: route, component: Page2.default });
    //     });
    // } else if (route === 'page3') {
    //   import('./components/Page3')
    //     .then((Page3) => {
    //       this.setState({ route: route, component: Page3.default });
    //     });
    // }
  }

  render() {
    const { route } = this.state;
    if (route === 'page1') {
      return <Page1 onRouteChange={this.onRouteChange} />
    } else if (route === 'page2') {
      return (
        <Suspense fallback={<div>Loading...</div>} >
          <Page2Lazy onRouteChange={this.onRouteChange} />
        </Suspense>);
    } else if (route === 'page3') {
      return (
        <Suspense fallback={<div>Loading...</div>} >
          <Page3Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    }
  }
}

export default App;
