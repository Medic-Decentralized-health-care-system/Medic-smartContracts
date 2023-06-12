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

              prescriptionManager = await ethers.getContract("PrescriptionManager", deployer)
              MoneyTransfer = await ethers.getContract("MoneyTransfer", deployer)
              sendValue = ethers.utils.parseEther("1")
              balance = ethers.utils.parseEther("5")
          })
          describe("Prescription Manager", function () {
              it("should add a prescription", async function () {
                  const { deployer, patient, doctor } = await getNamedAccounts()
                  const prescriptionManager = await ethers.getContract("PrescriptionManager")
                  //   const patient = "0x123"
                  //   const doctor = "0x456"
                  const disease = "Test Disease"
                  const medicine = "Test Medicine"
                  const dosage = "Test Dosage"
                  const duration = "Test Duration"
                  await prescriptionManager.addPrescription(
                      patient,
                      doctor,
                      disease,
                      medicine,
                      dosage,
                      duration
                  )
                  const prescriptionCount = await prescriptionManager.getPrescriptionCount(patient)
                  const prescription = await prescriptionManager.getPrescription(
                      patient,
                      prescriptionCount - 1
                  )
                  expect(prescription.id).to.equal(prescriptionCount - 1)
                  expect(prescription.patient).to.equal(patient)
                  expect(prescription.doctor).to.equal(doctor)
                  expect(prescription.disease).to.equal(disease)
                  expect(prescription.medicine).to.equal(medicine)
                  expect(prescription.dosage).to.equal(dosage)
                  expect(prescription.duration).to.equal(duration)
                  expect(prescription.timestamp).to.be.gt(0)
              })
              it("should return the correct prescription count for a patient", async function () {
                  await prescriptionManager.addPrescription(
                      ethers.constants.AddressZero,
                      ethers.constants.AddressZero,
                      "Disease 1",
                      "Medicine 1",
                      "Dosage 1",
                      "Duration 1"
                  )
                  await prescriptionManager.addPrescription(
                      ethers.constants.AddressZero,
                      ethers.constants.AddressZero,
                      "Disease 2",
                      "Medicine 2",
                      "Dosage 2",
                      "Duration 2"
                  )
                  const patientAddress = ethers.constants.AddressZero
                  const count = await prescriptionManager.getPrescriptionCount(patientAddress)
                  expect(count).to.equal(2)
              })
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
          })
      })
