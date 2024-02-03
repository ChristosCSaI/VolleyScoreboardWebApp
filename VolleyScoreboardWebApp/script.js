
//δήλωση μεταβλητών για παρακολούθηση βαθμολογιων,σετ 
	let score1 = 0;
    let score2 = 0;
    let sets1 = 0;
    let sets2 = 0;
    let currentSet = 1;
    let servingTeam = 1;
    let timeoutActive = false;
    let timeoutSeconds = 60;
    let timeoutTimer;
    let team1Name;
    let team2Name;
 //Συνάρτηση για την ενημέρωση των βαθμολογιων με βάση την ομάδα και σκορ
    function updateScore(team, value) {
      if (score1 >= 25 && score1 - score2 >= 2) {
        handleSetWon(1);
      } else if (score2 >= 25 && score2 - score1 >= 2) {
        handleSetWon(2);
      }
	 //Έλεγχος για timeout

      if (currentSet % 2 !== 0 && (score1 + score2) % 16 === 8) {
        activateTimeout();
      } else if (currentSet % 2 === 0 && (score1 + score2) % 16=== 0) {
        activateTimeout();
      }

      if (timeoutActive) {
        resetTimeout();
      }

      if (team === 1) {
        score1 += value;
        document.getElementById("score1").innerText = score1;
        servingTeam = 1;
      } else if (team === 2) {
        score2 += value;
        document.getElementById("score2").innerText = score2;
        servingTeam = 2;
      }

      updateServingTeam();
    }

//Συνάρτηση για χειρισμό της ολοκλήρωσης ενός σετ

    function handleSetWon(winningTeam) {
      if (winningTeam === 1) {
        sets1++;
      } else {
        sets2++;
      }

      if (sets1 === 3 || sets2 === 3) {
        handleMatchWon();
      } else {
        startNewSet();
      }
    }

 //Συνάρτηση για εναυσμα νεου σετ
    function startNewSet() {
      currentSet++;
      score1 = 0;
      score2 = 0;
      document.getElementById("score1").innerText = score1;
      document.getElementById("score2").innerText = score2;
    }
	
 //Συνάρτηση για χειρισμό της ολοκλήρωσης του νικητηριου αγωνα
   function handleMatchWon() {
  let winner;
  if (sets1 === 3) {
    winner = team1Name;
  } else if (sets2 === 3) {
    winner = team2Name;
  }
 //Εμφανιση νικητη//
  alert(`${winner} wins the match!`);

  document.getElementById("team1").classList.remove("winner");
  document.getElementById("team2").classList.remove("winner");
  //document.getElementById(`team${sets1 === 3 ? 1 : 2}`).classList.add("winner");

  resetScore();
}

//Συνάρτηση για επαναφορα των σκορ του σετ

    function resetScore() {
      score1 = 0;
      score2 = 0;
      sets1 = 0;
      sets2 = 0;
      currentSet = 1;
      servingTeam = 1;
      timeoutActive = false;
      document.getElementById("score1").innerText = score1;
      document.getElementById("score2").innerText = score2;
      document.getElementById("timer").innerText = '';
      document.getElementById("team1Name").value = '';
      document.getElementById("team2Name").value = '';
    }

//Συνάρτηση για το timeout
    function activateTimeout() {
      timeoutActive = true;
      updateTimeout();
      timeoutTimer = setInterval(updateTimeout, 1000);
    }
	
//Συνάρτηση για ενημέρωση μετρησης του timeout
    function updateTimeout() {
  if (timeoutActive && timeoutSeconds > 0) {
    document.getElementById("timer").innerText = `Timeout: ${timeoutSeconds}s`;
    timeoutSeconds--;
  } else {
    stopTimeout();
  }
}


//Συνάρτηση για reset μετρησης timeout στην αρχικη του τιμη
    function resetTimeout() {
      clearInterval(timeoutTimer);//clearInterval για να σταματήσει την εκτέλεση του κώδικα που ενημερώνει την εμφάνιση timeout
      timeoutActive = false;
      timeoutSeconds = 60;
      document.getElementById("timer").innerText = '';
    }
	
//Συναρτηση για εμφανιση πληροφοριων των σετ
	function showSets(team) {
	  const team1Sets = sets1;
	  const team2Sets = sets2;

	  const modalContent = document.getElementById("modalContent");
	  modalContent.innerHTML = `<p>${team1Name}: ${team1Sets}</p><p>${team2Name}: ${team2Sets}</p>`;//δημιουργια περιεχομένου HTML ομαδες και σετ

	  const modal = document.getElementById("setsModal");
	  modal.style.display = "block";
	}
	
	
	
  //Συναρτηση για κλεισιμο παραθυρων (modal)//
	function closeModal() {
	  const modal = document.getElementById("setsModal");
	  modal.style.display = "none"; //απόκρυψη στοιχείου σε HTML και CSS
	}

//Συναρτηση ενημερωσης της ομαδας που εξυπηρετειτε
    function updateServingTeam() {
      document.getElementById("team1").style.backgroundColor = servingTeam === 1 ? "#2ecc71" : "#3498db"; //Εάν το servingTeam είναι 1, το "team1" θα έχει πράσινο φόντο και το "team2" θα έχει μπλε φόντο
      document.getElementById("team2").style.backgroundColor = servingTeam === 2 ? "#2ecc71" : "#3498db";//Εάν το servingTeam είναι 2, το "team2" θα έχει πράσινο φόντο και το "team1" θα έχει μπλε φόντο
    }
	
//Συνάρτηση για εξαγωγη αποτελεσματων σε CSV file

    function exportMatchDetails() {
  // Κατασκευή του περιεχομένου CSV με λεπτομέρειες αντιστοίχισης, συμπεριλαμβανομένων σετ
  const csvContent = `Team 1 Sets,${sets1}\nTeam 2 Sets,${sets2}`;

  // Δημιουργία Blob (Binary Large Object) με περιεχόμενο CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Δημιουργία προσωρινού στοιχείου αγκύρωσης για την ενεργοποίηση της λήψης
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);

  // Ρύθμιση του ονόματος αρχείου για το αρχείο CSV
  link.download = 'match_details.csv';

  // Προσάρτηση του στοιχείου αγκύρωσης στο έγγραφο και ενεργοποίηση ενός κλικ για να ξεκινήσει η λήψη
  document.body.appendChild(link);
  link.click();

  // Αφαίρεση του στοιχείου αγκύρωσης από το έγγραφο
  document.body.removeChild(link);
}
//Συναρτηση για μεφανιση ονμάτων των ομάδων//
    function setTeamNames() {
      team1Name = document.getElementById("team1Name").value || "Team 1";
      team2Name = document.getElementById("team2Name").value || "Team 2";
    }
	
//Συνάρτηση για εκκίνηση timeout με το πάτημα κουμπίου
	function activateTimeoutManually() {
  if (!timeoutActive) {
    activateTimeout();
    console.log('Timeout manually activated');
  } else {
    console.log('Timeout is already active');
  }
}
function stopTimeout() {
  timeoutActive = false;
  timeoutSeconds = 60;
  document.getElementById("timer").innerText = 'Timer stopped';
}

    document.getElementById("team1Name").addEventListener("input", setTeamNames);
    document.getElementById("team2Name").addEventListener("input", setTeamNames);