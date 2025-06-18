import { Pressable } from 'react-native';
import useSignOut from '../hooks/useSignOut';
import Text from './Text';

const SignOut = () => {
  const signOut = useSignOut();

  return (
    <Pressable onPress={signOut} style={{ padding: 10 }}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        Sign out
      </Text>
    </Pressable>
  );
};

export default SignOut;