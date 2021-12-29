import React from 'react';
import './index.css';
import { VideoType } from '../../../contexts/type';

export type ItemProp = {
  data: VideoType;
}

function Item({ data }: ItemProp) {
  const { snippet } = data;
  const { title, description, thumbnails } = snippet;
  const { medium: image} = thumbnails;
  return (
    <div className='Item-video'>
      <img
        className='Item-video-image'
        alt={title}
        src={image.url}
        width={image.width}
        height={image.height}
      />
      <div className='Item-video-data'>
        <div className='Item-video-title'>{ title }</div>
        <div>{ description }</div>
      </div>
    </div>
  )
}

export default Item;