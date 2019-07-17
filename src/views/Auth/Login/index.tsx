import * as React from 'react';
import { Container, Segment, Grid, Image, Form, Button, Divider } from 'semantic-ui-react';

export interface ILoginProps {
}

export default class Login extends React.Component<ILoginProps> {
    render() {
        return (
            <Container textAlign='center'>
                <br />
                <Grid doubling stackable centered>
                    <Grid.Row>
                        <Grid.Column width={7}>
                            <Segment>
                                <Image centered size="tiny" src={require('../../../assets/logostacked@4x.png')} />
                                <br />
                                <Form>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input placeholder='Enter your email...' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <input placeholder='Enter your password...' />
                                    </Form.Field>
                                    <Button type='submit' onClick={() => { }} fluid content='Login' />
                                    <Grid>
                                        <Grid.Row columsn={3}>
                                            <Grid.Column width={7}>
                                                <Divider />
                                            </Grid.Column>
                                            <Grid.Column width={1} verticalAlign='middle'>
                                                <b>or</b>
                                            </Grid.Column>
                                            <Grid.Column width={7}>
                                                <Divider />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container >
        );
    }
}
