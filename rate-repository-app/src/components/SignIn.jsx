import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';

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
  inputError: {
    borderColor: theme.colors.error,
  },
  errorMessage: {
    color: theme.colors.error,
    marginBottom: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  const hasError = field => formik.touched[field] && formik.errors[field];

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, hasError('username') && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {hasError('username') &&
        <Text style={styles.errorMessage}>{formik.errors.username}</Text>
      }
      <TextInput
        style={[styles.input, hasError('password') && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {hasError('password') &&
        <Text style={styles.errorMessage}>{formik.errors.password}</Text>
      }
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;