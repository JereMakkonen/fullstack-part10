import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white'
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  error: {
    borderColor: theme.colors.error,
    color: theme.colors.error,
    marginBottom: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string().min(5).max(30)
    .required('Username is required'),
  password: yup
    .string().min(5).max(30)
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const FormInput = ({ formik, name, placeholder, secure = true }) => {
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <>
      <TextInput
        style={[styles.input, hasError && styles.error]}
        placeholder={placeholder}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        secureTextEntry={secure}
      />
      {hasError && <Text style={styles.error}>{formik.errors[name]}</Text>}
    </>
  );
};

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirm: '' },
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <FormInput formik={formik} name="username" placeholder="Username" secure={false} />
      <FormInput formik={formik} name="password" placeholder="Password" />
      <FormInput formik={formik} name="passwordConfirm" placeholder="Confirm Password" />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;