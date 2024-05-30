# ELLA Project

A simple decentralized application (dApp) that simulates an Automated Teller Machine (ATM) using Ethereum smart contracts.

## Description

The ELLA project allows users to interact with a smart contract on the Ethereum blockchain to deposit and withdraw Ether (ETH). Users connect their MetaMask wallet, submit their details to generate a unique reference number, and then use this reference number to securely deposit or withdraw ETH from their account.

## Getting Started

### Installing

git clone https://github.com/your-username/ella-project.git
cd ella-project

npm install

Configure the smart contract:

•	Deploy the Assessment.sol smart contract on remix ide
•	Update the contractAddress in the HomePage component with the deployed contract's address.

### Executing program

•	Run the development server:
	npm run dev

•	Open the application:
Open your web browser and go to http://localhost:3000.

•	Use the application:
Enter your name and cellphone number to generate a reference number.
Connect your MetaMask wallet by clicking the "Please click here to open ELLA" button.
Deposit or withdraw 1 ETH using the generated reference number.

## Help

Common issues:
•	MetaMask not detected: Make sure you have MetaMask installed in your browser.
•	Incorrect reference number: Ensure the reference number you enter matches the one generated.
•	Transaction failed: Ensure you have sufficient ETH balance in your MetaMask wallet.

## Authors

Contributors names and contact info

ex. Carmela Pearl Sordilla  


## License

This project is licensed under the Ella License - see the LICENSE.md file for details
