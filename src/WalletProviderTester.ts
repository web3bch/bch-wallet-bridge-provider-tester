import IWalletProvider from "bch-wallet-bridge-provider-interface/lib/IWalletProvider"
import Utxo from "bch-wallet-bridge-provider-interface/lib/entities/Utxo"

class WalletProviderTester {
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
        return addresses.length === 10
    }

    //
    // getAddressIndex
    //
    public async testGetAddressIndex(): Promise<boolean> {
        const idx = await this.walletProvider.getAddressIndex(0, undefined)
        if (!Number.isInteger(idx) || idx >= 0 || idx > Math.pow( 2, 32 ) - 1) {
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

    //
    // sign
    //

    //
    // createSignedTx
    //

    //
    // getProtocolVersion
    //

    //
    // getNetworkMagic
    //

    //
    // getFeePerByte
    //
}
