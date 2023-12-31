/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/23/99',
      }
    };
  }
  addCredit = (credit) => {
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, credit],
    }));
  };

  addDebit = (debit) => {
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, debit],
    }));
  };

  componentDidMount() {
  // Fetch credits and debits data from API as you've done before
  fetch('https://johnnylaicode.github.io/api/credits.json')
    .then((response) => response.json())
    .then((credit) => {
      this.addCredit(credit);
    });

  fetch('https://johnnylaicode.github.io/api/debits.json')
    .then((response) => response.json())
    .then((debit) => {
      this.addDebit(debit);
    });
  
  }
  calculateAccountBalance = () => {
  const totalCredits = this.state.creditList.reduce((total, credit) => total + credit.amount, 0);
  const totalDebits = this.state.debitList.reduce((total, debit) => total + debit.amount, 0);
  return totalCredits - totalDebits;
};


  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment3">
        <div>
          <Route exact path="/assignment3/" render={HomeComponent} />
          <Route exact path="/assignment3/userProfile" render={UserProfileComponent} />
          <Route exact path="/assignment3/login" render={LogInComponent} />
          <Route exact path="/assignment3/credits" render={CreditsComponent} />
          <Route exact path="/assignment3/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
