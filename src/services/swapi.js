//Класс клиент приложения
export default class SwService {

    _apiBase = 'https://swapi.co/api'

    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`)
    
        if (!res.ok){
            throw new Error(`Could not fetch ${url}` + 
                        `, recived ${res.status}`)
        }
    
        return await res.json()
    
    
       //return body
    }
    /*Получение списка персонажей */
    async getAllPeople(){

        const res = await this.getResourse(`/people/`)
        return res.results.map(this._transformPerson)
    }

    async getPerson(id) {
         const person = await this.getResourse(`/people/${id}/`)
         return this._transformPerson(person)
     }

     /*Получение списка планет */
     async getAllplanet(){

        const res = await this.getResourse(`/planets/`)
        return res.results.map(this._transformPlanet)
    }

    async getPlanet(id) {
         const planet = await this.getResourse(`/planets/${id}/`)
         return this._transformPlanet(planet)
     }

     /*Получение списка космич кораблей */
     async getAllStarships(){

        const res = await this.getResourse(`/starships/`)
        return res.results.map(this._transformStarship)
    }

    async getStarship(id) {
         const starship = this.getResourse(`/starships/${id}/`)   
         return this._transformStarship(starship)
     }

     /*Трансформация данных */
     /*Получение id из URL */
     _extractId(item){
        const idRegExp = /\/([0-9]*)\/$/
        return item.url.match(idRegExp)[1]
     }

     _transformPlanet(planet){
        
         return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diametr: planet.diameter
          }
     }

     _transformPerson(person){
        
        return {
           id: this._extractId(person),
           name: person.name,
           gender: person.gender,
           birthYear: person.birth_year,
           eyeColor: person.eye_color
         }
    }

    _transformStarship(starship){
        
        return {
           id: this._extractId(starship),
           name: starship.name,
           model: starship.model,
           manufacturer: starship.manufacturer,
           costInCredits: starship.cost_in_credits,
           length: starship.length,
           crew: starship.crew,
           passengers: starship.passengers,
           cargoCapacity: starship.cargo_capacity
         }
    }
}

const swapi = new SwService()

swapi.getAllPeople().then((people) =>{
    people.forEach((p) => {
        console.log(p.name)
    })
})
//Получение данных с сервера функция

// getResourse('https://swapi.co/api/people/1245/')
//     .then ((body) => {
//         console.log(body)
//     })
//     .catch((err) =>{
//         console.error('Cold not fetch ', err)
//     })

//Получение данных с сервера
// fetch('https://swapi.co/api/people/1/')
// .then((res)=>{
//     return res.json()
// }).then((body) => {
//     console.log(body)
// })