import React, {Component} from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
   static defaultProps ={
    country:'in',
    pageSize: 8,
    category: 'general',
   }

   static propTypes = {
     country: PropTypes.string,
     pageSize: PropTypes.number,
     category: PropTypes.string,
   }
    capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsDaily`;
    }

    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc5c22e797c64eecbe38a3332c0e8652&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles:parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

    async componentDidMount(){
        /*let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc5c22e797c64eecbe38a3332c0e8652&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles, totalResults: parsedData.totalResults, loading: false})*/
        this.updateNews();
    }

    handlePrevClick = async ()=>{
      /*console.log("Previous");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc5c22e797c64eecbe38a3332c0e8652&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })*/
      this.setState({page: this.state.page - 1});
      this.updateNews()
    }

    handleNextClick = async ()=>{
      /*console.log("next");
     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc5c22e797c64eecbe38a3332c0e8652&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })*/
    //}
      this.setState({page: this.state.page + 1});
      this.updateNews()
  }
          fetchMoreData = async () => {
          this.setState({page: this.state.page + 1})
          const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc5c22e797c64eecbe38a3332c0e8652&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles:this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
          
        };
    render() {
        return(
            <>
              <h2 className="text-center" style={{margin:'35px 0px', marginTop: '90px'}}>NewsDaily - To {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
               {this.state.loading && <Spinner/>}
              <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
              >
                <div className="container">
                <div className="row">
                    {this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <Newsitems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,80):""} 
                            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                    })}
                   </div>
                   </div>
                   </InfiniteScroll>
                   {/*<div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                  </div>*/}
            </>
        )
    }
}

export default News