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
        return res.results
    }

    getPerson(id) {
         return this.getResourse(`/people/${id}/`)
     }

     /*Получение списка планет */
     async getAllplanet(){

        const res = await this.getResourse(`/planets/`)
        return res.results
    }

    getPlanet(id) {
         return this.getResourse(`/planets/${id}/`)
     }

     /*Получение списка космич кораблей */
     async getAllStarships(){

        const res = await this.getResourse(`/starships/`)
        return res.results
    }

    getStarship(id) {
         return this.getResourse(`/starships/${id}/`)
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