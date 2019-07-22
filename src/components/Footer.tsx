import * as React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export interface IFooterProps {
}

export default class Footer extends React.Component<IFooterProps> {
    render() {
        return (
            <Segment inverted style={{ flex: 1 }} >
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column>
                            <b>© SocialHour 2019</b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to='/tos'>Terms of Use</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to='/privacy'>Privacy Policy</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to='/careers'>Careers</Link>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
