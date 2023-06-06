const { assert, expect } = require("chai")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("PrescriptionManager", function () {
          let chainId = network.config.chainId
          let accounts, prescriptionManager
          console.log("--------------------------")

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              console.log("Running unit tests with chainId: ", chainId)
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])

              prescriptionManager = await ethers.getContract("PrescriptionManager", deployer)
          })
          describe("add prescription", function () {
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
          })
      })
