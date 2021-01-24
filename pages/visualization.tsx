import { Box, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';

import Layout from '../components/layout';

export default function Visualization() {
    return (
        <Layout>
            <Heading textAlign="center">Covid Visualized</Heading>
            <Box paddingTop="20%">
                <iframe
                    title="Visualization"
                    src="https://hackoverflowmais.github.io/simulate-covid/"
                    width="100%"
                    height="500px"
                />
            </Box>
            <Flex mt={10} direction={{ base: 'column', md: 'row' }}>
                <Flex direction="column">
                    <Heading size="lg">Countiries with teh Most covid cases</Heading>
                    <Image
                        src="/newplot.png"
                        alt="top 10 confirmed cases"
                        height={300}
                        width={300}
                    />
                </Flex>
                <Flex direction="column">
                    <Heading size="lg">States in India with most covid cases</Heading>
                    <Image
                        src="/plot2.png"
                        alt="top 10 confirmed case by state Indias"
                        height={300}
                        width={300}
                    />
                </Flex>
            </Flex>
        </Layout>
    );
}
