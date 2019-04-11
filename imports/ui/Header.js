import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'


export const Header = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button onClick={() => props.handleLogout()} className="button button--link-text">
          Logout
        </button>
      </div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    handleLogout: () => Accounts.logout()
  }
})(Header)
