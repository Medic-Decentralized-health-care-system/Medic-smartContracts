const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const prescriptionManager = await deploy("PrescriptionManager", {
        from: deployer,
        args: [],
        log: true,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verify contracts on Etherscan")
        log("verifyingggggg.......")
        await verify(prescriptionManager.address, [])
    }

    log("----------------------------------------------------")
}
module.exports.tags = ["all", "prescriptionManager"]
