import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Layout,BackTop} from 'antd';

import Header from '../header/index';
import Content from '../content/index';
import Footer from '../footer/index';

const DefaultLayout = ({component:Component,...rest}) => {
    return(
        <Route {...rest} render={matchProps => (
            <Layout>
                <Header {...rest}/>
                <Content>
                    <Component {...matchProps}/>
                </Content>
                <BackTop/>
                <Footer/>
            </Layout>
        )}>
        </Route>
    );
};

export default DefaultLayout;