import React from 'react';
import axios from 'axios';

class App extends React.Component {
  // State of your application
  state = {
    fotografo: [],
    error: null,
  };

  // Fetch your fotografos immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const response = await axios.get('http://localhost:1337/fotografos');
      this.setState({ fotografos: response.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error, fotografo } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
      <div className="App">
        <ul>
          {this.state.fotografos.map(fotografo => (
            <li key={fotografo.id}>{fotografo.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
