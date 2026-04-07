import React from 'react'
import image from '../assets/An image with the wo.png'


const NewsItem = ({title,description,src,url}) => {
  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{maxWidth:"345px", boxShadow:"10px 30px 40px purple" }}>
  <img src={src?src:image} style={{height:"200px",width:"330px"}} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title.slice(0,50)}</h5>
    <p className="card-text">{description?description.slice(0,90):"NewsNova brings you real-time headlines with clarity and speed, offering dynamic categories, seamless navigation, and a modern, engaging news experience."}</p>
    <a href={url} className="btn btn-primary">Read More</a>
  </div>
</div>
  )
}

export default NewsItem
