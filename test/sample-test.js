const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StakingRewards", function () {
  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();

  //   expect(await greeter.greet()).to.equal("Hello, world!");

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  let StakingRewards;
  let stakingRewards;
  let StakingToken;
  let stakingToken;
  let RewardsToken;
  let rewardsToken;
  let signers;

  beforeEach( async() => {
    signers = await ethers.getSigners();

    StakingRewards = await ethers.getContractFactory("StakingRewards");
    stakingRewards = await StakingRewards.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3","0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

    StakingToken = await ethers.getContractFactory("StakingToken");
    stakingToken = await StakingToken.deploy();

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
  })

});
