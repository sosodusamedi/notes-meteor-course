import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Session } from 'meteor/session'

import App from '../App'
import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

const history = createBrowserHistory()
const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/dashboard']

const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    history.replace('/dashboard')
  }
}

const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    history.replace('/')
  }
}

const onEnterNotePage = (nextState) => {
  if(!Meteor.userId()) {
    history.replace('/')
  } else {
    Session.set('selectedNoteId', nextState.params.id)
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = location.pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/')
    console.log('not able')
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
      <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage} />
      <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)
