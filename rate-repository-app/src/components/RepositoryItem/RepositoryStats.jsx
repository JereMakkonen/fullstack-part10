import { View, StyleSheet } from 'react-native';
import Text from './../Text';

const styles = StyleSheet.create({
  centeredRow: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center'
  },
  centeredColumn: {
    flexDirection: 'column',
    flexShrink: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  }
});

const RepositoryStats = ({ repository }) => {
  const rnd = num => num > 999 ? `${Math.round(num / 100) / 10}k` : num;

  return (
    <View style={styles.centeredRow}>
      <View style={styles.centeredColumn}>
        <Text fontWeight="bold">{rnd(repository.stargazersCount)}</Text>
        <Text color="secondary">Stars</Text>
      </View>
      <View style={styles.centeredColumn}>
        <Text fontWeight="bold">{rnd(repository.forksCount)}</Text>
        <Text color="secondary">Forks</Text>
      </View>
      <View style={styles.centeredColumn}>
        <Text fontWeight="bold">{rnd(repository.reviewCount)}</Text>
        <Text color="secondary">Reviews</Text>
      </View>
      <View style={styles.centeredColumn}>
        <Text fontWeight="bold">{rnd(repository.ratingAverage)}</Text>
        <Text color="secondary">Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;
