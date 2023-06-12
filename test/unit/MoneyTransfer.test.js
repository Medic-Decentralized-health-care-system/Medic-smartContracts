// const { assert, expect } = require("chai")
// const { ethers, deployments } = require("hardhat")

// describe("MoneyTransfer", function () {
//     let MoneyTransfer
//     let accounts

//     const sendValue = ethers.utils.parseEther("1")
//     const balance = ethers.utils.parseEther("5")

//     beforeEach(async function () {
//         await deployments.fixture(["MoneyTransfer"])
//         MoneyTransfer = await ethers.getContract("MoneyTransfer")
//         accounts = await ethers.getSigners()
//     })

//     describe("Transfer Money", function () {
//         it("should revert if there is insufficient balance", async () => {
//             await expect(MoneyTransfer.transfer(accounts[1].address, sendValue)).to.be.revertedWith(
//                 "Insufficient balance"
//             )
//         })
//         it("should transfer money successfully", async () => {
//             await MoneyTransfer.transfer(accounts[0].address, balance)
//             await MoneyTransfer.connect(accounts[0]).transfer(accounts[1].address, sendValue)
//             const balanceSender = await MoneyTransfer.getBalance(accounts[0].address)
//             const balanceRecipient = await MoneyTransfer.getBalance(accounts[1].address)
//             assert.equal(
//                 balanceSender.toString(),
//                 balance.sub(sendValue).toString(),
//                 "Sender balance is incorrect"
//             )
//             assert.equal(
//                 balanceRecipient.toString(),
//                 sendValue.toString(),
//                 "Recipient balance is incorrect"
//             )
//         })
//     })
// })
