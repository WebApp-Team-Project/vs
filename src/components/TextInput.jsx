import styled from 'styled-components'

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
    color: #d9d9d9;
    
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

const SelectTextArea = styled(StyledTextArea)`
    width: 321px;
    height: 34px;
    background-color: #505050;
    border: 1px solid #6e6e6e;
`

function TextInput(props){
    // height: 높이, value & onChange: 제어 컴포넌트용
    const {height, value, onChange, text} = props

    const type = props.type || "origin"
    if(type === "origin"){
        return <StyledTextArea height={height || 34} placeholder={text || "입력하세요"} value={value} onChange={onChange}>
        </StyledTextArea>
    }else if(type === "select"){
        return <SelectTextArea placeholder={text || " "} value={value} onChange={onChange}>
        </SelectTextArea>
    }
}

export default TextInput

