import * as React from 'react';
import { Grid, Card, Placeholder } from 'semantic-ui-react';

export interface IInfluencerPageLoadingProps {
}

export default class InfluencerPageLoading extends React.Component<IInfluencerPageLoadingProps> {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    {/*  */}
                    <Grid.Column width={5}>
                        <Card>
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                            <Card.Content>
                                <Placeholder>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='very short' />
                                        <Placeholder.Line length='medium' />
                                    </Placeholder.Header>
                                </Placeholder>
                            </Card.Content>
                            <Card.Content>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    
                    {/*  */}
                    <Grid.Column width={11}>

                    </Grid.Column>
                </Grid.Row>

            </Grid>
        );
    }
}
