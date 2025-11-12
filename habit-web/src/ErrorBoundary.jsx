import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(err, info) { console.error("UI Error:", err, info); }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Something went wrong.</h2>
          <p>Please try again or check the console for details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
