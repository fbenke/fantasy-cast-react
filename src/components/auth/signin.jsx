import React, { Component } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signinUser } from '../../actions/auth';
import { required, renderField, renderNonFieldErrors } from '../../helpers/form';


class Signin extends Component {
  onSubmit(formProps) {
    const { history, signinUser } = this.props;
    signinUser(formProps, () => {
      history.push('/remakes/');
    });
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

export default compose(
  connect(mapStateToProps, { signinUser }),
  reduxForm({ form: 'Signin' }),
)(Signin);


Signin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  serverErrors: PropTypes.object.isRequired,
  signinUser: PropTypes.func.isRequired,
};
