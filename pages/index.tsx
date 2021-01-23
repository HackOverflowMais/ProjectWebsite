import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Text
} from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FiBook, FiStar } from 'react-icons/fi';

import Layout from '../components/layout';
import { Github } from '../models/github';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('http://localhost:3000/api/github');
    const data: Github = await res.json();
    if (!data) {
        return {
            redirect: {
                destination: '/je3ie3e',
                permanent: false
            }
        };
    }
    return { props: { data } };
};

export default function Home({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    return (
        <Layout>
            <Box m="5%">
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Heading>Test</Heading>
                <Box marginBottom="10%" marginX="5%">
                    <div style={{ justifyItems: 'center', marginLeft: '25%' }}>
                        <Image src="/logo.png" alt="Logo" width={500} height={300} />
                    </div>
                    <Heading
                        textAlign="center"
                        fontSize={{ base: '4xl', md: '6xl' }}
                        fontWeight="extrabold"
                        bgClip="text"
                        bgGradient="linear(315deg, #20bf55 0%, #01baef 74%);
                        ">
                        Team HackOverflow
                    </Heading>
                    <HStack mt="10" spacing="4" justify="center">
                        <Button
                            bg="#ebf8ff"
                            variant="ghost"
                            colorScheme="blue"
                            size={{ base: 'md', md: 'lg' }}>
                            Covid Visualized
                        </Button>

                        <Button
                            bg="#E6FFFA"
                            variant="ghost"
                            colorScheme="teal"
                            size={{ base: 'md', md: 'lg' }}>
                            Lung Scans
                        </Button>
                        <Button
                            bg="#F0FFF4"
                            variant="ghost"
                            colorScheme="green"
                            size={{ base: 'md', md: 'lg' }}>
                            Sentiment Analysis
                        </Button>
                    </HStack>
                </Box>
                <Box mt={10}>
                    <Heading textAlign="center">Meet the Team</Heading>
                    <SimpleGrid mt={5} columns={{ base: 2, md: 3 }} spacing={10}>
                        {data.members.map((val, index) => (
                            <a href={val.url} key={index}>
                                <Flex borderWidth="1px" borderRadius="lg" direction="column" p={5}>
                                    <Flex direction="row" marginBottom={3}>
                                        <Avatar mr={5} src={val.avatarUrl} />
                                        <Text mt={1} justifyContent="center">
                                            {val.name}
                                        </Text>
                                    </Flex>
                                    <Text>{val.bio}</Text>
                                </Flex>
                            </a>
                        ))}
                    </SimpleGrid>
                </Box>
                <Box mt={10}>
                    <Heading textAlign="center">Our Work!</Heading>
                    <SimpleGrid mt={5} columns={2} spacing={10}>
                        {data.repos.map((val, index) => (
                            <Flex
                                key={index}
                                borderWidth="1px"
                                borderRadius="lg"
                                direction="column"
                                p={5}>
                                <Flex direction="row" marginBottom={3}>
                                    <FiBook />
                                    <a href={val.url} style={{ color: '#0363cf' }}>
                                        <strong>
                                            <Heading size="md" justifyContent="center">
                                                {val.name}
                                            </Heading>
                                        </strong>
                                    </a>
                                </Flex>
                                <Text marginY={3}>{val.description}</Text>
                                <Flex direction="row">
                                    <div
                                        style={{
                                            height: '12px',
                                            width: '12px',
                                            borderRadius: '50%',
                                            backgroundColor: val.primaryLanguage.color
                                        }}
                                    />
                                    <Text>{val.primaryLanguage.name}</Text>
                                    <Flex ml={5}>
                                        <FiStar />
                                        <Text>{val.stargazerCount}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>
        </Layout>
    );
}
