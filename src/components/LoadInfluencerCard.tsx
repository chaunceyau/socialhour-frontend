import React from 'react'
import { Card, Placeholder } from 'semantic-ui-react';

interface ILoadInfluencerCardProps {

}

export const LoadInfluencerCard: React.FC<ILoadInfluencerCardProps> = () => (
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
)