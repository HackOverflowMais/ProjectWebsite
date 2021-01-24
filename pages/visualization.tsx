import { Box } from '@chakra-ui/react';

import Layout from '../components/layout';

export default function Visualization() {
    return (
        <Layout>
            <Box paddingTop="5%">
                <iframe
                    title="Visualization"
                    src="https://hackoverflowmais.github.io/simulate-covid/"
                    width="100%"
                />
            </Box>
        </Layout>
    );
}
