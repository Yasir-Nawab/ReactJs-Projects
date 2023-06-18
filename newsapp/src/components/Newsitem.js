import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title, description,imageUrl, newsUrl, date, author, source} = this.props;
    return (
        <div className="card my-3">
            <span className="badge rounded-pill bg-danger" style={{display: 'flex', justifyContent: 'center', position: 'absolute', right: '0', top: '0'}}>{source}</span>
            <div className="card-img">
                <img src={imageUrl} alt="No img"/>
            </div>
            <div className="card-write">
                <h2>{title}</h2>
                <p>{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"}<br/>{new Date(date).toGMTString()}</small></p>
            </div>
            <div className="card-button">
                <a href={newsUrl} rel="noreferrer" target="_blank"><button className="btn btn-sm btn-dark" >Read More</button></a>
            </div>
        </div>
    )
  }
}