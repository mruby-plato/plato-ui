//
//  plato2-joblist.js
//

// constants
MSGS = [
  'list_top',
  'prev',
  'next',
]

function handleDelIconClick(e) {
}

function handleSetIconClick(e) {
}

// edit job icon click handler
function editJob(jobid) {
  let idx;
  if (typeof jobid === 'undefined')
    idx = jobList.length;             /* add new job */
  else
    idx = jobid.slice('job'.length);  /* edit job */

  // move to edit job page
  location.replace(editPage + '?index=' + idx);
}

// delete job icon click handler
function deleteJob(jobid) {
  let idx = jobid.slice('job'.length);
  if (window.confirm(getMessage('del_job_confirm', jobList[idx].name))) {
    // delete job
    project.jobList.splice(idx, 1);
    // update project
    setProject(project);
    // reload
    window.location.reload();
  }
}

// Switch on/off job click handler
function onoffJob(swiid) {
  let idx = swiid.slice('jobswi'.length);
  project.jobList[idx].onoff = (project.jobList[idx].onoff !== 'off') ? 'off' : 'on';
  document.getElementsByName(swiid)[0].src = 'img/' + project.jobList[idx].onoff + '.png';
  setProject(project);
}

// onload event handler
window.addEventListener("load", function() {
  /* Get joblist from sessionStorage */
  project = getProject();
  jobList = project.jobList;

  /* initialize words */
  document.title = MSG.list_title;
  MSGS.forEach(function(id, _idx, _ary) {
    document.getElementById(id).innerText = MSG[id];
  })
  
  // Initialize job list
  let outer = document.getElementsByClassName('outer')[0];
  let html = "";
  jobList.forEach(function(job, i) {
    html += '<fieldset class="iot_job" id="itemfield" align="left" href="#" name="job' + i + '" ondblclick="editJob(name)">';
    html += ('<legend>' + job.name + '</legend>');

    html += '<div class="switch">';
    html += '<img src="img/' + job.onoff + '.png" width="63" height="35" name="jobswi' + i + '" onclick="onoffJob(name)">';
    html += '</div>';

    html += '<table class="icon_table" align="center" height="36"><tbody><tr>';

    html += '<td valign="top" align="left" width="36">';
    html += '<div class="icon">';
    html += '<img src="img/minus.png" width="32" height="32" name="job' + i + '" onclick="deleteJob(name)">';
    html += '</div>';
    html += '</td>';

    html += '<td valign="top" align="right" width="36">';
    html += '<div class="icon">';
    html += '<img src="img/edit.png" width="32" height="32" name="job' + i + '" onclick="editJob(name)">';
    html += '</div>';
    html += '</td>';

    html += '</tr></tbody></table>';

    html += '<table class="job_table" align="center" height="150"><tbody><tr>';

    html += ('<td name="sensors">' + htmlJobItems(job, 'sensor', flgHint) + '</td>');
    html += ('<td name="timings">' + htmlJobItems(job, 'timing', flgHint) + '</td>');
    html += ('<td name="actions">' + htmlJobItems(job, 'action', flgHint) + '</td>');

    html += '</tbody></tr></table>';
    html += '</fieldset>';
  });
  outer.innerHTML = html + outer.innerHTML;

  // connect job items
  connectItems();
}, false);
