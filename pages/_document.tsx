import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends NextDocument {
    static async getInitialProps(ctx) {
        const initialProps = await NextDocument.getInitialProps(ctx);
        return { ...initialProps };
    }
    render() {
        return (
            <Html lang="en" prefix="og: https://ogp.me/ns#">
                <body>
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
