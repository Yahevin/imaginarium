import styled, { css } from 'styled-components';

export const TriangleGrid = styled.div<{ columnWidth: number; rowCount: number }>`
  position: relative;
  z-index: 2;
  margin-left: ${(props) => `-${props.columnWidth / 2}px`};
  height: 100%;
  filter: brightness(linear-gradient(to right, 0, 100%));

  display: grid;
  grid-auto-columns: ${(props) => `${props.columnWidth / 2}px`};
  grid-template-rows: ${(props) => `repeat(${props.rowCount}, 1fr)`};
  grid-auto-flow: column;
`;

export const TriangleGrid__Item = styled.div<{ rowHeight: number; columnWidth: number; repeat: number }>`
  width: ${(props) => props.columnWidth + 1}px;
  height: ${(props) => props.rowHeight + 1}px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background: rgba(195, 0, 0, 1);
  transition-property: all;
  transition-duration: 0.4s;

  transform: scale(0);

  //COLORED
  &:nth-child(${(props) => Math.round(props.repeat * 1.8)}n) {
    opacity: 0.8;
  }
  &:nth-child(${(props) => Math.round(props.repeat * 3.3)}n) {
    opacity: 0.6;
  }
  &:nth-child(${(props) => Math.round(props.repeat * 7)}n) {
    opacity: 0.4;
  }
  &:nth-child(${(props) => Math.round(props.repeat * 4.6)}n) {
    opacity: 0.2;
  }
  &:nth-child(${(props) => Math.round(props.repeat * 1.8)}n) {
    background: rgba(153, 0, 0, 1);
  }
  &:nth-child(${(props) => Math.round(props.repeat * 2.2)}n) {
    background: rgba(153, 0, 0, 1);
    opacity: 0.9;
  }

  //HOVER EFFECT
  &&&.hovered {
    &-a {
      transition-delay: 0s;
      transform: scale(0.05);
    }
    &-b {
      transition-delay: 0.2s;
      transform: scale(0.2);
    }
  }
  &:nth-child(2n) {
    &&&.hovered {
      &-a {
        transition-delay: 0s;
        transform: scale(-0.05);
      }
      &-b {
        transition-delay: 0.2s;
        transform: scale(-0.2);
      }
    }
  }

  .visible & {
    transform: scale(1);
    //ROTATE

    &:nth-child(2n) {
      transform: scale(1, -1);
    }
  }
  .appeared && {
    transition-delay: 0.1s;
  }
`;

const Absolute = css`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const FckngGrid = styled.section`
  ${Absolute};
  position: fixed;
  z-index: 0;
`;

export const FckngGrid__BG = styled.img`
  ${Absolute};
  position: absolute;
  object-fit: cover;
`;
