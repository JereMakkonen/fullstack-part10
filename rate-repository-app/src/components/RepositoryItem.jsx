import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 15,
  },
  titleColumn: {
    flexDirection: 'column',
    flexShrink: 1,
    paddingLeft: 15,
  },
  image: {
    borderRadius: 4,
    width: 50,
    height: 50,
  },
  languageBox: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    padding: 5,
    marginTop: 5,
    borderRadius: 4,
  },
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

const RepositoryItem = ({ repository }) => {
  const rnd = num => `${Math.round(num / 100) / 10}k`;

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.titleRow}>
        <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.titleColumn}>
          <Text fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
          <Text color="secondary">{repository.description}</Text>
          <View style={styles.languageBox}>
            <Text color="white">{repository.language}</Text>
          </View>
        </View>
      </View>
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
          <Text fontWeight="bold">{repository.reviewCount}</Text>
          <Text color="secondary">Reviews</Text>
        </View>
        <View style={styles.centeredColumn}>
          <Text fontWeight="bold">{repository.ratingAverage}</Text>
          <Text color="secondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
