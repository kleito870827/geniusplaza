import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

// Actions
import * as listActions from '../redux/actions/list';

// Component
import List from './List';

Modal.setAppElement('#root');

class Dashboard extends Component{
  state = {
    editList: '',
    addListClass: 'close',
    // startDate: moment()
  }
  onChangeAddList = e => {
    this.setState({editList: e.target.value});
  }
  onClickAddList = () => {
    this.props.addList(this.state.editList);
    this.onBlurAddList();
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
    this.props.editCard(e.currentTarget.dataset.cardid, e.currentTarget.dataset.lisid, this.props.curtCard);
    this.props.closeModal();
  }

  handleChange = date => {
    this.props.editCurrentCardDueDate(date);
    // this.setState({startDate: date});
  }

  render(){
    // console.log(this.props.list);
    // console.log(this.props.curtCard.description);
    return(
      <div className="dashboard">
        {this.props.lists.map((list) => (<List key={list.id} listElement={list} removeList={this.props.removeList} removeCard={this.props.removeCard} addCard={this.props.addCard} />))}
        <div
          className={`dashboard__addList dashboard__addList--${this.state.addListClass}`}
          // onBlur={ this.onBlurAddList }
          >
          <span className="dashboard__addList__span" onClick={ this.onFocusAddList }>+ Add another List</span>
          <div className="dashboard__addList__add-list-options">
            <input
              type="text"
              // defaultValue="+ Add another List"
              value={this.state.editList}
              onChange={this.onChangeAddList}
              onKeyUp={this.onKeyUpAddList}
            />
            <button className="dashboard__addList__add-list-options__btn-add-list" onClick={this.onClickAddList}>Add List</button>
            <button className="dashboard__addList__add-list-options__btn-close-list" onClick={this.onBlurAddList}><i className="fa fa-times-circle-o" aria-hidden="true"></i></button>
          </div>
        </div>

        {/* <button onClick={this.props.openModal}>Open Modal</button> */}
        <Modal
          isOpen={this.props.cardOpenModal}
          onRequestClose={this.props.closeModal}
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
