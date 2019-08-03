import * as React from 'react';
import { Card, Image, Icon, Popup } from 'semantic-ui-react';
import { IUser } from '../Interfaces';
import { InfluencerProfileLoad } from '.'
import { AtLeastOne } from '../Config';

interface IPossibleProfileProps {
    loading?: boolean
    avatar_url?: string
    name?: string
    title?: string
}

interface ILoading extends IPossibleProfileProps {
    loading: boolean
}

interface IProfile extends IPossibleProfileProps {
    avatar_url: string
    name: string
    title: string
}

type IProfileProps = IProfile | ILoading

const Profile: React.FC<IProfileProps> = (props: IProfileProps) => {
    if (props.loading)
        return <InfluencerProfileLoad />
    
    return (
        <Card fluid>
            <Image src={props.avatar_url} />
            <Card.Content>
                <Card.Header>
                    <Popup
                        trigger={
                            <Icon name='check circle' color='blue' />
                        }
                        content='Verified User'
                        position='bottom left'
                    />
                    <span>{props.name}</span>
                </Card.Header>
                <Card.Meta>{props.title}</Card.Meta>
            </Card.Content>
            <Card.Content>
                <span>
                    Bio coming soon...
                    </span>
            </Card.Content>
        </Card>
    );

}

export default Profile