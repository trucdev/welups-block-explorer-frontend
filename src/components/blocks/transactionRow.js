import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, BadgeGreen, BadgeRed, Td} from './style';
import {Badge} from 'antd';
import {Link} from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

class TransactionRow extends Component{
	render(){
		let {transac} = this.props;
		let confirm = 19;
		return (
			<TableRow>
				<Td>
					<Link to={"/transaction/"+transac.hash} target="_blank">{transac.hash}</Link>
				</Td>
				<td>
					{confirm>=19?<BadgeGreen count="CONFIRMED"/>:<BadgeRed count="UNCOMFIRMED"/>}
				</td>
				<td>
					<span><ReactTimeAgo date={transac.timestamp?transac.timestamp:0} locale="en-US"/></span>
				</td>
				<td>
					<span>{transac.type}</span>
				</td>
			</TableRow>		
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(TransactionRow);