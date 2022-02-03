pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("RewardToken", "RTN") {
        _mint(msg.sender, 1000000);
    }
}
//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
