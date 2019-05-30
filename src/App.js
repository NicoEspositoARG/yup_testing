import React from "react";
import "./App.css";
import * as yup from 'yup';

class App extends React.Component {

  state = {
    toogler: false,
    nameInpt:'',
    passwordInpt:'',
    result: null
  };

  handleClick = () => {
    console.error("submit");
    // this.setState({ result: this.validate })
    let schema = yup.object({
      name: yup.string().min(3).required(),
      pass: yup.string()
      .when('$toogler', (toogler, schema) => (toogler ? schema.min(3,"Password is too short").required() : schema)),
    });
  
     schema
       .validate({
         name: this.state.nameInpt,
         pass: this.state.passwordInpt
       },{ context: { toogler: this.state.toogler } })
       .then(
         (value) => {
            console.log("validooo", value);
            this.setState({ result: true })
         },
         (err) => {
           console.log(" noo validoo", err.message );
           this.setState({ result: false })
          }
       );
    }

  handleOnchange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    
  }


  render() {
    return (
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-6">
            {/* <form onSubmit={this.handleSubmit} > */}
              <div className="form-group">
                <label htmlFor="nameInpt">Nombre:</label>
                <input
                  type="text"
                  name="nameInpt"
                  placeholder="nombre.."
                  className="form-control"
                  value={this.state.nameInpt}
                  onChange={this.handleOnchange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="passwordInpt">Password:</label>
                <input
                  type="text"
                  name="passwordInpt"
                  className="form-control"
                  value={this.state.passwordInpt}
                  onChange={this.handleOnchange}

                />
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    name="toogler"
                    className="form-check-input"
                    onChange={this.handleOnchange}
                    value={this.toogler}

                  />
                  On/Off
                </label>
              </div>

              <button
                className="btn btn-primary form-control mt-2"
                onClick={this.handleClick}
               >Validar!</button>
                
            {/* </form> */}
          </div>
          <div className="col-8">
          <pre> {JSON.stringify(this.state, null, 2)}</pre> 
          </div>        
        </div>
      </div>
    );
  }
}

export default App;
