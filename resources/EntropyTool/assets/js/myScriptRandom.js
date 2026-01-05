// JavaScript Document
var entropyLow, entropyHigh;
var loa1Accepted, loa2Accepted;
var passwordLength, gains, losses, lifetimeInDays, lockoutInHours, guesses, is94, is10;
var calcDisplayText = "-", calcDisplayText2 = "-" ;

//getting input from text boxes
function getInputs() {
		
		//get password
		passwordLength = Number(document.getElementById("passwordLength").value);
		//console.log("password is: ", passwordLength);
				
		//get guesses
		guesses = Number(document.getElementById("guesses").value);
		
		//get lifetime
		lifetimeInDays = Number(document.getElementById("lifetimeInDays").value);
				
		//get lockout
		lockoutInHours = Number(document.getElementById("lockoutInHours").value);
		
		//get alphabet
		/*var radio_check_val = "";
        for (i = 0; i < document.getElementsByName('charSet').length; i++) {
            if (document.getElementsByName('charSet')[i].checked) {
                alert("this radio button was clicked: " + document.getElementsByName('charSet')[i].value);
                radio_check_val = document.getElementsByName('charSet')[i].value;

            }

        }
		
		is94 = Number(document.getElementsByName("charSet")[0].value);
		console.log("is94: ", is94);
		*/
		//checking if char set 94 is selected
		/*if(document.getElementsByName("charSet")[0].checked) {
			is94 = true;	
		}*/
		
}

// include character set calculation

//using password length and gains and losses to calculate HValue
function calculateEntropyValue(passwordLength) {
		var hValue = 0;
		
		hValue = Math.log(Math.pow(95,passwordLength))/Math.LN2;
		console.log("!!!!!!!!!!hVal:", hValue);
		
		
		calcDisplayText = "LOA1 Calculation: " + "<br/>"+ "Entropy bits ( log base 2(Character Set Size)^(Password Length)): " + hValue + " "; 
		
		calcDisplayText2 = "LOA2 Calculation: " + "<br/>"+ "Entropy bits ( log base 2(Character Set Size)^(Password Length)): " + hValue + " "; 
		
		return hValue;
}

//using entropy values, guesses, lifetime and lockout to calculate loa1 and loa2 accptance
function calculateLOAAcceptance(entropyLow, entropyHigh, guesses, lifetimeInDays, lockoutInHours) {
		var loa1, loa2;
		
		loa1 = Math.pow(2,entropyLow-10) - (guesses * (lifetimeInDays*24)/lockoutInHours);
		loa2 = Math.pow(2,entropyHigh-14) - (guesses * (lifetimeInDays*24)/lockoutInHours);
		
		if (loa1 > 0) {
			loa1Accepted = true;
		} else {
			loa1Accepted = false;
		}
		
		if (loa2 > 0) {
			loa2Accepted = true;	
		} else {
			loa2Accepted = false;
		}
		
		calcDisplayText = calcDisplayText +"<br />" + " LOA1 Acceptance Value (2^(Lower Entropy bit Value - 10) - Guesses *(Lifetime in Days *24) / Lockout In Hours) : " + loa1 +"<br />" + (loa1Accepted ? "As positive Acceptance Value, LOA1 Accepted!" : "As negative Acceptance Value, LOA1 Declined!") ;
		
		calcDisplayText2 = calcDisplayText2 +"<br />" + " LOA2 Acceptance Value (2^(Lower Entropy bit Value - 14) - Guesses *(Lifetime in Days *24) / Lockout In Hours) : " + loa2 +"<br />" + (loa2Accepted ? "As positive Acceptance Value, LOA2 Accepted!" : "As negative Acceptance Value, LOA2 Declined!") ;
}
	
//finding closest rounding off to entropy values given the HValue
function calculateEntropyRange(hValue) {
		//if hValue is an exact multiple of 4 or just 0.5 short
		if ((hValue % 4 === 0) || (Math.floor(hValue + 0.5) % 4 === 0 )) {
				entropyHigh = Math.ceil(hValue);
				entropyLow = entropyHigh;
				console.log("got here");
			}
		else {
				console.log("here instead");
				var hLow, hHigh;
				hLow = Math.round(hValue) - 3;
				hHigh = Math.round(hValue) + 3;
				console.log("hLow: ", hLow, " hHigh: ", hHigh);
				
				//calculate entropy
				entropyLow = Math.floor(hValue/4)*4;
				entropyHigh = entropyLow + 4;	
				console.log("entropyLow: ", entropyLow, " entropyHigh: ", entropyHigh);
			}
			
			calcDisplayText = calcDisplayText + "<br />" + "Lower Entropy Bit Value: "+ entropyLow +"<br />" + "Higher Entropy Bit Value: " + entropyHigh + " ";
			
			calcDisplayText2 = calcDisplayText2 + "<br />" + "Lower Entropy Bit Value: "+ entropyLow +"<br />" + "Higher Entropy Bit Value: " + entropyHigh + " ";
}


//testing values and ranges of calculations
function calculateAll(passwordLength, lifetimeInDays, lockoutInHours, guesses) {
		console.log("passwordLength: ",passwordLength, " gains: ", gains, " losses: ", losses, " lifetimeInDays: ", lifetimeInDays, " lockoutInhrs: ", lockoutInHours, " guesses: ", guesses);
		
		var hValue = calculateEntropyValue(passwordLength);
		console.log("hvalue: ", hValue);
		
		calculateEntropyRange(hValue);
		console.log("entropyLow: ", entropyLow, " entropyHigh: ", entropyHigh);
		
		calculateLOAAcceptance(entropyLow, entropyHigh, guesses, lifetimeInDays, lockoutInHours);
		console.log("LOA1: ", loa1Accepted, " LOA2: ", loa2Accepted);	
}
	
//update color and text of LOA1 and LOA2
function showResults(loa1Accepted, loa2Accepted) {
		
		var loa1Status = document.getElementById("loa1Status");
		var loa2Status = document.getElementById("loa2Status");
		
		console.log("loa1Status onject:",loa1Status.innerHTML);
		//updating LOA1
		if (loa1Accepted === true) {
				//grab LOA1
				loa1Status.innerHTML = "Accepted";
				loa1Status.setAttribute("style","color:green");
				//its color and text
				console.log("loa1Status onject:",loa1Status.innerHTML);
				
				document.getElementById("pLengthSug1").innerHTML = "-";
				document.getElementById("lifetimeSug1").innerHTML = "-";
				document.getElementById("guessesSug1").innerHTML = "-";
				document.getElementById("lockoutSug1").innerHTML = "-";
		}
		else {
				loa1Status.innerHTML = "Declined";
				loa1Status.setAttribute("style","color:red");
				
				document.getElementById("pLengthSug1").innerHTML = "Increase Password Length";
				document.getElementById("lifetimeSug1").innerHTML = "Decrease Lifetime";
				document.getElementById("guessesSug1").innerHTML = "Decrease Guesses";
				document.getElementById("lockoutSug1").innerHTML = "Increase Lockout";
		}
		//updating LOA2
		if (loa2Accepted === true) {
				//grab LOA1
				loa2Status.innerHTML = "Accepted";
				loa2Status.setAttribute("style","color:green");
				//its color and text
				document.getElementById("pLengthSug2").innerHTML = "-";
				document.getElementById("lifetimeSug2").innerHTML = "-";
				document.getElementById("guessesSug2").innerHTML = "-";
				document.getElementById("lockoutSug2").innerHTML = "-";
		}
		else {
				//grab LOA2
				loa2Status.innerHTML = "Declined";
				loa2Status.setAttribute("style","color:red");
				//its color and text
				document.getElementById("pLengthSug2").innerHTML = "Increase Password Length";
				document.getElementById("lifetimeSug2").innerHTML = "Decrease Lifetime";
				document.getElementById("guessesSug2").innerHTML = "Decrease Guesses";
				document.getElementById("lockoutSug2").innerHTML = "Increase Lockout";
		}	
	
		document.getElementById("calcDisplay").innerHTML = calcDisplayText;	
		document.getElementById("calcDisplay2").innerHTML = calcDisplayText2;
}
	

//data validation
function dataValidation() {
		var dataValidated = true;
		//checking passwordLength
		if ( isNaN(passwordLength) || passwordLength < 1 || passwordLength > 24 ) {
			dataValidated = false;
			console.log("password");
			}
		
		//checking lifetimeInDays
		if ( isNaN(lifetimeInDays) || lifetimeInDays < 0 || lifetimeInDays > 3650 ) {
			dataValidated = false;
			console.log("lifetime");
			}
			
		//checking guesses
		if ( isNaN(guesses) || guesses < 0 || guesses > 256 ) {
			dataValidated = false;
			console.log("guesses");
			}
			
		//checking lockoutInHours
		if ( isNaN(lockoutInHours) || lockoutInHours < 1 || lockoutInHours > 120 ) {
			dataValidated = false;
			console.log("lockout");
			}	
			
		return dataValidated;		
			
}	
	
window.onload =  function() {
		
    		//alert("Page just loaded!");
			console.log("reached ready function");
			//insertSliders();
			
			//var passwordLength = 9, gains = 6, losses = 0, lifetimeInDays = 368, lockoutInHours = 10, guesses = 50;
};

document.getElementById("calculateButton").onclick = function() {
		
		//checking input and validating before calculating
		getInputs();
		var continueCalc = dataValidation();
		var calcHappened = false;
		console.log("dataVal returned:", continueCalc);
		if (continueCalc === false) {
			alert("Incorrect input, either a value is not set (NaN) or change losses to be within limits -4 to 0");
			return;
		}
		else {	//calculate entropy and show results
			
			calculateAll(passwordLength, lifetimeInDays, lockoutInHours, guesses);
			showResults(loa1Accepted, loa2Accepted);
			document.getElementById("calcHappened").innerHTML = "Scroll up to see Summary of Results";	
			calcHappened = true;
		}
		return calcHappened;
}

document.getElementById("hideCalculation").onclick = function() {
	
	if(document.getElementById("hideCalculation").checked){
			document.getElementById("calcDisplay").innerHTML = " ";	
			document.getElementById("calcDisplay2").innerHTML = " ";
	}
	else {
			document.getElementById("calcDisplay").innerHTML = calcDisplayText;	
			document.getElementById("calcDisplay2").innerHTML = calcDisplayText2;
			
	}
}

