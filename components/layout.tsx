import { Box } from '@chakra-ui/react';

export default function Layout({ children }) {
    return (
        <Box>
            <main>{children}</main>
        </Box>
    );
}
