import React, {Component} from 'react';

class AddBtn extends Component {
  state = {
    editInput: '',
    addBtnClass: 'close'
  }

  onChangeAddInput = (e) => {
    this.setState({editInput: e.target.value});
  }
  onClickAddBtn = () => {
    this.props.action(this.state.editInput);
    this.onClickCloseBtn();
  }
  onFocusInput = () => {
    this.setState({addBtnClass: 'open'});
  }

  onClickCloseBtn = () => {
    this.setState({editInput: '', addBtnClass: 'close'});
  }

  onKeyUpInput = (e) => {
    e.keyCode === 13 && this.onClickAddBtn();
  }

  render(){
    return(
      <div
        className={`dashboard__addList dashboard__addList--${this.state.addBtnClass}`}
        // onBlur={ this.onClickCloseBtn }
        >
        <span className="dashboard__addList__span" onClick={ this.onFocusInput }>+ Add another List</span>
        <div className="dashboard__addList__add-list-options">
          <input
            type="text"
            value={this.state.editInput}
            onChange={this.onChangeAddInput}
            onKeyUp={this.onKeyUpInput}
          />
          <button className="dashboard__addList__add-list-options__btn-add-list" onClick={this.onClickAddBtn}>Add List</button>
          <button className="dashboard__addList__add-list-options__btn-close-list" onClick={this.onClickCloseBtn}><i className="fa fa-times-circle-o" aria-hidden="true"></i></button>
        </div>
      </div>
    )
  }
};

export default AddBtn;
