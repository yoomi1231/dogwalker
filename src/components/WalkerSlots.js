import React, { Component } from 'react';
import styled from 'styled-components';
import { Slot } from './Slot';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Title = styled.span`
    font-size: 50px;
    padding: 0 30px 20px;
    word-break: break-word;
    text-align: center;
`;

const ButtonGroup = styled.div`
    width: 600px;
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const RunButton = styled.button`
    height: 50px;
    width: 70px;
    margin: 10px;
    font-size: 15px;
    text-transform: uppercase;
    border-radius: 12px;
    border: 4px solid #20bf6b;
    transition: all 0.4s ease 0s;

    &:hover {
        color: white;
        background-color: #20bf6b;
        border-color: #ffffff;
        border-radius: 0;
        transition: all 0.4s ease 0s;
    }
`;

const ClearButton = styled.button`
    height: 50px;
    width: 70px;
    margin: 10px;
    font-size: 15px;
    border-radius: 12px;
    border: 4px solid red;
    &:hover {
        color: #ffffff;
        background-color: red;
        border-color: #ffffff;
        border-radius: 0;
        transition: all 0.4s ease 0s;
    }
`;

const ResetButton = styled.button`
    height: 50px;
    width: 70px;
    margin: 10px;
    font-size: 15px;
    border-radius: 12px;
    border: 4px solid blue;
    &:hover {
        color: #ffffff;
        background-color: blue;
        border-color: #ffffff;
        border-radius: 0;
        transition: all 0.4s ease 0s;
    }
`;

const Card = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export class WalkerSlots extends Component {
    state = {
        walkers: [], // selected walkers
        walkerOptions: [],
        petName: null,
        numOfWalks: null // number
    };

    componentDidMount() {
        // retrieve data
        const walkerSlotsDataJson = localStorage.getItem('walkerSlotsData');
        const walkerSlotsData = JSON.parse(walkerSlotsDataJson); // json format
        //const walkerSlotsData = JSON.parse(localStorage.getItem('walkerSlotsData');


        // retrieve previously set walkers
        const walkersPickedJson = localStorage.getItem('walkersPicked');
        const walkersPicked = JSON.parse(walkersPickedJson);
        //const walkersPicked = JSON.parse(localStorage.getItem('walkersPicked');

        if (!walkersPicked) {
            this.setState({
                ...walkerSlotsData,
                walkers: []
            });
        } else {
            this.setState({ 
                ...walkerSlotsData, 
                walkers: walkerSlotsData.numOfWalks === walkersPicked.length ? walkersPicked : []
            });
        }
    }

    getWalkers = () => {
        const { walkerOptions, numOfWalks } = this.state;
        let pickedWalkers = [];
        
        for (let i = 0; i < numOfWalks; i++) {
            pickedWalkers.push(
                walkerOptions[Math.floor(Math.random() * walkerOptions.length)]
            );
        };

        return pickedWalkers; // as many as number of walks
    };

    onRunButtonClicked = () => {
        const newWalkers = this.getWalkers();
        const json = JSON.stringify(newWalkers);
        localStorage.setItem('walkersPicked', json);
        this.setState ({ walkers: [] });
        setTimeout(() => {
            this.setState ({ walkers: newWalkers });
        }, 500)
    };

    renderSlots() {
        const { numOfWalks, walkers } = this.state;
        let slots = [];

        for (let i = 0; i < numOfWalks; i++) {
            slots.push(<Slot key={i} numOfWalk={i + 1} walker={walkers ? walkers[i]: ""} />);
        }

        return slots; // as many slots as there are number of walks
    }

    render() {
        return (
            <Container>
                <Title>Who should walk {this.state.petName}?</Title> 
                <Card>
                    {this.renderSlots()}
                </Card>
                <ButtonGroup>
                    <RunButton onClick={this.onRunButtonClicked}>Run </RunButton>
                    <ClearButton onClick={() => this.setState({ walkers: [] })}>Clear</ClearButton>
                    <ResetButton onClick={this.props.reset}>Reset</ResetButton>
                </ButtonGroup>
            </Container>
        );
    }
};
