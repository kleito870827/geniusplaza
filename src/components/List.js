import React, {Component} from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { connect } from 'react-redux';

// Actions
import * as listActions from '../redux/actions/list';

// Components
import Card from './Card';


class List extends Component {
  state = {
    editCard: '',
    addCardClass: 'close',
    onDrag: false
  }

  onClickRemoveList = e => {
    this.props.removeList(e.currentTarget.dataset.lisid);
  }

  onChangeAddCard = e => {
    this.setState({editCard: e.target.value});
  }

  onClickAddCard = e => {
    if(this.state.editCard){
      this.props.addCard(this.state.editCard, e.currentTarget.dataset.lisid);
      this.onBlurAddCard();
    }else{
      alert("The card can not be empty");
    }
  }

  onFocusAddCard = () => {
    this.setState({addCardClass: 'open'});
  }

  onBlurAddCard = () => {
    this.setState({editCard: '', addCardClass: 'close'});
  }

  onKeyUpAddCard = e => {
    e.keyCode === 13 && this.onClickAddCard(e);
  }

  getCardPayload = (listId, index) => {
    this.props.getCardDrag(listId, index);
}

  onCardDrop = (listId, dropResult)  => {
    if(!this.state.onDrag){
      this.props.dropCard(listId, dropResult);
    }
  }

  render(){
    return(
      <div className="list">
        <div className="list__list-title">
          {/* <input
            className="list__list-title__input"
            type="text"
            value={this.props.listElement.title}
           /> */}
           <span className="list__list-title__input">{this.props.listElement.title}</span>
            <button className="list__list-title__remove-btn" data-lisid={this.props.listElement.id} onClick={this.onClickRemoveList}><i className="fa fa-times-circle-o" aria-hidden="true"></i></button>
        </div>
        <Container
          groupName="card"
          onDragStart={() => this.setState({onDrag: true})}
          onDragEnd={() => this.setState({onDrag: false})}
          getChildPayload={index =>
            this.getCardPayload(this.props.listElement.id, index)
          }
          onDrop={e => this.onCardDrop(this.props.listElement.id, e)}
          >
          {this.props.listElement.cardArray.map(card => {
            return (
              <Draggable key={card.cardId}>
                <Card key={card.cardId}
                      cardElement={card}
                      listId={this.props.listElement.id}
                />
              </Draggable>
            );
          })}
        </Container>
          <div className={`list__add-card list__add-card--${this.state.addCardClass}`}>
            <span className="list__add-card__span" onClick={ this.onFocusAddCard }>+ Add a card</span>
            <div className="list__add-card__option">
              <input
                type="text"
                value={this.state.editCard}
                onChange={this.onChangeAddCard}
                data-lisid={this.props.listElement.id}
                onKeyUp={this.onKeyUpAddCard}
              />
              <button
                className="list__add-card__option__btn-add-card"
                data-lisid={this.props.listElement.id}
                onClick={this.onClickAddCard}
                >Add a card</button>
              <button
                className="list__add-card__option__btn-close-card"
                onClick={this.onBlurAddCard}>
                <i className="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
      </div>
    )
  }
};

export default connect(null, listActions)(List);
