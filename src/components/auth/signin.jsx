import React, { Component } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from 'actions/auth';
import { required, renderField, renderNonFieldErrors } from 'helpers/form';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  serverErrors: PropTypes.shape({
    non_field_errors: PropTypes.array,
  }).isRequired,
  signinUser: PropTypes.func.isRequired,
};

class Signin extends Component {
  onSubmit(formProps) {
    const { signinUser } = this.props;
    signinUser(formProps);
  }

  render() {
    const { handleSubmit, serverErrors } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Email or Username"
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
        { renderNonFieldErrors(serverErrors) }
        <button type="submit" action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { serverErrors: state.auth.errors };
}

Signin.propTypes = propTypes;

export default compose(
  connect(mapStateToProps, authActions),
  reduxForm({ form: 'Signin' }),
)(Signin);
