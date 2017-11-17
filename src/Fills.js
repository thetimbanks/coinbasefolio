import React, { Component } from 'react';
import { Table, Icon, Input } from 'semantic-ui-react';
import _ from 'lodash';

const products = ["BTC-USD", "ETH-USD", "LTC-USD"];
const coinbaseFills = [
  {
    created_at: "2017-09-08T13:30:06.208Z",
    fee: "3.67",
    liquidity: "T",
    order_id: "1",
    price: "4197.17",
    product_id: "BTC-USD",
    profile_id: "a18d22df-abc1-464d-80db-774fc08a1a90",
    settled: true,
    side: "buy",
    size: "0.05868953",
    user_id: "59acbc2cd0190f02aa06a3e6",
  },
  {
    created_at: "2017-09-04T13:30:06.208Z",
    fee: "19.18",
    liquidity: "T",
    order_id: "2",
    price: "325.92",
    product_id: "ETH-USD",
    profile_id: "a18d22df-abc1-464d-80db-774fc08a1a90",
    settled: true,
    side: "buy",
    size: "1.47526322",
    user_id: "59acbc2cd0190f02aa06a3e6",
  },
  {
    created_at: "2017-09-08T13:30:06.208Z",
    fee: "4.45",
    liquidity: "T",
    order_id: "3",
    price: "298.36",
    product_id: "ETH-USD",
    profile_id: "a18d22df-abc1-464d-80db-774fc08a1a90",
    settled: true,
    side: "buy",
    size: "1",
    user_id: "59acbc2cd0190f02aa06a3e6",
  },
  {
    created_at: "2017-09-06T13:30:06.208Z",
    fee: "2.99",
    liquidity: "T",
    order_id: "4",
    price: "80.28",
    product_id: "LTC-USD",
    profile_id: "a18d22df-abc1-464d-80db-774fc08a1a90",
    settled: true,
    side: "buy",
    size: "1.24564957",
    user_id: "59acbc2cd0190f02aa06a3e6",
  },
  {
    created_at: "2017-09-08T13:30:06.208Z",
    fee: "2.99",
    liquidity: "T",
    order_id: "5",
    price: "70.23",
    product_id: "LTC-USD",
    profile_id: "a18d22df-abc1-464d-80db-774fc08a1a90",
    settled: true,
    side: "buy",
    size: "2",
    user_id: "59acbc2cd0190f02aa06a3e6",
  },
  {
    created_at: "2017-09-09T13:30:06.208Z",
    fee: "5.15",
    liquidity: "T",
    order_id: "6",
    price: "69.17",
    product_id: "LTC-USD",
    profile_id: "a18d22df-abc1-464d-80db-774fc08a1a90",
    settled: true,
    side: "buy",
    size: "5",
    user_id: "59acbc2cd0190f02aa06a3e6",
  }
];

class Fills extends Component {
  state = {
    fills: coinbaseFills,
    "BTC-USD": 0,
    "LTC-USD": 0,
    "ETH-USD": 0,
    "market-BTC-USD": 0,
    "market-LTC-USD": 0,
    "market-ETH-USD": 0,
    cost: 0,
    value: 0,
  };

  componentWillMount() {
    this.getFills();
    this.getMarketPrices();
  }

  getFills() {
    fetch('/api/fills').then(response => {
      return response.json();
    }).then(fills => {
      this.setState({
        fills: _.concat(fills, this.state.fills)
      });
    });
  }

  getMarketPrices() {
    fetch('/api/ticker/btc').then(response => {
      return response.json();
    }).then(ticker => {
      this.setState({
        "BTC-USD": parseFloat(ticker.price),
        "market-BTC-USD": parseFloat(ticker.price),
      });
    });

    fetch('/api/ticker/ltc').then(response => {
      return response.json();
    }).then(ticker => {
      this.setState({
        "LTC-USD": parseFloat(ticker.price),
        "market-LTC-USD": parseFloat(ticker.price)
      });
    });

    fetch('/api/ticker/eth').then(response => {
      return response.json();
    }).then(ticker => {
      this.setState({
        "ETH-USD": parseFloat(ticker.price),
        "market-ETH-USD": parseFloat(ticker.price)
      });
    });
  }

  changeBTC(event, data) {
    const value = data.value ? parseFloat(data.value) : this.state["market-BTC-USD"]
    this.setState({
      "BTC-USD": value
    });
  }

  changeETH(event, data) {
    const value = data.value ? parseFloat(data.value) : this.state["market-ETH-USD"]
    this.setState({
      "ETH-USD": value
    });
  }

  changeLTC(event, data) {
    const value = data.value ? parseFloat(data.value) : this.state["market-LTC-USD"]
    this.setState({
      "LTC-USD": value
    });
  }

  render() {
    const groupedFills = _.groupBy(this.state.fills, 'product_id');

    return (
      <div>
        <h2>Market Price</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>BTC</Table.HeaderCell>
              <Table.HeaderCell>ETH</Table.HeaderCell>
              <Table.HeaderCell>LTC</Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>

          <Table.Body>
             <Table.Row>
                <Table.Cell>{this.state["market-BTC-USD"]}</Table.Cell>
                <Table.Cell>{this.state["market-ETH-USD"]}</Table.Cell>
                <Table.Cell>{this.state["market-LTC-USD"]}</Table.Cell>
                <Table.Cell><Icon name="refresh" onClick={this.getMarketPrices.bind(this)}/></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><Input onChange={this.changeBTC.bind(this)} /></Table.Cell>
                <Table.Cell><Input onChange={this.changeETH.bind(this)} /></Table.Cell>
                <Table.Cell><Input onChange={this.changeLTC.bind(this)} /></Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
          </Table.Body>
        </Table>

        {
          products.map(product => {
            let cost = 0;
            let value = 0;

            return groupedFills[product] && (
              <div key={product}>
                <h2>{product}</h2>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Size</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell>Fee</Table.HeaderCell>
                      <Table.HeaderCell>Cost</Table.HeaderCell>
                      <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      _.map(groupedFills[product], fill => {
                        const fillCost = (parseFloat(fill.size) * parseFloat(fill.price)) + parseFloat(fill.fee);
                        const fillValue = parseFloat(fill.size) * parseFloat(this.state[fill.product_id]);
                        if (fill.side === 'buy') {
                          cost += fillCost
                          value += fillValue
                        } else {
                          cost -= fillCost
                          value -= fillValue
                        }
                        return (
                          <Table.Row className={fill.side} key={fill.order_id}>
                            <Table.Cell>{fill.created_at}</Table.Cell>
                            <Table.Cell>{fill.size}</Table.Cell>
                            <Table.Cell>{parseFloat(fill.price).toFixed(2)}</Table.Cell>
                            <Table.Cell>{parseFloat(fill.fee).toFixed(2)}</Table.Cell>
                            <Table.Cell>{parseFloat(fillCost).toFixed(2)}</Table.Cell>
                            <Table.Cell>{parseFloat(fillValue).toFixed(2)}</Table.Cell>
                          </Table.Row>
                        );
                      })
                    }
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                      <Table.HeaderCell>{_.sum(_.map(_.map(_.filter(groupedFills[product], ['side', 'buy']), 'size'), parseFloat)) - _.sum(_.map(_.map(_.filter(groupedFills[product], ['side', 'sell']), 'size'), parseFloat))}</Table.HeaderCell>
                      <Table.HeaderCell>{parseFloat(_.mean(_.map(_.map(groupedFills[product], 'price'), parseFloat))).toFixed(2)}</Table.HeaderCell>
                      <Table.HeaderCell>{parseFloat(_.sum(_.map(_.map(groupedFills[product], 'fee'), parseFloat))).toFixed(2)}</Table.HeaderCell>
                      <Table.HeaderCell>{parseFloat(cost).toFixed(2)}</Table.HeaderCell>
                      <Table.HeaderCell>{parseFloat(value).toFixed(2)}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
                <span/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Fills;
