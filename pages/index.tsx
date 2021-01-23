import { Container, Heading } from '@chakra-ui/react';
import Head from 'next/head';

import Layout from '../components/layout';

export default function Home() {
    return (
        <Layout>
            <Container>
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Heading>Test</Heading>
            </Container>
        </Layout>
    )
