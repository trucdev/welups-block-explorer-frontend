import  styled  from  'styled-components';

export const Table = styled.table`
	width : 100%;
	text-align: left;
`;

export const TableRow = styled.tr`
	height: 55px;
	border-top: 1px solid #EEEEEE;
`;

export const Th = styled.th`
    width:35%;
`;

export const BorderRed = styled.div`
	border-top: 2px solid red;
`;

export const FontFamily = styled.div`
	padding: 0 2%;
	font-family: PingFangSC-Regular;
	text-align: left;
`;

export const Div = styled.div`
	padding-top: 20px;
`;

export const Title = styled.div`
	font-weight: bold;
	font-size: 17px;
`;

export const Flex = styled.div`
	display: flex;
`;

export const RedSpan = styled.span`
    color:#c53027;  
    font-weight:bold;
`;

export const QuestionMark = styled.span`
	width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #d8d8d8;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
