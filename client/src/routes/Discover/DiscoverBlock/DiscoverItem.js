import React from 'react';
import './styles/_discover-item.scss';
import {Link } from 'react-router-dom'

export default function DiscoverItem({ id, images, name, link }) {
  const itemUrl = link + '/' + id;
  return (
    <Link to={itemUrl}>
      <div className="discover-item animate__animated animate__fadeIn">
      <div
          className="discover-item__art"
          style={{ backgroundImage: `url(${images[0].url})` }}
        />
        <p className="discover-item__title">{name}</p>
      </div>
    </Link>
  );
}
