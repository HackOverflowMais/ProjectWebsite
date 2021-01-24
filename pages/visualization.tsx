import { Box, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';

import Layout from '../components/layout';

export default function Visualization() {
    return (
        <Layout>
            <Heading textAlign="center">Covid Visualized</Heading>
            <Box paddingTop={{ base: '20%', md: '10%' }}>
                <iframe
                    title="Visualization"
                    src="https://hackoverflowmais.github.io/simulate-covid/"
                    width="100%"
                    height="1200px"
                />
            </Box>
            <Flex justify="center" mt={10} m={10} direction={{ base: 'column', md: 'row' }}>
                <Flex margin={5} direction="column">
                    <Heading size="md">Countries with the Most covid cases</Heading>
                    <Image
                        src="/newplot.png"
                        alt="top 10 confirmed cases"
                        height={500}
                        width={700}
                    />
                </Flex>
                <Flex direction="column" margin={5}>
                    <Heading size="md">States in India with most covid cases</Heading>
                    <Image
                        src="/plot2.png"
                        alt="top 10 confirmed case by state Indias"
                        height={500}
                        width={700}
                    />
                </Flex>
            </Flex>
        </Layout>
    );
}
