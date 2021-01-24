import { Box } from '@chakra-ui/react';

import Layout from '../components/layout';

export default function Visualization() {
    return (
        <Layout>
            <Box paddingTop="20%">
                <iframe
                    title="Visualization"
                    src="https://hackoverflowmais.github.io/simulate-covid/"
                    width="100%"
                    height="500px"
                />
            </Box>
        </Layout>
    );
}
