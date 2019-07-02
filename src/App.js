import React, { Component } from 'react';
import './App.css';
import Movie from "./Movie";

// 순서는 다음과 같습니다.
// 1. 데이터가 들어갈 틀을 그린다. --> render();
// 2. Component mount : 그림이 그려진 틀이 다 그려졌다.
// 3. Call API --> Response data (Movie data)
// 4. Fetched
// 5. 틀에 데이터를 넣는다!

class App extends Component {

  // 컴포넌트가 시작된다.
  // 스테이트 정의
  state = {
  }

  // 2. 그림이 그려진 틀이 다 그려졌다.
  componentDidMount() {
    // 3. 틀이 다 그려지면 이걸 실행? API Call
    this._getMovies();
  }

  _renderMovies = () => {
    // 5. 틀에 데이터를 넣는다.
    // 여기서 틀? Movie : 저거 하나
    // ** Javascript array (배열)의 map 이라는 method 검색!
    // movies에는 온갖 데이터가 쭉 들어있는데 배열 형식으로 들어있어
    // 그걸 알맞게 가공해서 적절한 틀에 뿌려주면 Movie 컴포넌트가 그려지는거야.
    const movies = this.state.movies.map(movie => {
      return <Movie
        title={movie.title}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies
  }

  // 3. API Call
  // ** async - await??? : 검색해봐
  _getMovies = async () => {
    // movie 라는 객체에 API로 부른 데이터 묶음을 다 때려박아~ https://yts.lt/api/v2/list_movies.json?sort_by=rating
    const movies = await this._callApi()

    // 4. fetched : 그 과정이 끝나면 state를 재 조정 : 원래는 빈값이었는데 데이터 묶음을 새로 넣는다.
    this.setState({
      movies
    })

    // 스테이트가 바뀌면 리액트는 자동으로 알아차리고 새로고침을 한다.
    // 여기서 말하는 새로고침은 컴포넌트 단위로 render()를 한다는 의미!
  }

  _callApi = () => {
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
      .then(potato => potato.json())
      .then(json => json.data.movies) // 여기의 data가 바로, 그 안에 movies가, 그 안에는 [] 배열 형식의 데이터
      .catch(err => console.log(err))
  }


  // 1. 데이터가 들어갈 틀을 그린다.
  render() {
    const { movies } = this.state;  // 처음에는 movie에 아무런 값이 없다. : Loading
    // 3 - 이후 : 그럼 movie에 새로운 데이터가 들어있겠지? : this._renderMovies
    console.log('movie?: ', movies);
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;