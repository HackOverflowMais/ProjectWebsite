import { Box, Button, Container, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import Layout from '../components/layout';

export default function CoviPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [loading, SetLoading] = useState(false);
    const [output, SetOutput] = useState(null);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        SetLoading(true);
        fetch('https://83268a9bbdd1.ngrok.io/image', {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Covid:', result.covid);
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
                <Heading m={10}>Upload Scan</Heading>
                <input type="file" name="file" onChange={changeHandler} />
                <Box margin={10} justifyItems="center">
                    {loading ? (
                        <Spinner size="lg" color="teal.200" />
                    ) : output !== null ? (
                        <Text margin={10} fontFamily="monospace">
                            Covid Prediction:{' '}
                            {JSON.stringify(output).split(':')[1].replace('}', '')}
                        </Text>
                    ) : (
                        <br />
                    )}
                </Box>
                {selectedFile !== undefined && selectedFile !== null ? (
                    isSelected ? (
                        <div>
                            <Box p={5} borderWidth="1px" borderRadius="lg">
                                <Text>
                                    <strong>Filename:</strong> {selectedFile.name}
                                </Text>
                                <Text>
                                    <strong>Filetype:</strong> {selectedFile.type}
                                </Text>
                                <Text>
                                    <strong>Size in bytes:</strong> {selectedFile.size}
                                </Text>
                                <Image
                                    height={150}
                                    width={150}
                                    src={URL.createObjectURL(selectedFile)}
                                />
                            </Box>
                        </div>
                    ) : (
                        <Text>Please Select a File!</Text>
                    )
                ) : (
                    <Text>Please Select a File!</Text>
                )}
                <div>
                    <Button
                        colorScheme="green"
                        size="lg"
                        margin={10}
                        isLoading={loading}
                        onClick={handleSubmission}>
                        Submit
                    </Button>
                </div>
            </Container>
        </Layout>
    );
}
