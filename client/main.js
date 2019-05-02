import { Meteor } from 'meteor/meteor'
import ReactDOM from 'react-dom'
import { Tacker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { routes, onAuthChange } from '../imports/routes/routes'
import '../imports/startup/simple-schema-config.js'
import createBrowserHistory from 'history/createBrowserHistory'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Tracker.autorun(() => {
  const history = createBrowserHistory()
  const selectedNoteId = Session.get('selectedNoteId')

  if (selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`)
  }
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  ReactDOM.render(routes, document.getElementById('app'))
})
