// src/styles/StyledComponents.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #2e2e2e;
`;

export const DropdownContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  padding: 8px;
  font-size: 14px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
`;

export const Button = styled.button`
  padding: 8px 12px;
  margin: 0 4px;
  font-size: 14px;
  background-color: #0077cc;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Loading = styled.div`
  font-size: 16px;
  color: #555;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;
