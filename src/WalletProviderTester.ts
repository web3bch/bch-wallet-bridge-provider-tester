import IWalletProvider from "bch-wallet-bridge-provider-interface/lib/IWalletProvider"
import Utxo from "bch-wallet-bridge-provider-interface/lib/entities/Utxo"

export default class WalletProviderTester {
    constructor(public walletProvider: IWalletProvider) {}

    //
    // getVersion
    //
    public async testGetVersion(): Promise<boolean> {
        const version = await this.walletProvider.getVersion()
        if (typeof version !== "string") {
            throw new Error("The return value is invalid.")
        }
        return true
    }

    //
    // getAddresses
    //
    public async testGetAddresses(): Promise<boolean> {
        const addresses = await this.walletProvider.getAddresses(0, 10, 0, undefined)
        const address = addresses[0]
        if (typeof address !== "string") {
            throw new Error("The return value is invalid.")
        }

        if (addresses.length !== 10) {
            throw new Error("The number of addresses returned is not expected value.")
        }
        return true
    }

    //
    // getAddressIndex
    //
    public async testGetAddressIndex(): Promise<boolean> {
        const idx = await this.walletProvider.getAddressIndex(0, undefined)
        if (!Number.isInteger(idx) || idx < 0 || idx > Math.pow( 2, 32 ) - 1) {
            throw new Error("The return value is invalid.")
        }
        return true
    }

    //
    // getRedeemScripts
    //
    public async testGetRedeemScripts(): Promise<boolean> {
        const redeemScripts = await this.walletProvider.getRedeemScripts(undefined)
        if (redeemScripts.length > 0 && typeof redeemScripts[0] !== "string") {
            throw new Error("The return value is invalid.")
        }
        return true
    }

    //
    // addRedeemScript
    //
    public async testAddRedeemScripts(): Promise<boolean> {
        const result = await this.walletProvider
                                 .addRedeemScript("76a914925d4028880bd0c9d68fbc7fc7dfee976698629c88ac", undefined)
        if (typeof result !== "undefined") {
            throw new Error("The return value is invalid.")
        }
        return true
    }

    //
    // getSpendableUtxos
    //
    public async testGetSpendableUtxos(): Promise<boolean> {
        const utxos = await this.walletProvider.getSpendableUtxos(undefined)
        if (utxos.length > 0 && !(utxos[0] instanceof Utxo)) {
            throw new Error("The return value is invalid.")
        }
        return true
    }

    //
    // getUnspendableUtxos
    //
    public async testGetUnspendableUtxos(): Promise<boolean> {
        try {
            await this.walletProvider.getUnspendableUtxos(
                "53212266f7994100e442f6dff10fbdb50a93121d25c196ce0597517d35d42e68" // This DAppId does not exist
            )
            throw new Error("Should throw an error when the DAppsId does not exist")
        } catch {
            return true
        }
    }

    //
    // sign
    //
    public async testSign(): Promise<boolean> {
        const address = await this.walletProvider.getAddresses(0, 1)[0]
        const result = await this.walletProvider.sign(
            address,
            "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d" // second argument is SHA1("hello")
        )
        if (typeof result !== "string") {
            throw new Error("The return value is invalid.")
          }
        return true
    }

    //
    // createSignedTx
    //
    public async testCreateSignedTx(): Promise<boolean> {
        const rawtx = await this.walletProvider.createSignedTx([
            {
                lockScript: "76a91467b2e55ada06c869547e93288a4cf7377211f1f088ac",
                amount: 10000
            }
        ])
        if (typeof rawtx !== "string") {
            throw new Error("The return value is invalid.")
          }
        return true
    }

    //
    // getProtocolVersion
    //
    public async testGetProtocolVersion(): Promise<boolean> {
        const version = await this.walletProvider.getProtocolVersion()
        if (!Number.isInteger(version) || version <= 0) {
            throw new Error("The return value is invalid.")
          }
        return true
    }

    //
    // getNetworkMagic
    //
    public async testGetNetworkMagic(): Promise<boolean> {
        const networkMagic = await this.walletProvider.getNetworkMagic()
        if (!Number.isInteger(networkMagic) || networkMagic <= 0) {
            throw new Error("The return value is invalid.")
          }
        return true
    }

    //
    // getFeePerByte
    //
    public async testGetFeePerByte(): Promise<boolean> {
        const feePerByte = await this.walletProvider.getFeePerByte()
        if (!Number.isInteger(feePerByte) || feePerByte <= 0) {
            throw new Error("The return value is invalid.")
          }
        return true
    }
}
