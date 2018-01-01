import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onCreated(function() {

});

Template.main.onRendered(function() {

  var options = {
    liveSearch: true,
    style: "btn-info"
  };

  if (Meteor.isCordova) {
    options.mobile = true;
  }

  $("#projects").selectpicker(options);
  $('#projects').selectpicker('refresh');

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

Template.main.events({

  'change #projects' : function() {
    var projectId = $('#projects').val();
    if (projectId === "add") {
      // popup a modal to add a new project
      alert("add new project");
    } else {
      // populate the list of ideas for this project
      console.log("projectId: ", projectId);
      // see: https://stackoverflow.com/a/47475080/4222207
      var ideaName = $('#projects option:selected').text();
      console.log("ideaName = " , ideaName);
      Session.set("projectName",ideaName);

      Session.set("ideas", ideas.find({projectId:projectId}).fetch());   // id of the idea - put it into a Session var and the list will appear
    }
  },
  'click #addIdea' : function() {
    $('#myModal').modal('toggle');
  }
});

Template.main.helpers({
  ideas: function() {
    var x = Session.get("ideas");
    return x || false;
  }
})


