import React from 'react'
import './Modal.css'

export default class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    };
  }


  state = {
    isOpen: false
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({ isOpen: true })}>
         Logout
        </button>

        {this.state.isOpen && (
          <div className='modal'>
            <div className='modal-body'>
              <h1>Do you really wanna logout???</h1>
              <button onClick={() => {
                this.setState({ isOpen: false })
                this.props.setIsTodoListPage(false)
              }}>
                Yes, 100%!!!
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}