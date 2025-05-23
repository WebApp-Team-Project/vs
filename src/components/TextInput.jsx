import styled from 'styled-components'
import '../index.css'

const StyledTextArea = styled.textarea`
    background-color: #202020;
    width: 353px;
    height: ${props=>props.height}px;
    display: block;
    border: 1px solid #515151;
    border-radius: 6px;
    font-size: 11px;
    font-weight: regular;
    padding: 10px 12px;
    color: #525252;
    
    resize: none;
    overflow: hidden;
    placeholder: ${props=>props.text};

    &::placeholder {
        color: #525252;
    }

    &:focus {
        outline: none;
        border: 1px solid #7D7D7D;
        color: #D9D9D9;
    }

    &:focus::placeholder {
        color: #7D7D7D;
    }
`

function TextInput(props){
    // height: 높이, value & onChange: 제어 컴포넌트용
    const {height, value, onChange, text} = props

    return (
        <StyledTextArea height={height || 34} placeholder={text || "입력하세요"} value={value} onChange={onChange}></StyledTextArea>
    )
}

export default TextInput

