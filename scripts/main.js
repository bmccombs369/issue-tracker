document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  let issueDescription = document.getElementById('issueDescriptionInput').value;
  let issueSeverity = document.getElementById('issueSeveritySelect').value;
  let issueId = chance.guid();
  let issueStatus = 'Open';

  let issue = {
    id: issueId,
    description: issueDescription,
    severity: issueSeverity,
    status: issueStatus
  }

  if (localStorage.getItem('issues') == null) {
    let issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues))
  } else {
    let issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1); 
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues'));
  let issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (let i = 0; i <issues.length; i++) {
    let id = issues[i].id;
    let description = issues[i].description;
    let severity = issues[i].severity;
    let status = issues[i].status;

    issuesList.innerHTML += '<div class="card">' +
                            '<div class="card-body">' +
                            '<h6>Issue ID: ' + id + '</h6>' +
                            '<p><span class="label label-info">' + status + '</span></p>' +
                            '<h3>' + description + '</h3>' +
                            '<p><span class"glyphicon glyphicon-time></span>' + severity + '</p>' +
                            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
                            '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                            '</div>' +
                            '</div>'
  }
}