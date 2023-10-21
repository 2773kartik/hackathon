import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUsers, sendCrush } from "../../actions/authActions";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class SendLove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {},
      errors: {},
    };
  }

  componentDidMount() {
    // Call getUsers action when the component mounts
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    // Update state with the users' data when it's available in props
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors,
      });
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(selectedOption);
  };
  handleClick = (e) => {
    e.preventDefault();
    const userData = {
        crush: this.state.selectedOption.value,
        id: this.props.auth.user.id,
      };
      console.log(userData);
      this.props.sendCrush(userData);
  };


  render() {
    const { user } = this.props.auth;
    const { users } = this.props.auth; // Access users from the Redux state
    // Check if current user's crush and the selected user's crush is current user
    const selectedUser = users.find((user) => user.id === this.state.selectedOption.value);
    const bingo = user.crush && selectedUser.crush && user.id === selectedUser.crush;
    //console.log(selectedUser);
    console.log(user);
    //console.log(bingo);

    const options = users.map((user) => ({
      value: user._id,
      label: user.name,
    }));

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into the{" "}
                <span style={{ fontFamily: "monospace" }}>lovers</span> corner 👏
              </p>
            </h4>
            <div className="input-field col s12">
              <Dropdown
                options={options}
                onChange={this.handleChange}
                value={this.state.selectedOption}
                placeholder="Select a user"
              />
            </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginRight: "1rem",
              }}
              onClick={this.handleClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              ChatRoom
            </button>
            {bingo && (
              <div>
                <p className="flow-text grey-text text-darken-1">
                  <span style={{ fontFamily: "monospace" }}>Bingo!</span> You and{" "}
                  {selectedUser.name} have a crush on each other! 💖
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

SendLove.propTypes = {
  getUsers: PropTypes.func.isRequired,
  sendCrush : PropTypes.func.isRequired,
  //users : PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, getUsers, sendCrush })(SendLove);
