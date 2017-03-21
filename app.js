'use strict';

let Wit = null;
let interactive = null;

try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  //if not set some defaults
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

const accessToken = (() => {
  if (process.argv.length!== 3){
    console.log("need:<wit-access-token>");
    process.exit(1);
  }
  return process.argv[2];
})();

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
    send(request, response){
      const {sessionId, context, entities} = request;
      const {text, quickreplies} = response;
      console.log("User said...", request.text);
      console.log("sending...", JSON.stringify(response));
    },

    newEvent({context, entities}){
      var time = firstEntityValue(entities, 'datetime');
      var location = firstEntityValue(entities, 'local_search_query');

      console.log(time);
      console.log(location);

      var ableToSchedule = true;
      if (ableToSchedule){
        //send the event was created
      }else{
        //send scheduling conflict
      }


      delete context.schedulingConflict;
      context.eventCreated = "Event Created!"
      return context;

    },
};

const client = new Wit({accessToken, actions});
interactive(client);
