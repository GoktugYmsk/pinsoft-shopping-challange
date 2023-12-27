'use client'
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/store/store';
import Header from '@/app/components/header';
import Content from '@/app/components/content';

function CustomComponent(): JSX.Element {
    return (
        <>
            <Provider store={store} >
                <Header />
                <Content />
            </Provider>
        </>
    );
}

export default CustomComponent;
