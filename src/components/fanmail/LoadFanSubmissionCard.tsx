import * as React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

export interface ILoadFanSubmissionCardProps {
}

export const LoadFanSubmissionCard: React.FC<ILoadFanSubmissionCardProps> = (props: ILoadFanSubmissionCardProps) =>
    (
        <Card>
            <Placeholder>
                <Placeholder.Image  />
            </Placeholder>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length='very short' />
                        <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                </Placeholder>
            </Card.Content>
        </Card>
    );
