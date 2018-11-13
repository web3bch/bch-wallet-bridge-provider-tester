import IWalletProvider from "bch-wallet-bridge-provider-interface/lib/IWalletProvider"
import Utxo from 'bch-wallet-bridge-provider-interface/lib/entities/Utxo';

class WalletProviderTester {
    constructor(public walletProvider: IWalletProvider) {}

    //
    // getVersion
    //
    public testGetVersion(): Promise<boolean> {
        return this.walletProvider
        .getVersion()
        .then((version) => {
            if (typeof version !== "string") {
              throw new Error("The return value is invalid.")
            }
            return true
        })
    }

    //
    // getAddresses
    //
    public testGetAddresses(): Promise<boolean> {
        return this.walletProvider
        .getAddresses(0, 10, 0, undefined)
        .then((addresses) => {
            const address = addresses[0]
            if (typeof address !== "string") {
              throw new Error("The return value is invalid.")
            }
            return addresses.length === 10
        })
    }

    //
    // getAddressIndex
    //
    public testGetAddressIndex(): Promise<boolean> {
        return this.walletProvider
        .getAddressIndex(0, undefined)
        .then((idx) => {
            if (!Number.isInteger(idx) || idx >= 0 || idx > Math.pow( 2, 32 ) - 1) {
              throw new Error("The return value is invalid.")
            }
            return true
        })
    }

    //
    // getRedeemScripts
    //
    public testGetRedeemScripts(): Promise<boolean> {
        return this.walletProvider
        .getRedeemScripts(undefined)
        .then((redeemScripts) => {
            if (redeemScripts.length > 0 && typeof redeemScripts[0] !== "string") {
              throw new Error("The return value is invalid.")
            }
            return true
        })
    }

    //
    // addRedeemScript
    //
    public testAddRedeemScripts(): Promise<boolean> {
        return this.walletProvider
        .addRedeemScript("76a914925d4028880bd0c9d68fbc7fc7dfee976698629c88ac", undefined)
        .then((result) => {
            return true
        })
    }

    //
    // getSpendableUtxos
    //
    public testGetSpendableUtxos(): Promise<boolean> {
        return this.walletProvider
        .getSpendableUtxos(undefined)
        .then((utxos) => {
            if (utxos.length > 0 && utxos[0] instanceof Utxo) {
                throw new Error("The return value is invalid.")
            }
            return true
        })
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
