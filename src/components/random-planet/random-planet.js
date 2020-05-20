import React, { Component } from 'react';

import './random-planet.css';

import SwService from '../../services/swapi'

import Spinner from '../spinner'

import ErrorIndicator from '../error-indicator'

export default class RandomPlanet extends Component {

  swapiService = new SwService()

/*Характеристики планеты */
  state = { planet:{},
            loading: true,
            error: false
          }

  // constructor(){
  //   super()
  //   this.updatePlanet()
  //   setInterval(this.updatePlanet, 1500)
  // } Убираем всё из конструктора и переносим в componentDidMount -
  // Это более правильно с точки зреня ООП и React, т.к. мы убираем 
  // из него сетевой доступ и побочные эффекты

  componentDidMount(){
      this.updatePlanet()
      this.interval = setInterval(this.updatePlanet, 1500)
  }//вызывается перед тем, как компонент будет удалён для очиски ресурсов

  componentWillUnmount(){
    clearInterval(this.interval)
  }

    onPlanetLoaded = (planet) => {
    this.setState({planet,
                  loading: false})
  }//EventList

  updatePlanet = () => {
    const id = Math.floor(Math.random()*25 + 2)
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch (this.onError)
  }

  //Обработка ошибок
  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  render() {

    const {planet, loading, error} = this.state

    const hasData = !(loading || error)
    const errorMess = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <PlanetView planet = {planet}/> : null

    // if (loading)
    // {
    //   return <Spinner/>
    // }

    

    return (
      <div className="random-planet jumbotron rounded" >
        {errorMess}
        {spinner}
        {content}
        
      </div>

    );
  }
}


const PlanetView = ({planet}) => {

  const {id, name, population, rotationPeriod, diametr } = planet

  return (
      <React.Fragment>
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
      </React.Fragment>
  )
}