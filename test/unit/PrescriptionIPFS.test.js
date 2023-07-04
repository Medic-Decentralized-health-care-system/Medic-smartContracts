const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("PrescriptionIPFS", function () {
    let prescriptionContract
    let owner
    let addr1
    let addr2

    beforeEach(async function () {
        ;[owner, addr1, addr2] = await ethers.getSigners()
        const PrescriptionIPFS = await ethers.getContractFactory("PrescriptionIPFS")
        prescriptionContract = await PrescriptionIPFS.deploy()
        await prescriptionContract.deployed()
    })

    it("should add a prescription and retrieve it correctly", async function () {
        const ipfsHash = "QmY4Y3vnzyjrxT5uv4xEhnb3AWKe6rMzJhxyWTm1MdXp12"
        const documentId = 1

        await prescriptionContract.addPrescription(ipfsHash, addr1.address, documentId)

        const prescriptionCount = await prescriptionContract.getPrescriptionCount(addr1.address)
        assert.equal(prescriptionCount, 1, "Incorrect prescription count")

        const retrievedIpfsHash = await prescriptionContract.getPrescription(
            addr1.address,
            documentId
        )
        assert.equal(retrievedIpfsHash, ipfsHash, "Incorrect IPFS hash")
    })

    it("should return 'No Prescription Found' for non-existing prescription", async function () {
        const ipfsHash = "QmY4Y3vnzyjrxT5uv4xEhnb3AWKe6rMzJhxyWTm1MdXp12"
        const documentId = 1

        await prescriptionContract.addPrescription(ipfsHash, addr1.address, documentId)

        const retrievedIpfsHash = await prescriptionContract.getPrescription(addr1.address, 2)
        assert.equal(
            retrievedIpfsHash,
            "No Prescription Found",
            "Incorrect result for non-existing prescription"
        )
    })

    it("should return the correct prescription count", async function () {
        const ipfsHash1 = "QmY4Y3vnzyjrxT5uv4xEhnb3AWKe6rMzJhxyWTm1MdXp12"
        const ipfsHash2 = "QmZ7D3vnzyjrxT5uv4xEhnb3AWKe6rMzJhxyWTm1MdXp34"
        const documentId1 = 1
        const documentId2 = 2

        await prescriptionContract.addPrescription(ipfsHash1, addr2.address, documentId1)
        await prescriptionContract.addPrescription(ipfsHash2, addr2.address, documentId2)

        const prescriptionCount = await prescriptionContract.getPrescriptionCount(addr2.address)
        assert.equal(prescriptionCount, 2, "Incorrect prescription count")
    })
})
