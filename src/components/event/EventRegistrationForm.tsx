import * as React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export interface IEventRegistrationFormProps {
}

export const EventRegistrationForm: React.FC<IEventRegistrationFormProps> = () => (
    <React.Fragment>
        <Card fluid>
            <Card.Content>
                {/*  */}
                <Card.Header>
                    <Icon name='arrow left' link onClick={() => { }} />
                    <span>Event Information</span>
                </Card.Header>
            </Card.Content>
        </Card>
        <Card fluid>
            {/*  */}
            <Card.Content>
                <Card.Header>Event Name</Card.Header>
                <Card.Meta>July 8, 2019</Card.Meta>
            </Card.Content>
            {/*  */}
            <Card.Content>

            </Card.Content>
        </Card>
    </React.Fragment>
);
