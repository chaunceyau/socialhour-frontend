import React from 'react'
import { Card, Placeholder } from 'semantic-ui-react';

interface IInfluencerProfileLoadProps {

}

export const InfluencerProfileLoad: React.FC<IInfluencerProfileLoadProps> = (props) => (
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
            <Placeholder>
                <Placeholder.Paragraph>
                    <Placeholder.Line length='short' />
                </Placeholder.Paragraph>
            </Placeholder>
        </Card.Content>
    </Card>
)


