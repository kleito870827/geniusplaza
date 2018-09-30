import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Container, Draggable } from 'react-smooth-dnd';

import 'react-datepicker/dist/react-datepicker.css';

// Actions
import * as listActions from '../redux/actions/list';

// Component
import List from './List';

Modal.setAppElement('#root');

class Dashboard extends Component{
  state = {
    editList: '',
    addListClass: 'close'
  }
  onChangeAddList = e => {
    this.setState({editList: e.target.value});
  }
  onClickAddList = () => {
    if(this.state.editList){
      this.props.addList(this.state.editList);
      this.onBlurAddList();
    }else{
      alert("The list can not be empty");
    }
  }

  onFocusAddList = () => {
    this.setState({addListClass: 'open'});
  }

  onBlurAddList = () => {
    this.setState({editList: '', addListClass: 'close'});
  }

  onKeyUpAddList = e => {
    e.keyCode === 13 && this.onClickAddList();
  }

  onChangeEditCardTitle = e => {
    this.props.editCurrentCardTitle(e.target.value);
  }

  onChangeEditCardDescription = e => {
    this.props.editCurrentCardDescription(e.target.value);
  }

  onClickremoveCard = e => {
    this.props.removeCard(e.currentTarget.dataset.cardid, e.currentTarget.dataset.lisid);
    this.props.closeModal();
  }

  onClickSaveCard = e => {
    if(this.props.curtCard.title){
      this.props.editCard(e.currentTarget.dataset.cardid, e.currentTarget.dataset.lisid, this.props.curtCard);
      this.props.closeModal();
    }else{
      alert("The title of card can not be empty");
    }
  }

  handleChange = date => {
    this.props.editCurrentCardDueDate(date);
    // this.setState({startDate: date});
  }

  onListDrop = (dropResult) => {
    this.props.dropList(dropResult);
  }

  render(){
    return(
      <div className="dashboard">
        <Container
          orientation="horizontal"
          onDrop={this.onListDrop}
          >
          {this.props.lists.map(list => {
            return (
              <Draggable key={list.id}>
                <List key={list.id}
                  listElement={list}
                 />
              </Draggable>
            );
          })}
          <div
            className={`dashboard__addList dashboard__addList--${this.state.addListClass}`}
            // onBlur={ this.onBlurAddList }
            >
              <span className="dashboard__addList__span" onClick={ this.onFocusAddList }>+ Add another List</span>
              <div className="dashboard__addList__add-list-options">
                <input
                  type="text"
                  value={this.state.editList}
                  onChange={this.onChangeAddList}
                  onKeyUp={this.onKeyUpAddList}
                />
                <button className="dashboard__addList__add-list-options__btn-add-list" onClick={this.onClickAddList}>Add List</button>
                <button className="dashboard__addList__add-list-options__btn-close-list" onClick={this.onBlurAddList}><i className="fa fa-times-circle-o" aria-hidden="true"></i></button>
              </div>
            </div>
        </Container>
        <Modal
          isOpen={this.props.cardOpenModal}
          onRequestClose={this.props.closeModal}
          className="modal"
          overlayClassName="overlay"
          contentLabel="Edit Card Modal"
        >
          <label htmlFor="modal-title">Title</label>
          <input
            id="modal-title"
            className="modal__title"
            type="text"
            onChange={this.onChangeEditCardTitle}
            value={this.props.curtCard.title} />
          <label htmlFor="modal-description">Description</label>
          <input id="modal-description"
            className="modal__description"
            type="text"
            onChange={this.onChangeEditCardDescription}
            value={this.props.curtCard.description} />
          <label htmlFor="modal-due-date">Due Date</label>
          <DatePicker
              id="modal-due-date"
              minDate={moment()}
              selected={this.props.curtCard.dueDate ? this.props.curtCard.dueDate : moment()}
              onChange={this.handleChange}
          />

          <div className="modal__btn">
            <button
              className="modal__btn__bottom modal__btn__bottom--save"
              data-lisid={this.props.curtCard.listId}
              data-cardid={this.props.curtCard.cardId}
              onClick={this.onClickSaveCard}>Save</button>
            <button
              className="modal__btn__bottom modal__btn__bottom--remove-card"
              data-lisid={this.props.curtCard.listId}
              data-cardid={this.props.curtCard.cardId}
              onClick={this.onClickremoveCard}>Remove</button>
          </div>

          <button
            className="modal__btn-close-modal"
            onClick={this.props.closeModal}>
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          </button>
        </Modal>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    lists: state.lists.listArray,
    cardOpenModal: state.lists.cardOpenModal,
    curtCard: state.lists.currentCard
  }
}

// const mapDispatchToProps = {
//   ...listActions,
//   ...cardActions,
// };

export default connect(mapStateToProps, listActions)(Dashboard);
