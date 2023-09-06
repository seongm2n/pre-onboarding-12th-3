import SearchSick from '../components/search/SearchSick';

function Main() {
	return (
		<div>
			<div>
				<div>
					<p>
						국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
					</p>
					{/* 이미지 추가하려면 하기 */}
				</div>
				<div>
					<SearchSick />
				</div>
			</div>
		</div>
	);
}

export default Main;
