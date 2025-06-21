import { View, StyleSheet, Pressable, Linking } from 'react-native';
import Text from './../Text';
import theme from '../../theme';
import RepositoryHeader from './RepositoryHeader';
import RepositoryStats from './RepositoryStats';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: theme.colors.primary,
    margin: 10,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  }
});

const RepositoryItem = ({ repository, showUrl }) => {
  const onPress = () => Linking.openURL(repository.url);

  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryHeader repository={repository} />
      <RepositoryStats repository={repository} />
      {!showUrl ? null :
        <Pressable style={styles.button} onPress={onPress}>
          <Text color="white" fontWeight="bold" fontSize="subheading">
            Open in GitHub
          </Text>
        </Pressable>
      }
    </View>
  );
};

export default RepositoryItem;
