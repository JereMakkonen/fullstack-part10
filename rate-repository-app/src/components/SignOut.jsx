import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import useSignOut from '../hooks/useSignOut';
import Text from './Text';

const SignOut = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  const onPress = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Pressable onPress={onPress} style={{ padding: 10 }}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        Sign out
      </Text>
    </Pressable>
  );
};

export default SignOut;