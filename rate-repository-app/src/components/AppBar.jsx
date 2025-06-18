import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';
import Text from './Text';
import SignOut from './SignOut';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row'
  }
});

const Tab = ({ text, path }) => (
  <Link to={path} style={{ padding: 10 }}>
    <Text color="white" fontSize="subheading" fontWeight="bold">
      {text}
    </Text>
  </Link>
);

const AppBar = () => {
  const { data } = useQuery(ME);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab text="Repositories" path="/" />
        {data?.me ? <SignOut /> : <Tab text="Sign in" path="/SignIn" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
