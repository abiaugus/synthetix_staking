const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StakingRewards", function () {
  let StakingRewards;
  let stakingRewards;
  let StakingToken;
  let stakingToken;
  let RewardsToken;
  let rewardsToken;
  let signers;

  before( async() => {
    signers = await ethers.getSigners();

    StakingRewards = await ethers.getContractFactory("StakingRewards");
    stakingRewards = await StakingRewards.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3","0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

    StakingToken = await ethers.getContractFactory("StakingToken");
    stakingToken = await StakingToken.deploy();

    RewardsToken = await ethers.getContractFactory("RewardToken");
    rewardsToken = await RewardsToken.deploy();

  })

  describe("Deployment", async() => {
    it("has the correct staking token address", async () => {
      await stakingRewards.deployed();
      const stakingTokenAddress = await stakingRewards.stakingToken();
      expect(stakingTokenAddress).to.equal("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    })
    it("has the correct reward token address", async () => {
      await stakingRewards.deployed();
      const rewardTokenAddress = await stakingRewards.rewardsToken();
      expect(rewardTokenAddress).to.equal("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    })
    it("has the correct reward rate", async () => {
      await stakingRewards.deployed();
      const rewardRate = await stakingRewards.rewardRate();
      expect(rewardRate).to.equal("100");
    })

  })
  describe("Transferring Tokens", async () => {
    it("can transfer 1000 STN tokens to user", async () => {
      await stakingToken.deployed();
      await stakingToken.transfer(signers[1].address, "1000");
      const balance = await stakingToken.balanceOf(signers[1].address);
      expect(balance).to.equal("1000");
    })
    it("can transfer 1000 RTN tokens to user", async () => {
      await rewardsToken.deployed();
      await rewardsToken.transfer(signers[1].address, "1000");
      const balance = await rewardsToken.balanceOf(signers[1].address);
      expect(balance).to.equal("1000");
    })

  })
  describe("Approvals", async() => {
    it("can approve spending STN Tokens", async () => {
      await stakingToken.deployed();
      await stakingToken.approve(signers[1].address, "1000");
      const allowance = await stakingToken.allowance(signers[0].address, signers[1].address);
      expect(allowance).to.equal("1000");

    })
  });
  
  describe("Staking Tokens", async () => {
    it("can stake STN Tokens", async () => {
      await stakingToken.deployed();
      await stakingRewards.deployed();
      // console.log("address is", stakingToken.address);
      await stakingToken.approve(signers[1].address, "1000");
      await stakingToken.transfer(signers[1].address, "1000");
      await stakingToken.connect(signers[1]).approve(stakingRewards.address, "1000");
      await stakingToken.transfer(signers[1].address, "1000");
      const dummy = await stakingRewards.connect(signers[1]).stake("1");
      console.log(stakingRewards);
      // console.log("Dummy", dummy);

      // const result = await stakingRewards.connect(signers[1]).stake("100");
      // console.log(signers[1].address);
      // console.log(result);      

    })
  })

});

/*

Steps followed in Remix

1. Approve account1 from StakingToken contract using approve(). called by owner(account0)
2. Transfer 1000 STN from owner to account1.
3. Check allowance of account1 by calling allowance.
4. Switch to account1, and approve StakingRewards Contract for 1000 STN
5. Check allowance of StakingRewards by calling allowance(owner=account1, spender=StakingRewards)
6. Create Stake. Works.


*/


