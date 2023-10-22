/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {
  handleAddCredit = (newCredit) => {
  // Add the new credit to the list
  const updatedCreditList = [...this.props.credits, newCredit];
  this.setState({ creditList: updatedCreditList });

  // Update the account balance
  const newAccountBalance = this.props.calculateAccountBalance();
  this.setState({ accountBalance: newAccountBalance });
};

  return (
    <div>
      <h1>Credits</h1>
      Balance: {this.props.accountBalance}
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}


export default Credits;
