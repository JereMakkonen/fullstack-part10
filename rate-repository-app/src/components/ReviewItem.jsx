import { View, StyleSheet, Pressable } from 'react-native';
import { Link} from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  rating: {
    borderColor: theme.colors.primary,
    borderRadius: 20,
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  view: {
    backgroundColor: theme.colors.primary,
  },
  delete: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewButtons = ({ review, onDelete }) => (
  <View style={styles.buttonContainer}>
    <Link
      to={`/repository/${review.repository.id}`}
      style={[styles.button, styles.view]}
    >
      <Text color="white" fontSize="subheading" fontWeight="bold">
        View repository
      </Text>
    </Link>
    <Pressable
      onPress={() => onDelete(review.id)}
      style={[styles.button, styles.delete]}
    >
      <Text color="white" fontSize="subheading" fontWeight="bold">
        Delete review
      </Text>
    </Pressable>
  </View>
);

const ReviewItem = ({ review, userReview = false, onDelete }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.rating}>
        <Text color="primary" fontSize="subheading">
          {review.rating}
        </Text>
      </View>
      <View style={styles.text}>
        <Text fontWeight="bold" fontSize="subheading">
          {userReview ? review.repository?.fullName : review.user?.username}
        </Text>
        <Text color="textSecondary">
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
    {userReview && <ReviewButtons review={review} onDelete={onDelete} />}
  </View>
);

export default ReviewItem;