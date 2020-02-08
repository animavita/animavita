import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = {error: null};
  componentDidCatch(error) {
    this.setState({error});
  }
  render() {
    const {children, fallback} = this.props;
    const {error} = this.state;
    if (error) {
      return React.createElement(fallback, {error});
    }
    return children;
  }
}
