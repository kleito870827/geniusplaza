import React, {Component} from 'react';
import { connect } from 'react-redux';

// Actions
import * as listActions from '../redux/actions/list';

class Card extends Component {

onClickEditCard = (e) => {
  this.props.currentCard(e.currentTarget.dataset.cardid, e.currentTarget.dataset.lisid);
  this.props.openModal();
}


  render(){
    return(
        <div className="card">
          <p className="card__title">{this.props.cardElement.title}</p>
          <button
            className="card__edit"
            data-lisid={this.props.listId}
            data-cardid={this.props.cardElement.cardId}
            onClick={this.onClickEditCard}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
          {/* <p>{card.description}</p> */}
        </div>
    )
  }
};


export default connect(null, listActions)(Card);
// export default Card;
