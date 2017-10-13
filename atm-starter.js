// var R = require('ramda'); // Helps with {}s and []s http://ramdajs.com/docs/#find
var prompt = require('prompt');
prompt.start(); // Lets you prompt the user for info

// withdraw variables

var _userBudget = null;
var _runningTotal = 0;
var _fundsRemain = 0;
var _userAttempts = 0;

// Dummy Users

var bankDetails = [{
  firstName: 'Ralph',
  lastName: 'Field',
  longnum: 'ralph',
  PINnum: 'getmoney',
  balance: 300
},{
  firstName: 'James',
  lastName: 'Sherry',
  longnum: 'james',
  PINnum: 'doastold',
  balance: 9000
},{
  firstName: 'Pedro',
  lastName: 'Martin',
  longnum: 'pedro',
  PINnum: 'hasababy',
  balance: 4000
},{
  firstName: 'Jack',
  lastName: 'May',
  longnum: 'jackie.chan',
  PINnum: 'KEEYAAH!',
  balance: 3000
}
];

console.log('Welcome to Ralph\'s Bank');
// Prompt (which is Async) works like this:
function getUserPass(user) {
  console.log('Please insert your card\'s long number, then your PIN number...');
  // prompt longnum and PINnum
  prompt.get(['longnum', 'PINnum'], function(err, result) {
    if (err) { // Handle error
          return err;
    }
    // find user name and password with prompt inputs
    var user = bankDetails.find(function(user) {
      return result.longnum === user.longnum && result.PINnum === user.PINnum;
    });

    if (user) return giveOptions1(user);
    function attempts () {
      _userAttempts += 1;
      if (_userAttempts < 3) {
        return getUserPass();
      }
      console.log('Your card has been taken - bad luck fella');
    }
    attempts();
  });
}
getUserPass();

function giveOptions1 (person) {
  console.log('To show BALANCE, press \'a\'\nTo WITHDRAW, press \'b\'\nTo quit, press \'q\'');
  prompt.get(['letter'], function(err, result) {
    var userChoice1 = result.letter;
    if (err) {
      return err;
    }
    if (userChoice1 === 'a') {
      console.log('Balance: £' + person.balance + '\nPress \'a\' for previous options\nPress \'q\' to return card');
      giveOptions2(person);
    } else if (userChoice1 === 'b') {
      console.log('How much money do you want to withdraw?');
      withdrawCash(person);
    } else if (userChoice1 === 'q') {
      console.log('Card returned');
      getUserPass();
    } else {
      console.log('Wrong choice');
      giveOptions1(person);
    }
  });
}

function giveOptions2 (person) {
  prompt.get(['num'], function(err,result) {
    userChoice2 = result.num
    if (err) {
      return err;
    }
    if (userChoice2 === 'a') {
      giveOptions1(person);
    } else if (userChoice2 === 'q') {
      console.log('Card returned');
      getUserPass();
    } else {
      console.log('Wrong choice');
      giveOptions2(person);
    }
  });
}

function withdrawCash(person) {
  var _userBudget = person.balance;
  prompt.get(['amount'], function(err, result) {
    if (err) {
      return err;
    }
    if (parseInt(result.amount, 10) <= _userBudget) {
      _fundsRemain = _userBudget - parseInt(result.amount, 10);
      person.balance = _fundsRemain;
      console.log('£' + result.amount + ' taken out\nYou have left: £' + _fundsRemain + '\nPress \'a\' for previous options\nPress \'q\' to return card');
      withdrawCash(person);
    } else if (result.amount === 'a'){
      giveOptions1(person);
    } else if (result.amount === 'q'){
      console.log("Card returned");
      getUserPass();
    } else {
      console.log('Not enough £££ - please try again...' + '\nYou have left: £' + person.balance + '\nPress \'a\' for previous options\nPress \'q\' to return card');
      withdrawCash(person);
    }
  });
}
