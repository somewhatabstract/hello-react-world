import React from 'react';
import {BrowserRouter, StaticRouter} from "react-router-dom";
import Router from './Router';

test('renders BrowserRouter when no ssrLocation', () => {
    // Arrange

    // Act
    const result = Router({});

    expect(result).toEqual(<BrowserRouter />);
});

test('renders StaticRouter when ssrLocation is provided', () => {
    // Arrange

    // Act
    const result = Router({ssrLocation:"/"});

    expect(result).toEqual(<StaticRouter location="/" />);
});
