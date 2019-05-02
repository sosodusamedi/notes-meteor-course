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

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id)
}

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined)
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === "unauth"
  const isAuthenticatedPage = currentPagePrivacy === "auth"

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/')
    console.log('not able')
  }
}

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState)
}

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1]
  Session.set('currentPagePrivacy', lastRoute.privacy)
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route onEnter={globalOnEnter} onChange={globalOnChange}>
        <Route exact path="/" component={Login} privacy="unauth" />
        <Route path="/signup" component={Signup} privacy="unauth" />
        <Route path="/dashboard" component={Dashboard} privacy="auth" />
        <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage} />
        <Route path="*" component={NotFound} />
      </Route>
    </Switch>
  </Router>
)
