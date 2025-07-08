import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogin } from '~/hooks/useLogin';
import { useId } from '~/hooks/useId';
import './index.css';
import TextInput from '~/components/common/TextInput';
import  LinkButton  from '~/components/common/LinkButton';
import  NormalButton  from '~/components/common/NormalButton';
import FormField from '~/components/common/FormField';


const SignIn = () => {
  const auth = useSelector((state) => state.auth.token !== null);
  const { login } = useLogin();

  const id = useId();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      login({ email, password })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [email, password]
  );

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <main className="signin">
      <h2 className="signin__title">Login</h2>
      <p className="signin__error">{errorMessage}</p>
      <form className="signin__form" onSubmit={onSubmit}>
        <FormField id={`${id}-email`} label="E-mail Address" className="signin__form_field">
          <TextInput
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            className="app_input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormField>
        <FormField id={`${id}-password`} label="Password" className="signin__form_field">
          <TextInput
            id={`${id}-password`}
            type="password"
            autoComplete="current-password"
            className="app_input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormField>
        <div className="signin__form_actions">
          <LinkButton to="/signup" data-variant="secondary">
            Register
          </LinkButton>
          <div className="signin__form_actions_spacer"></div>
          <NormalButton disabled={isSubmitting}>Login</NormalButton>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
