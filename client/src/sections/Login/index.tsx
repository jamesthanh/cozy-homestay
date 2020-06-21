import React from 'react';
import { Card, Layout, Typography, Button } from 'antd';
import googleLogo from './assets/google_logo.jpg';
const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = () => {
  return (
    <Content className='log-in'>
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
        <Button className='log-in-card__google-button'>
          <img
            src={googleLogo}
            alt='Google Logon'
            className='log-in-card__google-button-logo'
          />
          <span className='log-in-card__google-button-text'>
            Sign in with Google
          </span>
        </Button>
        <Text type='secondary'>
          By signing, you will be redirected to your Google content form.
        </Text>
      </Card>
    </Content>
  );
};
