import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockNum from './blockNum';
import BlockStatus from './blockStatus';
import BlockHash from './blockHash';
import BlockHeight from './blockHeight';
import BlockTime from './blockTime';
import BlockTransaction from './blockTransaction';
import BlockParentHash from './blockParentHash';
import BlockProducer from './blockProducer';
import BlockSize from './blockSize';
import BlockMenu from './blockMenu';
import * as action from '../../actions/block';
import { Row, Col } from 'antd';
import { Table, BorderRed, Div, FontFamily } from './style';
import { Skeleton } from 'antd';

class Block extends Component {
	componentDidMount() {
		var id = this.props.match.params.id;
		this.props.loadBlock(id);
		this.props.loadBlockTransaction(id);
	}

	render() {
		return (
			<div>
				<Skeleton loading={this.props.producer_hash === 0}>
					<Row>
						<Col>
							<h2>
								<h3>BLOCK</h3>
							</h2>
						</Col>
					</Row>
					<BorderRed>
						<FontFamily>
							<Row>
								<Col span={24}>
									<Div>
										<BlockNum />
										<Table>
											<tbody>
												<BlockStatus />
												<BlockHash />
												<BlockHeight />
												<BlockTime />
												<BlockTransaction />
												<BlockParentHash />
												<BlockProducer />
												<BlockSize />
											</tbody>
										</Table>
									</Div>
									<BorderRed>
										<BlockMenu />
									</BorderRed>
								</Col>
							</Row>
						</FontFamily>
					</BorderRed>
				</Skeleton>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		producer_hash: state.block.producer_hash,
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		loadBlockTransaction: (id) => {
			dispatch(action.loadBlockTransactionApi(id));
		},
		loadBlock: (id) => {
			dispatch(action.loadBlockApi(id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Block);