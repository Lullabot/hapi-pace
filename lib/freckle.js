'use strict';

var freckle = require('freckle');
freckle("lullabot", "26xmm61scongzz006a9s98niwo2e0wf");

var projects = [];

module.exports.getProjects = function() {
  return projects;
};

if (projects.length == 0) {
  freckle.projects.list(function (err, allProjects) {
    if (err) {
      console.error('Request failed with %d response.', err.statusCode);
    }
    else {
      allProjects.forEach(function(row) {
        var matches = row.project.name.match(/\(([0-9]{5})\)/);
        if (row.project.billable && row.project.enabled && matches) {
          row.project.salesForceId = matches[1];
          projects.push(row.project);
        }
      });
    }
  });
}

module.exports.api = freckle;
