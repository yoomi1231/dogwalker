import React, { Component } from 'react';
import styled from 'styled-components';

const ModalContent = styled.div`
    display: flex;
    justify-content: center;
`;
ModalContent.displayName = "ModalContent";


export class Modal extends Component {
    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div>
                <ModalContent>{this.props.children}</ModalContent>
            </div>
        );
    }
}