'use strict';

var object = require('react').PropTypes.object;

var TransitionHook = {

  contextTypes: {
    router: object.isRequired
  },

  componentDidMount: function componentDidMount() {
    var router = this.context.router;
    router.addTransitionHook(this.routerWillLeave);
  },

  componentWillUnmount: function componentWillUnmount() {
    var router = this.context.router;
    router.removeTransitionHook(this.routerWillLeave);
  }

};

module.exports = TransitionHook;