"use strict";

class App extends React.Component {
  render() {
    return React.createElement("div", null, "Hello world");
  }

}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));