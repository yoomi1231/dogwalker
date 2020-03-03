import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    border: solid;
    height: 115px;
    width: 150px;
    border-radius: 12px;
    margin: 2px;
    padding: 0 15px;
    background-color: #ff6978;
`;

const Label = styled.h3`
    color: #12355b;
    text-align: center;
`;

const Option = styled.p`
    text-align: center;
    color: #272d2d;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Slot = ({ numOfWalk, walker }) => {
    return (
        <Card>
            <Label>{numOfWalk}</Label>
            <Option>{walker}</Option>
        </Card>
    );
};
