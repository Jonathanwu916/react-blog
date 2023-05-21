import { notification } from 'antd';
import React, { Component } from 'react';

export const openNotificationWithIcon = (type,message,description) => {
    notification[type]({
        message: message,
        description: description,
    });
};