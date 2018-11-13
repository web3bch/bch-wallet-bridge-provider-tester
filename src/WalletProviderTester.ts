import IWalletProvider from "bch-wallet-bridge-provider-interface/lib/IWalletProvider"

class WalletProviderTester {
    constructor(public walletProvider: IWalletProvider) {}

    //
    // getVersion
    //

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

    //
    // getRedeemScripts
    //

    //
    // addRedeemScript
    //

    //
    // getSpendableUtxos
    //

    //
    // getUnspendableUtxos
    //

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
