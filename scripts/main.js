function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues'));
  let issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i <issues.length; i++) {
    let id = issues[i].id;
    let description = issues[i].description;
    let severity = issues[i].severity;
    let status = issues[i].status;

    issuesList.innerHTML += '<div class="well">' +
                            '<h6>Issue ID: ' + id + '</h6>' +
                            '<p><span class="label label-info">' + status + '</span></p>' +
                            '<h3>' + description + '</h3>' +
                            '<p><span class"glyphicon glyphicon-time></span>' + severity + '</p>' +
                            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
                            '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                            '</div>'
  }
}