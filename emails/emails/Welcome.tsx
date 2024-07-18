import React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text } from '@react-email/components';

const WelcomeEmail = ({ title, message }) => (
    <Html>
        <Head />
        <Preview>Welcome to Lumatic!</Preview>
        <Body>
            <Container>
                <Heading>{title}</Heading>
                <Text>{message}</Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;
