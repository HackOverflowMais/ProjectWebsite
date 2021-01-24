import { Box, Button, Container, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import Layout from '../components/layout';
export default function Sentiment() {
    const [loading, SetLoading] = useState(false);
    const [output, SetOutput] = useState();
    const [input, SetIntput] = useState('Enter Text for analysis');

    const handleChange = (event) => {
        SetIntput(event.target.value);
    };

    const handleSubmission = () => {
        SetLoading(true);
        fetch(`https://83268a9bbdd1.ngrok.io/sentence?sentence=${input}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Analysis:', result);
                SetOutput(result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        const sleep = (milliseconds) => {
            return new Promise((resolve) => setTimeout(resolve, milliseconds));
        };
        sleep(2000).then(() => {
            SetLoading(false);
        });
    };
    return (
        <Layout>
            <Container paddingTop={{ base: '30%', md: '15%' }}>
                <Heading m={10}>Enter Text for Analysis</Heading>
                <Box margin={10} justifyItems="center">
                    {loading ? (
                        <Spinner size="lg" color="teal.200" />
                    ) : output ? (
                        <Text margin={10} color="white" bg="black" fontFamily="monospace">
                            Analysis {JSON.stringify(output)}
                        </Text>
                    ) : (
                        <br />
                    )}
                </Box>
                <Input margin={10} value={input} onChange={handleChange} />
                <Button
                    colorScheme="blue"
                    margin={10}
                    size="lg"
                    isLoading={loading}
                    onClick={handleSubmission}>
                    Submit
                </Button>
            </Container>
        </Layout>
    );
}
