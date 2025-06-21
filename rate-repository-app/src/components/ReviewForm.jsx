import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { CREATE_REVIEW } from '../graphql/mutations';
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
  username: yup.string().required('Username is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  review: yup.string(),
});

const FormInput = ({ formik, name, placeholder, multiline = false }) => {
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <>
      <TextInput
        style={[styles.input, hasError && styles.error]}
        placeholder={placeholder}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        multiline={multiline}
      />
      {hasError && <Text style={styles.error}>{formik.errors[name]}</Text>}
    </>
  );
};

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.username,
            repositoryName: values.name,
            rating: parseInt(values.rating),
            text: values.review,
          }
        }
      });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: { username: '', name: '', rating: null, review: '' },
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <FormInput formik={formik} name="username" placeholder="Repository owner name" />
      <FormInput formik={formik} name="name" placeholder="Repository name" />
      <FormInput formik={formik} name="rating" placeholder="Rating" />
      <FormInput formik={formik} name="review" placeholder="Review" multiline />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;