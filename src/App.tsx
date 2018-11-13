import * as React from "react"
import "./App.css"
import { Button, Container, Step, Icon, Header, Segment, Table, Loader, Message } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import WalletProviderTester from "./WalletProviderTester"
import update from "immutability-helper"

interface ITestResult {
  name: string
  isSuccessed?: boolean
  message?: string,
  isTesting?: boolean
}

enum TestingState {
  WAITING = "Waiting",
  TESTING = "Testing",
  COMPLETED = "Completed"
}

interface IAppState {
  testingState: TestingState,
  testResults: ITestResult[],
  message?: string
}

export default class App extends React.Component<{}, IAppState> {
  private tester?: WalletProviderTester

  constructor(props: {}) {
    super(props)

    const bitcoincash = (window as any).bitcoincash
    if (bitcoincash) {
      const wallet = bitcoincash.wallet
      if (wallet) {
        this.tester = new WalletProviderTester(wallet)
      }
    }

    // TODO: fix
    const tests: ITestResult[] = [
      {name: "testGetVersion"},
      {name: "testGetAddresses"},
      {name: "testGetAddressIndex"},
      {name: "testGetRedeemScripts"},
      {name: "testAddRedeemScripts"},
      {name: "testGetSpendableUtxos"},
      {name: "testGetUnspendableUtxos"},
      {name: "testSign"},
      {name: "testCreateSignedTx"},
      {name: "testGetProtocolVersion"},
      {name: "testGetNetworkMagic"},
      {name: "testGetFeePerByte"}
    ]
    this.state = {
      testingState: TestingState.WAITING,
      testResults: tests
    }
  }

  public render() {
    return (
      <Container>
        <Header as="h1">BCH Wallet Bridge Provider Tester</Header>
        <Message positive={this.tester !== undefined} negative={!this.tester}>
          {this.tester ? "window.bitcoincash.wallt is injected." : "window.bitcoincash.wallet is not injected!"}
       </Message>
        <TestingSteps testingState={this.state.testingState} />
        <Button
          fluid={true}
          primary={true}
          disabled={!this.tester || this.state.testingState === TestingState.TESTING}
          loading={this.state.testingState === TestingState.TESTING}
          onClick={this.onTestButtonClicked}
        >
          Start
        </Button>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Result</Table.HeaderCell>
              <Table.HeaderCell>Message</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.testResults.map(this.renderResult)}
          </Table.Body>
        </Table>
      </Container>
    )
  }

  private renderResult = (result: ITestResult, idx: number) => (
    <TestResultRow key={idx} result={result} />
  )

  private onTestButtonClicked = async () => {
    if (!this.tester) {
      return
    }

    this.setState({
      testingState: TestingState.TESTING
    })

    await Promise.all(this.state.testResults.map((test, idx) => new Promise(async (resolve) => {
      this.setState({
        testResults: update(this.state.testResults, {[idx]: {isTesting: {$set: true}}})
      })
      await this.tester!![test.name]().then(() => {
        this.setState({
          testResults: update(this.state.testResults, {[idx]: {isSuccessed: {$set: true}}})
        })
      }).catch((e: Error) => {
        this.setState({
          testResults: update(this.state.testResults, {[idx]: {isSuccessed: {$set: false}, message: {$set: e.message}}})
        })
      })
      this.setState({
        testResults: update(this.state.testResults, {[idx]: {isTesting: {$set: false}}})
      })
      resolve()
    })))

    this.setState({
      testingState: TestingState.COMPLETED
    })
  }
}

interface ITestResultRowProps {
  result: ITestResult
}

const TestResultRow: React.SFC<ITestResultRowProps> = (props: ITestResultRowProps) => (
  <Table.Row>
    <Table.Cell>{props.result.name}</Table.Cell>
    <Table.Cell>
      {props.result.isTesting ? <Loader active={true} inline={true} /> : renderIsSuccessed(props.result)}
    </Table.Cell>
    <Table.Cell>{props.result.isTesting ? <Loader active={true} inline={true} /> : props.result.message}</Table.Cell>
  </Table.Row>
)

const renderIsSuccessed =
  (result: ITestResult) => (result.isSuccessed !== undefined ? (result.isSuccessed ? "o" : "x") : undefined)

interface ITestingStepsProps {
  testingState: TestingState
}

const TestingSteps: React.SFC<ITestingStepsProps> = (props: ITestingStepsProps) => (
  <Segment>
    <Step.Group widths={3}>
      <Step
        active={props.testingState === TestingState.WAITING}
        disabled={props.testingState !== TestingState.WAITING}
      >
        <Icon name="list" />
        <Step.Content>
          <Step.Title>{TestingState.WAITING}</Step.Title>
        </Step.Content>
      </Step>
      <Step
        active={props.testingState === TestingState.TESTING}
        disabled={props.testingState !== TestingState.TESTING}
      >
        <Icon name="wait" />
        <Step.Content>
          <Step.Title>{TestingState.TESTING}</Step.Title>
        </Step.Content>
      </Step>
      <Step
        active={props.testingState === TestingState.COMPLETED}
        disabled={props.testingState !== TestingState.COMPLETED}
      >
        <Icon name="flag checkered" />
        <Step.Content>
          <Step.Title>{TestingState.COMPLETED}</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  </Segment>
)
