import * as React from 'react';
import { Segment, Grid, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export interface IFooterProps {
}

export const Footer: React.FC<IFooterProps> = () => (
    <FooterWrap>
        <Segment inverted>
            <Container>
                <Grid stackable>
                    <Grid.Row columns={6}>

                        <Grid.Column>
                            <b>© SocialHour 2019</b>
                        </Grid.Column>
                        <Grid.Column>
                            <Link to='/tos'>Terms of Use</Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link to='/privacy'>Privacy Policy</Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link to='/careers'>Careers</Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link to='/influencer/info'>Influencer Info</Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link to='/contact'>Contact Us</Link>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </FooterWrap>
);

const FooterWrap = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: black
`
