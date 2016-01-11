/**
 * Alexa Against Humanity
 * https://github.com/radiantnode/alexa-against-humanity
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./lib/AlexaSkill');
var Cards = require('./lib/cards');

var AlexaAgainstHumanitySkill = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AlexaAgainstHumanitySkill.prototype = Object.create(AlexaSkill.prototype);
AlexaAgainstHumanitySkill.prototype.constructor = AlexaAgainstHumanitySkill;

/**
 * Overriden to show that a subclass can override this function to initialize session state.
 */
AlexaAgainstHumanitySkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log('onSessionStarted requestId: ' + sessionStartedRequest.requestId
      + ', sessionId: ' + session.sessionId);

  // Any session init logic would go here.
};

/**
 * If the user launches without specifying an intent, route to the correct function.
 */
AlexaAgainstHumanitySkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log('AlexaAgainstHumanitySkill onLaunch requestId: ' + launchRequest.requestId + ', sessionId: ' + session.sessionId);

  response.tell('Welcome to Alexa Against Humanity!');
};

/**
 * Overriden to show that a subclass can override this function to teardown session state.
 */
AlexaAgainstHumanitySkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log('onSessionEnded requestId: ' + sessionEndedRequest.requestId
      + ', sessionId: ' + session.sessionId);

  //Any session cleanup logic would go here.
};

AlexaAgainstHumanitySkill.prototype.intentHandlers = {
  /**
   * Responds to the user saying 'pick a black card'.
   */
  PickABlackCardIntent: function (intent, session, response) {
    var picked = pickRandom(Cards.BLACK);
    response.tell(picked);
  },

  /**
   * Responds to the user saying 'pick a white card'.
   */
  PickAWhiteCardIntent: function (intent, session, response) {
    var picked = pickRandom(Cards.WHITE);
    response.tell(picked);
  },

  'AMAZON.HelpIntent': function (intent, session, response) {
    var speechText = 'You can say things like <break time="0.1s" /> "pick a black card"';
    var repromptText = 'Try saying something like <break time="0.1s" /> "pick a black card"';

    response.ask(speechText, repromptText);
  },

  'AMAZON.StopIntent': function (intent, session, response) {
    response.tell('Alright alright... Bye!');
  }
};

function pickRandom (list) {
  return list[Math.floor(Math.random()*list.length)]
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  var skill = new AlexaAgainstHumanitySkill();
  skill.execute(event, context);
};