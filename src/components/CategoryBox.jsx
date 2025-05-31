import styled from 'styled-components';
import '../index.css';

const CategoryItem = styled.button`
  width: 62px;
  height: auto;
  align-items: center;
  text-align: center;
  white-space: nowrap;

  font-weight: normal;
  font-size: 11px;
  color: ${({ $selected, $selectedColor }) =>
    $selected ? $selectedColor : '#6E6E6E'};
  background-color: #242424;
  border: 1px solid
    ${({ $selected, $selectedBorder }) =>
      $selected ? $selectedBorder : '#6E6E6E'};
  border-radius: 50px;
  padding: 2px 14px;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ $hoverColor }) => $hoverColor};
    background-color: #242424;
    border: solid 1px ${({ $hoverBorder }) => $hoverBorder};
  }
`;

const CateArrow = styled.div`
  display: flex;
  gap: 10px;
  white-space: nowrap;
`;

function CategoryBox(props) {
  const { selectedCategory, setCategory, categories, colorThemes } = props;

  return (
    <CateArrow>
      {categories.map((category, index) => {
        const theme = colorThemes[category] || {
          color: '#acd3a8',
          border: '#8ab2a6',
        }; // 기본 테마

        return (
          <CategoryItem
            key={index}
            $selected={selectedCategory === category}
            $selectedColor={theme.color}
            $selectedBorder={theme.border}
            $hoverColor={theme.color}
            $hoverBorder={theme.border}
            onClick={() => setCategory(category)}
          >
            {`<${category}>`}
          </CategoryItem>
        );
      })}
    </CateArrow>
  );
}

export default CategoryBox;
