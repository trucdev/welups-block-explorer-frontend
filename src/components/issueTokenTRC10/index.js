import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Form, Input, Button, InputNumber } from 'antd';
import styled from 'styled-components';
import {SwapOutlined} from '@ant-design/icons';

const Header = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	font-size: 20px;
	text-transform: uppercase;
`;
const SubHeader = styled.div`
	text-align: left;
	font-size: 17px;
`;
const Wrapper = styled.div`
	margin: 1.5% 0% 2% 2%;
`;
const StyleDivider = styled(Divider)`
    margin: 15px 0;
`;
const StyleInputNumber = styled(InputNumber)`
    width: 100%;
`;
const TitleLeft = styled.div`
	text-align:left;
	margin-bottom: 5px;
`;
const SpanRed = styled.span`
	color:red;
`;

class IssueTokenTRC10 extends Component{
	componentDidMount(){
	}

	render(){
		return (
			<div>
				<Header>Issue Token TRC10</Header>
				<Wrapper>
					<Form
				        layout="vertical"
				        name="basic"
				        initialValues={{
				        	remember: true,
				        }}
				        /*onFinish={onFinish}
				        onFinishFailed={onFinishFailed}*/
				    >
				    	<SubHeader>Basic Information</SubHeader>
						<StyleDivider/>
				    	<Row>
				    		<Col span={9}>
				    			<Form.Item
							        label="Token name:"
							        name="tokenName"
							        rules={[
							            {
								            required: true,
								            message: 'Please input your token name!',
								            min:2,
								            max:30
							            },
							        ]}
						        >
						        	<Input placeholder="2-30 characters for token name"/>
						        </Form.Item>
				    		</Col>
				    		<Col span={6}></Col>
				    		<Col span={9}>
				    			<Form.Item
							        label="Token abbreviation:"
							        name="tokenAbbr"
							        rules={[
							            {
								            required: true,
								            message: 'Please input your token abbreviation!',
								            min:2,
								            max:10
							            },
							        ]}
						        >
						        	<Input placeholder="2-10 characters for token abbreviation"/>
						        </Form.Item>
				    		</Col>
				    	</Row>
				    	<Row>
				    		<Col span={9}>
				    			<Form.Item
							        label="Token introduction:"
							        name="tokenIntro"
							        rules={[
							            {
								            required: true,
								            message: 'Please input your token introduction!',
								            max:200,
							            },
							        ]}
						        >
						        	<Input.TextArea placeholder="Brief description of the purpose of the token, not exceeding 200 characters" rows={4}/>
						        </Form.Item>
				    		</Col>
				    		<Col span={6}></Col>
				    		<Col span={9}>
				    			<Form.Item
							        label="Total Supply:"
							        name="totalSupply"
							        rules={[
							            {
								            required: true,
								            message: 'Please input your total supply!',
							            },
							        ]}
						        >
						        	<StyleInputNumber placeholder="Total token issuance(without precision)"/>
						        </Form.Item>
				    		</Col>
				    	</Row>
				    	<Row>
				    		<Col span={9}>
				    			<Form.Item
							        label="Precision:"
							        name="tokenPrecision"
							        rules={[
							            {
								            required: true,
								            message: 'Please input your token precision!',
							            },
							        ]}
						        >
						        	<StyleInputNumber placeholder="0-6"/>
						        </Form.Item>
				    		</Col>
				    		<Col span={6}></Col>
				    		<Col span={9}>
				    			<Form.Item
							        label="Issuer:"
							        name="issuer"
							        rules={[
							            {
								            required: true,
							            },
							        ]}
						        >
						        	<Input disabled placeholder="2-10 characters for token abbreviation"/>
						        </Form.Item>
				    		</Col>
				    	</Row>
				    	<SubHeader>Price Information</SubHeader>
						<StyleDivider/>
						<TitleLeft><SpanRed>*</SpanRed> Token price:</TitleLeft>
						<Row>
				    		<Col span={4}>
				    			<Form.Item
							        name="tokenPrice"
							        rules={[
							            {
								            required: true,
								            message: 'Token price cannot be empty!',
							            },
							        ]}
						        >
						        	<Input placeholder="Must be greater than zero"/>
						        </Form.Item>
				    		</Col>
				    		<Col span={1}><SwapOutlined /></Col>
				    		<Col span={4}>
				    			<Form.Item
							        name="trxPrice"
							        rules={[
							            {
								            required: true,
								            message: 'Token price cannot be empty!',
							            },
							        ]}
						        >
						        	<Input placeholder="Must be greater than zero"/>
						        </Form.Item>
				    		</Col>
				    	</Row>
				    	<SubHeader>Social Media Information</SubHeader>
						<StyleDivider/>
						<Row>
				    		<Col span={9}>
				    			<Form.Item
				    				label="Project offical website:"
							        name="websiteUrl"
							        rules={[
							            {
								            required: true,
								            message: 'Web URL is required!',
							            },
							        ]}
						        >
						        	<Input placeholder="Project offical website"/>
						        </Form.Item>
				    		</Col>
				    		<Col span={6}></Col>
				    		<Col span={9}>
				    			<Form.Item
				    				label="Email:"
							        name="email"
							        rules={[
							        	{
								            type: 'email',
								            message: 'The input is not valid E-mail!',
								        },
							            {
								            required: true,
								            message: 'Email is required!',
							            },
							        ]}
						        >
						        	<Input placeholder="Contact email"/>
						        </Form.Item>
				    		</Col>
				    	</Row>
				    	<Row>
				    		<Col span={9}>
				    			<Form.Item
				    				label="Link for GitHub:"
							        name="githubUrl"
						        >
						        	<Input placeholder="Link for GitHub"/>
						        </Form.Item>
				    		</Col>
				    		<Col span={6}></Col>
				    		<Col span={9}>
				    			<Form.Item
				    				label="Link for white paper:"
							        name="whitePaperUrl"
						        >
						        	<Input placeholder="Link for white paper"/>
						        </Form.Item>
				    		</Col>
				    	</Row>
				        <Form.Item >
				        	<Row>
				        		<Col span={22}></Col>
				        		<Col span={2}>
				        			<Button type="primary" htmlType="submit">
							            Submit
							        </Button>
				        		</Col>
				        	</Row>
				        </Form.Item>
				    </Form>
				</Wrapper>
			</div>	
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};

const mapDispatchToProps = (dispatch,props) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(IssueTokenTRC10);