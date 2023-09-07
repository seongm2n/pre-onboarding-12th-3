import SearchSick from '../components/search/SearchSick';
import {
	MainContainer,
	TextContainer,
	TextSearchContainer,
} from '../styles/LayOutStyle';

function Main() {
	return (
		<MainContainer>
			<TextSearchContainer>
				<TextContainer>
					<p>
						국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
					</p>
					<SearchSick
						useCache={false}
						query={''}
					/>
				</TextContainer>
			</TextSearchContainer>
		</MainContainer>
	);
}

export default Main;
