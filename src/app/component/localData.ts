export class LocalData {
    constructor() {
        let str = window.atob(localStorage.getItem('attempt'));
        let data = parseInt(str);
        if (!data)
            localStorage.setItem('attempt', window.btoa("0"))
    }
    getDataAttempts(): number {
        let str = window.atob(localStorage.getItem('attempt'));
        let attempt = parseInt(str);
        return attempt;
    }
    setDataAttempts(data) {
        localStorage.setItem('attempt', window.btoa(data))
    }
    clearData() {
        localStorage.removeItem('attempt');
    }
}

export class TimeData {
    constructor() {
        let str = window.atob(localStorage.getItem('timeLeft'));
        let data = parseInt(str);
        if (!data) {
            localStorage.setItem('timeLeft', window.btoa("0"))
            localStorage.setItem('timeBool',JSON.stringify({bool:false}))
        }
        console.log(data)
    }
    getDataTime(): number {
        let str = window.atob(localStorage.getItem('timeLeft'));
        let time = parseInt(str);
        return time;
    }
    setDatatimes(data) {
        localStorage.setItem('timeLeft', window.btoa(data))
    }
    getBool():boolean{
       let bool =  JSON.parse(localStorage.getItem('timeBool'));
       if(bool == null) return false;
       
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