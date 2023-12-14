'use client'
import React from 'react';

import Header from '@/app/components/header';
import Content from '@/app/components/content';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

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
