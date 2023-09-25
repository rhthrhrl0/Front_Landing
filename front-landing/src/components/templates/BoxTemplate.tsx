import React from 'react'
import styled from 'styled-components';

interface LoginTemplateProps{
    width: number;
    height: number;
    marginTop: number;
    marginBottom: number;
    children: React.ReactNode;
}

const BoxTemplate = ({children, width, height, marginTop, marginBottom}: LoginTemplateProps) => {
    const BoxTemplateBlock = styled.div`
      width: ${width}px;//512px;
      height: ${height}px;//308px;
      position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
      background: white;
      border-radius: 16px;
      border-color: #C6C6C6;
      border-style: solid;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

      margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

      margin-top: ${marginTop}px;//96px;
      margin-bottom: ${marginBottom}px;//32px;
      display: flex;
      flex-direction: column;
    `;

    return <BoxTemplateBlock className="Template">{children}</BoxTemplateBlock>
}

export default BoxTemplate