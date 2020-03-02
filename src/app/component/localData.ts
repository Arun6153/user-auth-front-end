export class LocalData {
    constructor() {
        let data = parseInt(localStorage.getItem('attempt'));
        if (!data)
            localStorage.setItem('attempt', "0")
    }
    getDataAttempts(): number {
        let attempt = parseInt(localStorage.getItem('attempt'));
        console.log(attempt);
        return attempt;
    }
    setDataAttempts(data) {
        localStorage.setItem('attempt', data)
    }
    clearData() {
        localStorage.removeItem('attempt');
    }
}

export class TimeData {
    constructor() {
        let data = parseInt(localStorage.getItem('timeLeft'));
        if (!data) {
            localStorage.setItem('timeLeft', "0")
            localStorage.setItem('timeBool',JSON.stringify({bool:false}))
        }
        console.log(data)
    }
    getDataTime(): number {
        let time = parseInt(localStorage.getItem('timeLeft'));
        console.log(time);
        return time;
    }
    setDatatimes(data) {
        console.log(data);
        localStorage.setItem('timeLeft', data)
    }
    getBool():boolean{
       let bool =  JSON.parse(localStorage.getItem('timeBool'));
       return bool.bool;
    }
    setBool(bool){
        localStorage.setItem('timeBool',JSON.stringify({bool:bool}))
    }
    clearData() {
        localStorage.removeItem('timeBool');
        localStorage.removeItem('timeLeft');
    }
}