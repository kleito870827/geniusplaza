import React, {Component} from 'react';
// import { Container, Draggable } from 'react-smooth-dnd';

// Components
import Card from './Card';


class List extends Component {
  state = {
    editCard: '',
    addCardClass: 'close'
  }

  onClickRemoveList = e => {
    this.props.removeList(e.currentTarget.dataset.lisid);
  }

  onChangeAddCard = e => {
    this.setState({editCard: e.target.value});
  }

  onClickAddCard = e => {
    this.props.addCard(this.state.editCard, e.currentTarget.dataset.lisid);
    this.onBlurAddCard();
  }

  onFocusAddCard = () => {
    this.setState({addCardClass: 'open'});
  }

  onBlurAddCard = () => {
    this.setState({editCard: '', addCardClass: 'close'});
  }

  render(){
    // console.log(this.props.listElement.title);
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
        {this.props.listElement.cardArray.map((card) => (
          <Card key={card.cardId}
                cardElement={card}
                listId={this.props.listElement.id}
          />))}
          <div className={`list__add-card list__add-card--${this.state.addCardClass}`}>
            <span className="list__add-card__span" onClick={ this.onFocusAddCard }>+ Add a card</span>
            <div className="list__add-card__option">
              <input
                type="text"
                value={this.state.editCard}
                onChange={this.onChangeAddCard}
                onKeyUp={this.onKeyUpAddCard}
              />
              <button className="list__add-card__option__btn-add-card" data-lisid={this.props.listElement.id} onClick={this.onClickAddCard}>Add a card</button>
              <button className="list__add-card__option__btn-close-card" onClick={this.onBlurAddCard}><i className="fa fa-times-circle-o" aria-hidden="true"></i></button>
            </div>
          </div>
      </div>
    )
  }
};

export default List;
