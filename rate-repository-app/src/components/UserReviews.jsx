import { View, FlatList, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_CURRENT_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={{ height: 10 }} />;

const UserReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onError: (error) => console.log(error)
  });

  if (loading || error) return null;

  const onDelete = (id) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteReview({ variables: { id } });
          refetch();
        },
      },
    ]);
  };

  const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) =>
        <ReviewItem review={item} userReview={true} onDelete={onDelete} />
      }
    />
  );
};

export default UserReviews;