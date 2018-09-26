document.addEventListener("DOMContentLoaded", function () {

  const newCandidates = [
      { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
      { name: "Mario", skills: ["Python", "AWS"] },
      { name: "Jacquline", skills: ["JavaScript", "Azure"] },
      { name: "Kathy", skills: ["JavaScript", "Java"] },
      { name: "Anna", skills: ["JavaScript", "AWS"] },
      { name: "Matt", skills: ["PHP", "AWS"] },
      { name: "Matt", skills: ["PHP", ".Net", "Docker"] },
    ];

  function removeRowsFromTable(table) {
    const rows = table.getElementsByTagName("tr");

    while (rows.length > 1) {
      table.deleteRow(1);
    }
  }

  function insertCandidate(tbody, name, skills) {
    const newRow = tbody.insertRow();
    const nameCell = newRow.insertCell();
    const skillCell = newRow.insertCell();

    const candidateName = document.createTextNode(name);
    const candidateSkills = document.createTextNode(skills.join(', '));

    nameCell.appendChild(candidateName);
    skillCell.appendChild(candidateSkills);
  }

  function addCandidatesToTable(table, candidates) {
    candidates.forEach(candidate => insertCandidate(table, candidate.name, candidate.skills));
  }

  // Using ES6 array functions to filter the candidate array by skill.
  function filterCandidateBySkill(candidates, skill) {

    // Initial check to see if filtering by All and return complete list.
    if (skill == "All") {
      return candidates;
    }

    candidates = candidates.filter(candidate => 
      candidate.skills.includes(skill)
    );

    return candidates;
  }


  // Get all unique skills from the candidates array.
  getUniqueSkills = (candidates) => {
    var skills = [];

    candidates.forEach(function(candidate) {
      
      candidate.skills.forEach(function(skill) {
        
        if (!skills.includes(skill) ) {
          skills.push(skill);
        }

      })

    })
    return skills;
  }

  // Create option nodes for each unique skill
  addSkillsToSelect = (skills) => {

    const skillSelect = document.getElementById('skills');
    const skillSelectTwo = document.getElementById("skills2");

    skills.forEach((skill) => {
        var option = document.createElement("option");
        option.text = skill;
        skillSelect.add(option);
        const secondOption = option.cloneNode(true);
        skillSelectTwo.add(secondOption);
      }
    );
  }

  // Hide the example table while still maintaining the original functionality of cloning for the new table.
  const exampleTable = document.getElementById("example");
  exampleTable.style.display = "none";

  const candidatesTable = document.getElementById("candidates_example");
  const newCandidatesTable = candidatesTable.cloneNode(true);

  addSkillsToSelect(getUniqueSkills(newCandidates))

  removeRowsFromTable(newCandidatesTable);
  const newTbody = newCandidatesTable.getElementsByTagName('tbody')[0];

  const filteredCandidates = filterCandidateBySkill(newCandidates, 'JavaScript')
  addCandidatesToTable(newTbody, filteredCandidates)

  document.body.appendChild(newCandidatesTable);

  const skillSelect = document.getElementById('skills');
  const skillSelectTwo = document.getElementById("skills2");

  const selectInputs = [skillSelect, skillSelectTwo];

  // Initialise the select on Javascript as the test intially wanted.
  skillSelect.value = "JavaScript";

  // Add listener for changes to the skill select. Update table with new skill.
  selectInputs.forEach(function(skillSelector) {
    skillSelector.addEventListener("change", () => {
      removeRowsFromTable(newCandidatesTable);
      var filteredCandidates = filterCandidateBySkill(newCandidates, skillSelect.value);
      var doubleFilteredCandidates = filterCandidateBySkill(filteredCandidates, skillSelectTwo.value);

      addCandidatesToTable(newTbody, doubleFilteredCandidates);
    });
  })


});
