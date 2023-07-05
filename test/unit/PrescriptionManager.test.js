const { assert, expect } = require("chai")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Manage contract tests", function () {
          let chainId = network.config.chainId
          let accounts, prescriptionManager, MoneyTransfer
          let sendValue, balance
          console.log("--------------------------")

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              console.log("Running unit tests with chainId: ", chainId)
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])

              //   prescriptionManager = await ethers.getContract("PrescriptionManager", deployer)
              MoneyTransfer = await ethers.getContract("MoneyTransfer", deployer)
              sendValue = ethers.utils.parseEther("1")
              balance = ethers.utils.parseEther("5")
          })
          describe("Transfer Money", function () {
              it("should revert if there is insufficient balance", async () => {
                  await expect(
                      MoneyTransfer.transfer(accounts[1].address, sendValue)
                  ).to.be.revertedWith("Insufficient balance")
              })
              it("should transfer money successfully", async () => {
                  await accounts[0].sendTransaction({
                      to: MoneyTransfer.address,
                      value: balance,
                  })

                  await MoneyTransfer.connect(accounts[0]).transfer(accounts[1].address, sendValue)

                  const balanceSender = await MoneyTransfer.getBalance(accounts[0].address)
                  const balanceRecipient = await MoneyTransfer.getBalance(accounts[1].address)
                  assert.equal(
                      balanceSender.toString(),
                      balance.sub(sendValue).toString(),
                      "Sender balance is incorrect"
                  )
                  assert.equal(
                      balanceRecipient.toString(),
                      sendValue.toString(),
                      "Recipient balance is incorrect"
                  )
              })
              it("Should be able to withdraw the money", async () => {
                  await accounts[0].sendTransaction({
                      to: MoneyTransfer.address,
                      value: balance,
                  })
                  await MoneyTransfer.connect(accounts[0]).withdraw(balance)
                  const balanceSender = await MoneyTransfer.getBalance(accounts[0].address)
                  assert.equal(balanceSender.toString(), "0", "Sender balance is incorrect")
              })
              it("Should be able to add money", async () => {
                  await accounts[0].sendTransaction({
                      to: MoneyTransfer.address,
                      value: balance,
                  })
                  await MoneyTransfer.connect(accounts[1]).addMoney(balance)
                  const balanceSender = await MoneyTransfer.getBalance(accounts[1].address)
                  assert.equal(
                      balanceSender.toString(),
                      balance.toString(),
                      "Sender balance is incorrect"
                  )
              })
          })
      })
