import { View, StyleSheet, Image } from 'react-native';
import Text from './../Text';
import theme from '../../theme';

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
  }
});

const RepositoryHeader = ({ repository }) => (
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
);

export default RepositoryHeader;