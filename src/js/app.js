var t = "";
var s = "";
var steps = new Array();
var notes = new Array();
var template = "";
$( document ).ready(function() {
    $("#newCaseContent").hide();
    $("#existingCaseContent").hide();
    $("#templateContent").hide();
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(data => {
        t = data.test;
    });
    populateTemplatesModal();
});

function formatLandingPage(){
    $("#newCaseContent").hide();
    $("#existingCaseContent").hide();
    $("#templateContent").hide();
    $("#landingPageContent").show();
}

function formatNewCase(){
    $("#landingPageContent").hide();
    $("#existingCaseContent").hide();
    $("#templateContent").hide();
    resetSteps();
    populateNewCaseTableBody();
    $("#newCaseContent").show();
}

function resetSteps(){
    steps = new Array();
}

function populateNewCaseTableBody(){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        data.scenarios[0].NewCase.steps.forEach(element => {
          steps.push(element);
        });
    })
    .then(function(){
        var table = document.getElementById("newCase_Table_Body");
        var counter = 1;
        table.innerHTML = '';

        var tr = "";

        steps.forEach(x=>{
            tr+='<tr>';
            tr+='<td>'+counter+'</td>'+'<td>'+x.step+'</td>'+'<td>'+x.script+'</td>'
            tr+='</tr>'
            counter++;
        })

        table.innerHTML += tr;
    });
}

function formatExistingCase(){
    $("#landingPageContent").hide();
    $("#newCaseContent").hide();
    $("#templateContent").hide();
    resetSteps();
    populateExistingCaseTableBody();
    $("#existingCaseContent").show();
}

function populateExistingCaseTableBody(){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        data.scenarios[1].ExistingCase.steps.forEach(element => {
          steps.push(element);
        });
    })
    .then(function(){
        var table = document.getElementById("existingCase_Table_Body");
        var counter = 1;
        table.innerHTML = '';

        var tr = "";

        steps.forEach(x=>{
            tr+='<tr>';
            tr+='<td>'+counter+'</td>'+'<td>'+x.step+'</td>'+'<td>'+x.script+'</td>'
            tr+='</tr>'
            counter++;
        })

        table.innerHTML += tr;
    });
}

function formatTemplate(){
    $("#landingPageContent").hide();
    $("#newCaseContent").hide();
    $("#existingCaseContent").hide();
    resetTemplates();
    //populateBodyTransferEngineer();
    populateBodyTransferTeamLeader();
    populateBodyTransferTeamManager();
    $("#templateContent").show();
}

function populateBodyTransferEngineer(){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        template = data.templates[0].ToCaseOwner;
    })
    .then(function(){
        $('#bodyTransferEngineer').append(template);
    });
}

function populateBodyTransferTeamLeader(){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        template = data.templates[1].ToTeamLeader;
    })
    .then(function(){
        $('#bodyTransferTeamLeader').append(template);
    });
}

function populateBodyTransferTeamManager(){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        template = data.templates[2].ToTeamManager;
    })
    .then(function(){
        $('#bodyTransferTeamManager').append(template);
    });
}

function resetTemplates(){
    $('#bodyTransferEngineer').empty();
    $('#bodyTransferTeamLeader').empty();
    $('#bodyTransferTeamManager').empty();
}

function changeCUName(){
    $('.customer_name').text($('#inputcuname').val());
}

function changeCustomerCCOID(){
    $('.customer_ccoid').text($('#inputcuccid').val());
}

function changeRepName(){
    $('.rep_name').text($('#inputrepname').val());
}

function changeCase(){
    $('.case').text($('#inputcase').val());
}

function changeCompany(){
    $('.company').text($('#inputcompany').val());
}

function changeOldCase(){
    $('.old_case').text($('#inputoldcase').val());
}

function changeSerialNumber(){
    $('.serial').text($('#inputserial').val());
}

function changeContract(){
    $('.contract').text($('#inputcontract').val());
}

function changeDate(){
    $('.date').text($('#inputdate').val());
}

function changePID(){
    $('.pid').text($('#inputpid').val());
}

function changeVulnerability(){
    $('.vulnerability').text($('#inputvulnerability').val());
}

function changeAdvisory(){
    $('.advisory').text($('#inputadvisory').val());
}

function changeBugId(){
    $('.bug').text($('#inputbug').val());
}

function changeStatus(){
    $('.status').text($('#inputStatus').val());
}

function copyElementText() {
    var text = document.getElementById('templateBody').innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
}

function populateTemplatesModal(){
    populateEmailTemplates();
    populateNoteTemplates();
    populateLightningFolders();
}

function populateEmailTemplates(){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        data.templates[0].FromOurTeam.forEach(element => {
          steps.push(element);
        });
    })
    .then(function(){
        var table = document.getElementById("template_Table_Body");
        var counter = 0;
        table.innerHTML = '';

        var tr = "";

        steps.forEach(x=>{
            tr+='<tr>';
            tr+='<td><a href="#" onclick="formatEmailBody('+counter+')">'+x.scenario+'</a></td>'
            tr+='</tr>'
            counter++;
        })

        table.innerHTML += tr;
    });
}

function formatEmailBody(index){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        t = data.templates[0].FromOurTeam[index].body;
        s = data.templates[0].FromOurTeam[index].scenario;
    })
    .then(function(){
        document.getElementById("templateTitle").innerText = s;
        document.getElementById("templateBody").innerHTML = t;
    });
}

function populateNoteTemplates(){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        data.notes.forEach(element => {
          notes.push(element);
        });
    })
    .then(function(){
        var table = document.getElementById("notes_Table_Body");
        var counter = 0;
        table.innerHTML = '';

        var tr = "";

        notes.forEach(x=>{
            tr+='<tr>';
            tr+='<td><a href="#" onclick="formatNoteBody('+counter+')">'+x.scenario+'</a></td>'
            tr+='</tr>'
            counter++;
        })

        table.innerHTML += tr;
    });
}

function formatNoteBody(index){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        t = data.notes[index].body;
        s = data.notes[index].scenario;
    })
    .then(function(){
        document.getElementById("templateTitle").innerText = s;
        document.getElementById("templateBody").innerHTML = t;
    });
}

function populateLightningFolders(){
    fetch("./src/data/data.json")
    .then(response => response.json())
    .then(function(data) {
        data.templates[1].FromLigthning.useful_folders.forEach(element => {
          steps.push(element);
        });
    })
    .then(function(){
        var table = document.getElementById("lightning_Table_Body");
        var counter = 0;
        table.innerHTML = '';

        var tr = "";

        steps.forEach(x=>{
            tr+='<tr>';
            tr+='<td>'+x+'</td>'
            tr+='</tr>'
            counter++;
        })

        table.innerHTML += tr;
    });
}

// start the server python -m http.server 8000
// then go to http://localhost:8000/


