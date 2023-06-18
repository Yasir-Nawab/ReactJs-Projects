import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class Newscomponent extends Component {
    static defaultProps = {
        country:"us",
        catagory:"business",
        pageSize:9,
    }

    static propTypes = {
        country : PropTypes.string,
        catagory : PropTypes.string,
        pageSize : PropTypes.number
    }
   
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading : true,
            page:1,
            totalResults: 0
        }
        document.title = `${this.CapitalizeFirstLetter(this.props.catagory)} - NewsLog`
    }

    CapitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews()
    {
        // this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=e98c23d2e1674d69b40e215991b0cefb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({loading:false, articles : parsedData.articles, totalResults:parsedData.totalResults});
        // this.props.setProgress(100);
    }

    async componentDidMount()
    {
        this.updateNews();
    }

    handlePreviousClick = async() =>
    {
        this.setState({page:this.state.page - 1});
        this.updateNews();
    }

    handleNextClick = async() =>
    {
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
        {
            this.setState({page:this.state.page + 1});
            this.updateNews();
        }
    }

    fetchMoreData = async() =>{
        this.setState({page:this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=e98c23d2e1674d69b40e215991b0cefb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading:false,
            articles : this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults
        });
    }
        






  render() {
    return (
        <>
            <h1 className='text-center' style={{margin:'35px 0px'}}>NewsLog - Top Headlines From {this.CapitalizeFirstLetter(this.props.catagory)}</h1>
            {this.state.loading && <Loading/>}
            <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loading/>}
            >
                <div className="container">
                    <div className="row">
                        {this.state.articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://cdn.ndtv.com/common/images/ogndtv.png"} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className='btn btn-dark' onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
    )
  }
}
