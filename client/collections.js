projects = new Meteor.Collection("projects", {connection: null});

ideas = new Meteor.Collection("ideas", {connection: null});

// and then we can link these ideas to projects

// see: https://atmospherejs.com/frozeman/persistent-minimongo2

projectsObserver = new PersistentMinimongo2(projects, 'ideasBank');
ideasObserver = new PersistentMinimongo2(ideas, 'ideasBank');

Template.registerHelper("projects", function() {
    return projects.find({});
});

Template.registerHelper("ideas", function() {
    var projectId = Session.get("projectId");
    return ideas.find({projectId:projectId});
});

