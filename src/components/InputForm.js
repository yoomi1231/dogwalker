import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

`;

const CustomizingLabel = styled.label`
    padding: 30px;
    font-size: 20px;

    @media (max-width: 550px) {
        display: flex;
        flex-direction: column;
    }
`;

const FormInput = styled.input`
    width: 200px;
`;

const ButtonContainer = styled.div`
    display: block;
    margin: auto;
`;

const SubmitButton = styled.button`
    height: 30px;
    width: 100px;
    margin: 10px;
    font-size: 15px;
    text-transform: uppercase;
    color: white;
    background-color: #20bf6b;
    border-color: #ffffff;
    border-radius: 12px;
    border: 2px solid #20bf6b;

    &:hover {
        border: 2px solid white;
        transition: all 0.4s ease 0s;
    }
`;

const CloseButton = styled.button`
    height: 30px;
    width: 100px;
    margin: 10px;
    font-size: 15px;
    text-transform: uppercase;
    color: white;
    background-color: grey;
    border-color: #ffffff;
    border-radius: 12px;
    border: 2px solid #grey;

    &:hover {
        border: 2px solid white;
        transition: all 0.4s ease 0s;
    }
`;

export class InputForm extends Component {
    state = {
        petName: null,
        walkerOptions: [],
        numOfWalks: null
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    updateWalkerOptions = e => {
        this.setState({
            [e.target.name]: e.target.value.replace(/\s/g, '').split(',')
        });
    }
    
    onFormSubmit = e => {
        e.preventDefault(); // prevents refresh

        const dataStr = JSON.stringify(this.state); // state is now a string representation
        localStorage.setItem('walkerSlotsData', dataStr);
        this.props.submitForm();
    };

    render() {
        return(
            <Container onSubmit={this.onFormSubmit}>
                <CustomizingLabel>
                    <span>Pet Name:</span>
                    <FormInput
                        type="text"
                        name="petName"
                        onChange={this.handleInputChange}
                        required />
                </CustomizingLabel>
                <CustomizingLabel>
                    <span>Walker Names:</span>
                    <FormInput
                        type="text" 
                        name="walkerOptions"
                        placeholder="Ashley, Joe, Irene, ..." 
                        onChange={this.updateWalkerOptions}  
                        required />
                </CustomizingLabel>
                <CustomizingLabel>
                    <span>Number of walks:</span>
                    <FormInput
                        type="number"
                        name="numOfWalks"
                        onChange={this.handleInputChange} 
                        required />
                </CustomizingLabel>
                <ButtonContainer>
                    <SubmitButton>Submit</SubmitButton>
                    <CloseButton onClick={this.props.close}>Close</CloseButton>
                </ButtonContainer>
            </Container>
        );
    }
};
