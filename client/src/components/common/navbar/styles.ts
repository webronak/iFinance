import styled from "styled-components";
import { Container, Button } from "@mui/material";
import { styled as muStyled } from "@mui/styles";
import { Link } from "react-router-dom";
import styledEngine from "@mui/styled-engine";

export const BrandName = styled.h1``;

export const NavbarContainer = muStyled(Container)({
  display: `flex !important`,
  padding: `2rem 0`,
  justifyContent: `space-between`,
});

export const LogoutButton = muStyled(Button)({
  marginLeft: `2rem !important`,
  borderColor: `red !important`,
  color: `red !important`,
});

export const StyleLink = styled(Link)`
  text-decoration: none;
`;
