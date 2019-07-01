import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 0 30px;
  justify-content: flex-end;
  align-items: center;
`;

export const Profile = styled.View`
  flex-direction: row;
  margin-left: 15px;
  align-items: center;
`;

export const Content = styled.View`
  margin-top: ${25 * 0.7};
  margin-bottom: 10px;
  flex: 1;
  padding: 0 10px;
  justify-content: space-between;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;
