import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';
import { useSignup } from '~/hooks/useSignup';
import { useId } from '~/hooks/useId';
import TextInput from '~/components/common/TextInput';
import LinkButton from '~/components/common/LinkButton';
import NormalButton from '~/components/common/NormalButton';
import FormField from '~/components/common/FormField';

const SignUp = () => {
  const auth = useSelector((state) => state.auth.token !== null);

  const id = useId();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useSignup();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      signup({ email, name, password })
        .catch((err) => {
          setErrorMessage(`サインアップに失敗しました: ${err.message}`);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [email, name, password]
  );

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <main className="signup">
      <h2 className="signup__title">Register</h2>
      <p className="signup__error">{errorMessage}</p>
      <form className="signup__form" onSubmit={onSubmit}>
        <FormField id={`${id}-email`} label="E-mail Address" className="signup__form_field">
          <TextInput
            id={`${id}-email`}
            autoComplete="email"
            className="app_input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormField>
        <FormField id={`${id}-name`} label="Name" className="signup__form_field">
          <TextInput
            id={`${id}-name`}
            className="app_input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormField>
        <FormField id={`${id}-password`} label="Password" className="signup__form_field">
          <TextInput
            id={`${id}-password`}
            type="password"
            className="app_input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormField>
        <div className="signup__form_actions">
          <LinkButton to="/signin" data-variant="secondary">
            Login
          </LinkButton>
          <div className="signup__form_actions_spacer"></div>
          <NormalButton type="submit" disabled={isSubmitting}>
            Register
          </NormalButton>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
