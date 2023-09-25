import React from 'react'
import styled from 'styled-components';

interface LoginTemplateProps{
    content: string;
    size: number;
    color: string;
    justify: string,
    direction: string,
    marginTop: number
}

const FontTemplate = ({content, size, color, justify, direction, marginTop}: LoginTemplateProps) => {
    const FontStyleBlock = styled.div`
      font-size: ${size}px;
      color: ${color};
      justify-content: ${justify};
      flex-direction: ${direction};
      display: flex;
      align-items: ${justify};
      margin-top: ${marginTop}px;
    `;

    return <FontStyleBlock className="font">{content}</FontStyleBlock>
}

export default FontTemplate