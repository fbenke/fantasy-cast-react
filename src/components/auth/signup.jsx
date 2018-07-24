import React, { Component } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signupUser } from '../../actions/auth';
import {
  email, required, renderField,
  renderNonFieldErrors, passwordsMatch,
} from '../../helpers/form';

class Signup extends Component {
  onSubmit(formProps) {
    const { signupUser, history } = this.props;
    signupUser(formProps, () => {
      history.push('/remakes/');
    });
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
  connect(mapStateToProps, { signupUser }),
  reduxForm({ form: 'Signup' }),
)(Signup);


Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  serverErrors: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};
