import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  // code to run on server at startup 
  var prjs = [
    {name:"Georgia's App",test:1},
    {name:"EasyApp Technology",test:0},
    {name:"BSB Cryptocurrency",test:0}
  ];
  
  var tmpIdeas = [
    {projectId:"", name: "Idea 1",why:"this is why 1",how:"this is how 1"},
    {projectId: "",name: "Idea 2",why:"this is why 2",how:"this is how 2"},
    {projectId: "",name: "Idea 3",why:"this is why 3",how:"this is how 3"}
  ]

  if(projects.find().count() <= 0) {
    prjs.forEach(function(project) {
      var thisId = projects.insert(project);
      console.log(project);
      if (project.test === 1) {
        // insert some ideas for this project
        // just to fill out the display until we get adding projects sorted
        tmpIdeas.forEach(function(idea) {
          idea.projectId = thisId;    // id of newly added project
          ideas.insert(idea);
          console.log(idea);
        });
      }
    });
  }
});

Meteor.publish("projects",function() {
  return projects.find({});
});

Meteor.publish("ideas",function() {
  return ideas.find({});
});

Meteor.methods({

  getProjects: function() {
    return projects.find({},{sort:{name:1}}).fetch();
  },
  getIdeas: function(projectId) {
    return ideas.find({projectId:projectId},{sort:{sequence:1}}).fetch();
  },
  
});