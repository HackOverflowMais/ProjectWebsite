import { Box, Button, Flex, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import Logo from './Logo';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Logo w="100px" color="white" />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H16V2H0V0ZM5.33333 7H16V9H5.33333V7ZM0 14H16V16H0V14Z" fill='white'></path>
    </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
    return (
        <Link href={to}>
            <Text fontWeight="bold" display="block" {...rest}>
                {children}
            </Text>
        </Link>
    );
};

const MenuLinks = ({ isOpen }) => {
    return (
        <Box
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}>
            <Stack
                spacing={8}
                align="center"
                justify={['center', 'space-between', 'flex-end', 'flex-end']}
                direction={['column', 'row', 'row', 'row']}
                pt={[4, 4, 0, 0]}>
                <MenuItem to="/" isLast={false}>
                    Home
                </MenuItem>
                <MenuItem to="/how" isLast={false}>
                    Lung Classifier
                </MenuItem>
                <MenuItem to="/faetures" isLast={false}>
                    Visualization
                </MenuItem>
                <MenuItem to="/pricing" isLast={false}>
                    Sentiment Analysis
                </MenuItem>
            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex
            as="nav"
            align="center"
            position="fixed"
            justify="space-between"
            zIndex={100000000}
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bgGradient="linear(315deg, #63a4ff 0%, #83eaf1 74%);"
            color={['white', 'white', 'primary.700', 'primary.700']}
            {...props}>
            {children}
        </Flex>
    );
};

export default NavBar;
