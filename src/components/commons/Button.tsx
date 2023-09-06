import { ButtonContainer, StyledBiSearch } from '../../styles/SearchButton';

interface ButtonProps {
	onClick: () => void;
}

function Button({ onClick }: ButtonProps) {
	return (
		<ButtonContainer onClick={onClick}>
			<StyledBiSearch />
		</ButtonContainer>
	);
}
export default Button;
