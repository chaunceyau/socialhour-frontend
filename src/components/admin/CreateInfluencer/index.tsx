import * as React from 'react';
import { Formik, FormikActions } from 'formik';
import { client } from '../../../client';
import { gql } from 'apollo-boost'
import { Form, Button, Container } from 'semantic-ui-react';

export interface ICreateInfluencerProps {
}

interface IFanMailFormValues {
    name: string
    avatar_url: string
    title: string
}

const MUTATION_CREATE_INFLUENCER = gql`
    mutation ($name: String!, $avatar_url: String!, $title: String!) {
        createInfluencer(name: $name, avatar_url: $avatar_url, title: $title) {
            id
        }
    }
`

export default class CreateInfluencer extends React.Component<ICreateInfluencerProps> {
    render() {
        return (
            <Container>
                <h2>Create Influencer</h2>
                <Formik
                    initialValues={{
                        name: '',
                        avatar_url: '',
                        title: ''
                    }}
                    onSubmit={(values: IFanMailFormValues, actions: FormikActions<IFanMailFormValues>) => {
                        client.mutate({
                            mutation: MUTATION_CREATE_INFLUENCER,
                            variables: {
                                name: values.name,
                                avatar_url: values.avatar_url,
                                title: values.title
                            }
                        }, `{ id }`)
                            .then((data: any) => {
                                console.log(data)
                                actions.setSubmitting(false)
                            })
                            .catch((err: any) => {
                                console.log(err)
                                actions.setSubmitting(false)
                            })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => {
                        return (

                            <Form onSubmit={handleSubmit} loading={isSubmitting}>
                                <Form.Field required>
                                    <label>Name</label>
                                    <Form.Input
                                        error={errors.name && touched.name && errors.name}
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Avatar Url</label>
                                    <Form.Input
                                        error={errors.avatar_url && touched.avatar_url && errors.avatar_url}
                                        type="text"
                                        name="avatar_url"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.avatar_url}
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Title</label>
                                    <Form.Input
                                        error={errors.title && touched.title && errors.title}
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />
                                </Form.Field>
                                <Button type='submit' content='Submit' positive />
                            </Form>
                        )
                    }}
                </Formik>
            </Container>
        );
    }
}
