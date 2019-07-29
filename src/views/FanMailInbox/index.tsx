import * as React from 'react';
import { Segment, Label, Table, Icon, Checkbox, Image, Popup, Container } from 'semantic-ui-react';

export interface IFanMailInboxProps {
}

/**
 * Administrative side of viewing mail from fans
 */
export default class FanMailInbox extends React.Component<IFanMailInboxProps> {
    render() {
        return (
            <Container>
                <Segment>
                    <Label attached='top' content='Fanmail Inbox' />
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='5'>
                                    <Popup
                                        trigger={<Icon name='trash' />}
                                        content={'Are you sure?'}
                                    />
                                    <Icon name='folder' />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='1'><Checkbox /></Table.HeaderCell>
                                <Table.HeaderCell colSpan='1'>From</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1'>Video</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1'>Description</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1'>Donation</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                fanmail.map(mail => {
                                    return (
                                        <Table.Row>
                                            <Table.Cell collapsing>
                                                <Checkbox />
                                            </Table.Cell>
                                            <Table.Cell collapsing>
                                                {mail.from.name}
                                            </Table.Cell>
                                            <Table.Cell collapsing>
                                                <Image size='mini' src={mail.video_thumbnail} />
                                            </Table.Cell>
                                            <Table.Cell>Initial commit</Table.Cell>
                                            <Table.Cell collapsing textAlign='right'>
                                                10 hours ago
                                        </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }

                        </Table.Body>
                    </Table>
                </Segment>
            </Container>
        );
    }
}


const fanmail = [
    {
        id: 'fldsamfd',
        video_url: '',
        video_thumbnail: 'https://i.huffpost.com/gen/1200517/thumbs/o-148480617-570.jpg?1',
        from: {
            id: 'dsfalm42',
            name: 'Jacob A.'
        }
    },
    {
        id: 'fldsamfd',
        video_url: '',
        video_thumbnail: 'https://i.huffpost.com/gen/1200517/thumbs/o-148480617-570.jpg?1',
        from: {
            id: 'dsfalm42',
            name: 'Jacob A.'
        }
    },
    {
        id: 'fldsamfd',
        video_url: '',
        video_thumbnail: 'https://i.huffpost.com/gen/1200517/thumbs/o-148480617-570.jpg?1',
        from: {
            id: 'dsfalm42',
            name: 'Jacob A.'
        }
    },
    {
        id: 'fldsamfd',
        video_url: '',
        video_thumbnail: 'https://i.huffpost.com/gen/1200517/thumbs/o-148480617-570.jpg?1',
        from: {
            id: 'dsfalm42',
            name: 'Jacob A.'
        }
    },
    {
        id: 'fldsamfd',
        video_url: '',
        video_thumbnail: 'https://i.huffpost.com/gen/1200517/thumbs/o-148480617-570.jpg?1',
        from: {
            id: 'dsfalm42',
            name: 'Jacob A.'
        }
    },
    {
        id: 'fldsamfd',
        video_url: '',
        video_thumbnail: 'https://i.huffpost.com/gen/1200517/thumbs/o-148480617-570.jpg?1',
        from: {
            id: 'dsfalm42',
            name: 'Jacob A.'
        }
    }
]