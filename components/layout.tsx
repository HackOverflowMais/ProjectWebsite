import { Box } from '@chakra-ui/react';

import Navbar from './navbar/navbar';
export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Box>
                <main>{children}</main>
            </Box>
        </>
    );
}
