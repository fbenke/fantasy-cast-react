import React, { Component } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../../actions/auth';
import {
  email, required, renderField,
  renderNonFieldErrors, passwordsMatch,
} from '../../helpers/form';

class Signup extends Component {
  onSubmit(formProps) {
    const { signupUser } = this.props;
    signupUser(formProps);
  }

  render() {
    const { handleSubmit, serverErrors } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          type="text"
          validate={[required, email]}
          component={renderField}
          props={serverErrors}
        />
        <Field
          label="Username"
          name="username"
          type="text"
          validate={required}
          component={renderField}
          props={serverErrors}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          validate={required}
          component={renderField}
          props={serverErrors}
        />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          validate={[required, passwordsMatch]}
          component={renderField}
          props={serverErrors}
        />
        { renderNonFieldErrors(serverErrors) }
        <button type="submit" action="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { serverErrors: state.auth.errors };
}

export default compose(
  connect(mapStateToProps, authActions),
  reduxForm({ form: 'Signup' }),
)(Signup);


Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  serverErrors: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    password1: PropTypes.array,
  }).isRequired,
  signupUser: PropTypes.func.isRequired,
};
