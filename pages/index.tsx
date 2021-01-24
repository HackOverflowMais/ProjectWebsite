import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text
} from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FiBook, FiStar } from 'react-icons/fi';

import Layout from '../components/layout';
import { Github } from '../models/github';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('https://hackoverflow-omega.vercel.app/api/github');
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
            <Box>
                <Head>
                    <link rel="icon" href="/logo.ico" />
                </Head>
                <Box marginBottom="10%" marginX="5%" paddingTop="10em">
                    <Box justifyItems="center" marginLeft={['0', '0', '5em', '30%']}>
                        <Image src="/logo.png" alt="Logo" width={456} height={547} />
                    </Box>
                    <Heading
                        textAlign="center"
                        fontSize={{ base: '4xl', md: '6xl' }}
                        fontWeight="extrabold"
                        bgClip="text"
                        bgGradient="linear(315deg, #20bf55 0%, #01baef 74%);
                        ">
                        Team HackOverflow
                    </Heading>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        mt="10"
                        spacing="4"
                        justify="center">
                        <Link href="/visualization">
                            <Button bg="#ebf8ff" variant="ghost" colorScheme="blue" size="lg">
                                Covid Visualized
                            </Button>
                        </Link>
                        <Link href="covilungscan">
                            <Button bg="#E6FFFA" variant="ghost" colorScheme="teal" size="lg">
                                Lung Scans
                            </Button>
                        </Link>
                        <Link href="sentiment">
                            <Button bg="#F0FFF4" variant="ghost" colorScheme="green" size="lg">
                                Sentiment Analysis
                            </Button>
                        </Link>
                    </Stack>
                </Box>
                <Box m={10}>
                    <Heading textAlign="center">Meet the Team</Heading>
                    <SimpleGrid mt={5} columns={{ base: 1, md: 3 }} spacing={10}>
                        {data.members.map((val, index) => (
                            <a href={val.url} key={index}>
                                <Flex borderWidth="1px" borderRadius="lg" direction="column" p={5}>
                                    <Flex direction="row" marginBottom={3}>
                                        <Avatar alt={val.name} mr={5} src={val.avatarUrl} />
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
                <Box m={10}>
                    <Heading textAlign="center">Our Work!</Heading>
                    <SimpleGrid mt={5} columns={{ base: 1, md: 2 }} spacing={10}>
                        {data.repos.map((val, index) => (
                            <Flex
                                key={index}
                                borderWidth="1px"
                                borderRadius="lg"
                                direction="column"
                                p={5}>
                                <Flex direction="row" marginBottom={3}>
                                    <FiBook style={{ marginTop: '0.25em' }} />
                                    <a
                                        href={val.url}
                                        style={{ color: '#0363cf', marginLeft: '0.5em' }}>
                                        <Heading
                                            _hover={{ borderBottom: '2px' }}
                                            fontWeight="bold"
                                            size="md"
                                            justifyContent="center">
                                            {val.name}
                                        </Heading>
                                    </a>
                                </Flex>
                                <Text marginY={3}>{val.description}</Text>
                                <Flex direction="row">
                                    <div
                                        style={{
                                            height: '12px',
                                            width: '12px',
                                            borderRadius: '50%',
                                            marginTop: '0.30em',
                                            marginRight: '0.5em',
                                            backgroundColor: val.primaryLanguage.color
                                        }}
                                    />
                                    <Text>{val.primaryLanguage.name}</Text>
                                    <Flex ml={8}>
                                        <FiStar
                                            style={{ marginTop: '0.25em', marginRight: '0.25em' }}
                                        />
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
