import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Card, Layout, Typography, Spin } from 'antd';
import { Viewer } from '../../lib/types';
import { ErrorBanner } from '../../lib/components';
import {
  dispatchSuccessNotification,
  displayErrorMessage,
} from '../../lib/utils';
import { AUTH_URL } from '../../lib/graphql/queries';
import { LOG_IN } from '../../lib/graphql/mutations';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/authUrl/__generated__/AuthUrl';
import {
  LogIn as LogInData,
  LogInVariables,
} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import googleLogo from './assets/google_logo.jpg';

interface Props {
  setViewer: (viewer: Viewer) => void;
}
const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient();
  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        dispatchSuccessNotification('Logged in successfully!');
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      logInRef.current({
        variables: {
          input: {
            code,
          },
        },
      });
    }
  }, []);

  const handleAuthorizate = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch (error) {
      displayErrorMessage('Sorry, encountered errors, please retry later');
    }
  };

  if (logInLoading) {
    return (
      <Content className='log-in'>
        <Spin size='large' tip='Logging you in' />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  const LogInErrorBannerElement = logInError ? (
    <ErrorBanner description='Sorry, encountered errors, please retry later' />
  ) : null;

  return (
    <Content className='log-in'>
      {LogInErrorBannerElement}
      <Card className='log-in-card'>
        <div className='log-in-card__intro'>
          <Title level={3} className='log-in-card__intro-title'>
            {/* <span role='img' arrial-label='wave'>
              🤘
            </span> */}
          </Title>
          <Title level={3} className='log-in-card__intro-title'>
            Log in Cozy Homestay
          </Title>
          <Text>
            Sign in with your google account to start using our services
          </Text>
        </div>
        <button
          className='log-in-card__google-button'
          onClick={handleAuthorizate}
        >
          <img
            src={googleLogo}
            alt='Google Logon'
            className='log-in-card__google-button-logo'
          />
          <span className='log-in-card__google-button-text'>
            Sign in with Google
          </span>
        </button>
        <Text type='secondary'>
          By signing, you will be redirected to your Google content form.
        </Text>
      </Card>
    </Content>
  );
};
