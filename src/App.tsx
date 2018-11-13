import * as React from "react"
import "./App.css"

const App: React.SFC = () => (
  <div>
    <h1>BCH Wallet Bridge Provider Tester</h1>
    <TestTable tests={TESTS}/>
  </div>
)

interface ITestProps {
  name: string
  result: boolean
}

const TestRow: React.SFC<ITestProps> = (props: ITestProps) => (
  <tr>
    <td><button>{props.name}</button></td>
    <td>{props.result}</td>
  </tr>
)

interface ITestsProps {
  tests: ITestProps[]
}

const TestTable: React.SFC<ITestsProps> = (props: ITestsProps) => (
  <div>
    <button onClick={onTestButtonClicked()}>Start Tests</button>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>{props.tests.map(renderRow)}</tbody>
    </table>
  </div>
)

const renderRow = (test: ITestProps, idx: number) => (
  <TestRow key={idx} name={test.name} result={test.result} />
)

let TESTS = [
  {name: "test 1", result: false}
]

const onTestButtonClicked = () => () => {
  TESTS = [ {name: "test 2", result: false} ]
}

export default App
