import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class CrudDivs extends React.Component {
  state = {
    storedElements: [], // at the beginning there are no elements
  };

  renderSingleDiv() {
    // generate single element
    return React.createElement("div", { className: "crud-card" }, "NewDiv");
  }

  renderCrudDiv() {
    // update state with new element
    this.setState((prev) => {
      return {
        storesElements: [...prev.storedElements, this.renderSingleDiv()],
      };
    });
  }

  render() {
    return (
      <div className="crud-container">
        <div className="btnContainer">
          <button className="makeDivsBtn" onClick={this.renderCrudDiv}>
            Create Divs
          </button>
        </div>
      </div> // container end
    );
  }
}

ReactDOM.render(<CrudDivs />, document.getElementById("root"));
