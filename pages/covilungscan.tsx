import { Box, Button, Container, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import Layout from '../components/layout';

export default function CoviPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [loading, SetLoading] = useState(false);
    const [output, SetOutput] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        SetLoading(true);
        fetch('http://83268a9bbdd1.ngrok.io/image', {
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
            <Container paddingTop="20%">
                <Heading m={10}>Upload Scan</Heading>
                <input type="file" name="file" onChange={changeHandler} />
                {loading ? (
                    <Spinner />
                ) : output ? (
                    <Text color="white" fontFamily="white" bg="black">
                        Covid is {JSON.stringify(output)}
                    </Text>
                ) : (
                    <br />
                )}
                {selectedFile !== undefined && selectedFile !== null ? (
                    isSelected ? (
                        <div>
                            <Box p={5}>
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.type}</p>
                                <p>Size in bytes: {selectedFile.size}</p>
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
                    <Button isLoading={loading} onClick={handleSubmission}>
                        Submit
                    </Button>
                </div>
            </Container>
        </Layout>
    );
}
