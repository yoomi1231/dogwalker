import React, { Component } from 'react';
import './App.css';
import isEmpty from 'lodash/isEmpty';
import { WalkerSlots } from './components/WalkerSlots';
import { InputForm } from './components/InputForm';
import { Modal } from './components/Modal';
import styled from 'styled-components';

const Fragment = styled.div`
  padding: 50px;
  background-color: #bfdce7;
  min-height: 100vh;
`;

const ModalButton = styled.button`
  height: 50px;
  width: 200px;
  margin: auto;
  display: block;
`;

const Resultcontainer = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: center;
  min-height: 100vh;
`;

export class App extends Component {
  state = {
    showForm: false,
    formComplete: false,
    isInitial: true
  };

  showModal = () => {
    this.setState({ showForm: true, formComplete: false });
  };

  closeModal = () => {
    // check whether there is data
    const walkerSlotsDataJson = localStorage.getItem('walkerSlotsData');
    const walkerSlotsData = JSON.parse(walkerSlotsDataJson); // json format

    if (!isEmpty(walkerSlotsData)) {
      this.setState({ showForm: false, formComplete: true, isInitial: false });
    } else {
      this.setState({ showForm: false, formComplete: false, isInitial: true });
    }
  };

  showWalkerSlots = () => {
    this.setState({ showForm: false, formComplete: true, isInitial: false });
  };

  render() {
    return (
      <Fragment>
        {
          this.state.isInitial &&
          <ModalButton onClick={this.showModal}>Click Here to Begin</ModalButton>
        }
        <Modal show={this.state.showForm}>
          <InputForm submitForm={this.showWalkerSlots} close={this.closeModal} />
        </Modal>
        <Resultcontainer>   
          {this.state.formComplete && <WalkerSlots reset={this.showModal}/>} 
        </Resultcontainer>
      </Fragment>
    );
  }
}

export default App;
