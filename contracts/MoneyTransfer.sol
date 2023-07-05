//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MoneyTransfer {
    mapping(address => uint256) balances;

    event Transfer(address indexed from , address indexed to , uint256 amount);

    function transfer(address _to , uint256 _amount ) public {
        require(balances[msg.sender] >= _amount , "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        emit Transfer(msg.sender , _to , _amount);
    }

    function getBalance(address account) public view returns (uint256){
        return balances[account];
    }

    //winthdraw money from contract
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount , "Not enough currency available!");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function addMoney(uint256 _amount) public {
        require(msg.sender.balance >= _amount, "Insufficient balance in MetaMask wallet");
        balances[msg.sender] += _amount;
    }

    // fallback function
    receive() external payable{
        balances[msg.sender] += msg.value;
    }   
}