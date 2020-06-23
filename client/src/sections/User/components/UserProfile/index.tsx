import React, { Fragment } from 'react';
import { Avatar, Card, Divider, Typography, Button } from 'antd';
import { User as UserData } from '../../../../lib/graphql/queries/User/__generated__/User';
interface Props {
  user: UserData['user'];
  viewerIsUser: boolean;
}

const { Paragraph, Text, Title } = Typography;
export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const additionalDetailsSestion = viewerIsUser ? (
    <Fragment>
      <Divider />
      <div className='user-profile__details'>
        <Title level={4}>Interested in becoming a host?</Title>
        <Paragraph>
          You can become a host to let other users rent your places and earing
          income by connecting to your Stripe payment.
        </Paragraph>
        <Button type='primary' className='user-profile_-details-cta'>
          Connect with Stripe
        </Button>
        <Paragraph type='secondary'>
          We use{' '}
          <a
            href='https://stripe.com/en-US/connect'
            target='_blank'
            rel='noopener noreferrer'
          >
            Stripe
          </a>{' '}
          to secure and transfer your earnings.
        </Paragraph>
      </div>
    </Fragment>
  ) : null;

  return (
    <div className='user-profile'>
      <Card className='user-profile__card'>
        <div className='user-profile__avatar'>
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className='user-profile__details'>
          <Title level={4}>My Profile</Title>
          <Paragraph>
            Name: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact: <Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailsSestion}
      </Card>
    </div>
  );
};
