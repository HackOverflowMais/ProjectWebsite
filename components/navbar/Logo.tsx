import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export default function Logo(props) {
    return (
        <Box {...props}>
            <Image src="/logo1.png" height={75} width={75} alt="Hackoverflow" />
        </Box>
    );
}
