import styled from 'styled-components/native';

export default styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border: 1px solid #dbdbdb;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5;
  background: ${(props) => props.color || '#dbdbdb'};
`;
