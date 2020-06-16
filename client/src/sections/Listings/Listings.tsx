import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';

import { Avatar, Button, List, Spin, Skeleton, Divider, Alert } from 'antd';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';
// import { ListingsSkeleton } from './components/ListingsSkeleton/listingsSkeleton';
import './styles/Listings.css';
import Paragraph from 'antd/lib/skeleton/Paragraph';
// import {
//   ListingsData,
//   DeleteListingData,
//   DeleteListingVariables,
// } from './types';

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}
export const Listings = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout='horizontal'
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type='dashed'
              danger
              onClick={() => {
                handleDeleteListing(listing.id);
              }}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape='square' size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <div className='listings'>
        <h2>{title}</h2>
        <Skeleton active paragraph={{ rows: 1 }} />
        <Divider />
        <Skeleton active paragraph={{ rows: 1 }} />
        <Divider />
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
    );
  }

  return (
    <div className='listings'>
      <Spin spinning={deleteListingLoading}>
        <h2>{title}</h2>
        {listingsList}
        {/* {deleteListingLoadingMessage} */}
        {/* {deleteListingErrorMessage} */}
      </Spin>
    </div>
  );
};
