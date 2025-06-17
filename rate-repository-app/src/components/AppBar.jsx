import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row'
  },
  tab: {
    padding: 10,
  },
});

const Tab = ({ text, path }) => (
  <Link to={path} style={styles.tab}>
    <Text color="white" fontSize="subheading" fontWeight="bold">
      {text}
    </Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab text="Repositories" path="/" />
        <Tab text="Sign in" path="/SignIn" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
