pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingToken is ERC20 {
    constructor() ERC20("StakingToken", "STN") {
        _mint(msg.sender, 100000);
    }
}
//0x5FbDB2315678afecb367f032d93F642f64180aa3
