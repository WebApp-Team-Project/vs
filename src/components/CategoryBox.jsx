import styled from "styled-components";
import { useState, useEffect } from 'react';
import '../index.css'

const CategoryItem = styled.button`
    width: auto;
    height: auto;
    align-items: center;
    text-align: center;

    font-weight: normal;
    font-size: 11px;
    color: ${props => props.selected ? props.hoverColor : '#6E6E6E'};
    background-color: #242424;
    border: 1px solid ${props => props.selected ? props.selectedBorder : '#6E6E6E'};
    border-radius: 50px;
    padding: 2px 14px;

    cursor: pointer;

    &:hover{
        color: ${props => props.hoverColor};
        background-color: #242424;
        border: solid 1px ${props => props.hoverBorder};
    }
`

const CateArrow = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`

function CategoryBox(props){
    const categories = props.categories || ["<전체>", "<학교>", "<연애>", "<음식>", "<일상>"];
    
    // 기본 색상 테마 정의
    const defaultColorThemes = {
        "<전체>": { color: "var(--blue--color)", border: "var(--blue--color)" },
        "<학교>": { color: "var(--green--color)", border: "var(--green--color)" },
        "<연애>": { color: "var(--pink--color)", border: "var(--pink--color)" },
        "<음식>": { color: "var(--yellow--color)", border: "var(--yellow--color)" },
        "<일상>": { color: "#8EE060", border: "#8EE060" },
    };
    
    // props로 색상 테마를 받을 수 있도록 함 (없으면 기본값 사용)
    const colorThemes = props.colorThemes || defaultColorThemes;
    
    // 기본 선택 카테고리도 props로 받을 수 있도록 함
    const defaultCategory = props.defaultCategory || categories[0];
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
    
    useEffect(() => {
        if (props.onChange) {
            props.onChange(defaultCategory);
        }
    }, [props.onChange, defaultCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        
        if (props.onChange) {
            props.onChange(category);
        }
    }

    return(
        <CateArrow>
            {categories.map((category, index) => {
                const theme = colorThemes[category] || { color: "#acd3a8", border: "#8ab2a6" }; // 기본 테마
                
                return (
                    <CategoryItem  
                        key={index} 
                        selected={selectedCategory === category} 
                        selectedColor={theme.color}
                        selectedBorder={theme.border}
                        hoverColor={theme.color}
                        hoverBorder={theme.border}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </CategoryItem>
                );
            })}
        </CateArrow>
    )
}

export default CategoryBox