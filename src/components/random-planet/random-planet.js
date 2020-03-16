import React, { Component } from 'react';

import './random-planet.css';

import SwService from '../../services/swapi'

export default class RandomPlanet extends Component {

  swapiService = new SwService()

/*Характеристики планеты */
  state = {
    id: null,
    name: null,
    population: null,
    rotationPeriod: null,
    diametr: null
  }

  constructor(){
    super()
    this.updatePlanet()
  }

  updatePlanet(){
    const id = Math.floor(Math.random()*25 + 2)
    this.swapiService
      .getPlanet(id)
      .then((planet) =>{
        this.setState({
          id,
          name: planet.name,
          population: planet.population,
          rotationPeriod: planet.rotation_period,
          diametr: planet.diameter
        })
      })
  }

  render() {

    const {id, name, population, rotationPeriod, diametr} = this.state

    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diametr</span>
              <span>{diametr}</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
