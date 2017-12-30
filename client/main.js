import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onRendered(function() {

  getProjects();
  getIdeas();


  $("#projects").select2();

  $('#why').summernote({
    height: 150,                 // set editor height
  minHeight: null,             // set minimum height of editor
  maxHeight: null,             // set maximum height of editor
  placeholder: 'Why is this idea important?'
  });
  $('#how').summernote({
    height: 150,                 // set editor height
  minHeight: null,             // set minimum height of editor
  maxHeight: null,             // set maximum height of editor
  placeholder: 'How will you implement this idea?'
  });



});

Template.main.helpers({

  projects: function() {
    return Session.get("projects");
  },
  ideas: function() {

    return Session.get("ideas");

  }

});

Template.main.events({
  'change #projects' : function() {
    var id = $('#projects').val();
    if (id === "add") {
      // popup a modal to add a new project
      console.log("add new project");
    } else {
      // populate the list of ideas for this project
      getIdeas(id);   // id of the idea
      console.log(id);
    }
  }
})


function getIdeas(id) {
  Meteor.call("getIdeas",id,function(error,results) {
    console.log(results);
    Session.set("ideas",results);
  });
}

function getProjects() {
  Meteor.call("getProjects",function(error,results) {
    Session.set("projects",results);
    console.log(results);
  })
}
