import { Box, Button, Container, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Chart } from 'react-google-charts';

import Layout from '../components/layout';
import { Sentiment } from '../models/sentiment';
export default function SentimentPage() {
    const [loading, SetLoading] = useState(false);
    const [output, SetOutput] = useState(null);
    const [input, SetIntput] = useState('Enter Text for analysis');

    const handleChange = (event) => {
        SetIntput(event.target.value);
    };

    const ProcessOutput = (object: Sentiment) => {
        const datalist = [
            [
                'Emotion',
                'Score',
                { role: 'style' },
                {
                    sourceColumn: 0,
                    role: 'annotation',
                    type: 'string',
                    calc: 'stringify'
                }
            ],
            [
                'Anger',
                object.prediction.Anger,
                'fill-color: #ff6384; stroke-color: rgba(255, 99, 132, 1);',
                null
            ],
            [
                'Sadness',
                object.prediction.Sadness,
                'fill-color: #36a2eb; stroke-color: rgba(54, 162, 235, 1);',
                null
            ],
            [
                'Fear',
                object.prediction.Fear,
                'fill-color: #9966ff; stroke-color: rgba(153, 102, 255, 1);',
                null
            ],
            [
                'Disgust',
                object.prediction.Disgust,
                'fill-color:#4bc0c0; stroke-color: rgba(75, 192, 192, 1);',
                null
            ],
            [
                'Happiness',
                object.prediction.Happiness,
                'fill-color:#ffce56; stroke-color: rgba(255, 206, 86, 1);',
                null
            ],
            [
                'Anxiety',
                object.prediction.Anxiety,
                'fill-color:#ff9f40; stroke-color: rgba(255, 159, 64, 1);',
                null
            ],
            [
                'Worry',
                object.prediction.Worry,
                'fill-color:#e2ddd9; stroke-color: rgba(255, 159, 64, 1);',
                null
            ],
            [
                'Relaxation',
                object.prediction.Relaxation,
                'fill-color: #30cb00; stroke-color: rgba(255, 159, 64, 1);',
                null
            ],
            [
                'Desire',
                object.prediction.Desire,
                'fill-color: #ff77bc; stroke-color: rgba(255, 159, 64, 1);',
                null
            ]
        ];
        console.log(datalist);
        return datalist;
    };

    const handleSubmission = () => {
        SetLoading(true);
        fetch(`https://hackoverflow-backend.herokuapp.com/sentence?sentence=${input}`, {
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
            <Container paddingX="2%" maxW="2xl" paddingTop={{ base: '30%', md: '15%' }}>
                <Heading m={2}>Enter Text for Analysis</Heading>
                <Box margin={2}>
                    {loading ? (
                        <Spinner size="lg" color="teal.200" />
                    ) : output !== null ? (
                        <Chart
                            style={{ marginLeft: '-3em' }}
                            chartType="BarChart"
                            loader={<Spinner size="lg" color="teal.200" />}
                            data={ProcessOutput(output)}
                            options={{
                                title: 'Emotional Weightage',
                                width: 800,
                                height: 700,
                                animation: {
                                    startup: true,
                                    easing: 'linear',
                                    duration: 1500
                                },
                                hAxis: {
                                    title: 'Score of emotion in sentence'
                                },
                                vAxis: {
                                    title: 'emotion'
                                },
                                bar: { groupWidth: '80%' },
                                legend: { position: 'none' }
                            }}
                        />
                    ) : (
                        <br />
                    )}
                </Box>
                <Input margin={2} value={input} onChange={handleChange} />
                <Button
                    colorScheme="blue"
                    margin={2}
                    size="lg"
                    isLoading={loading}
                    onClick={handleSubmission}>
                    Submit
                </Button>
            </Container>
        </Layout>
    );
}
