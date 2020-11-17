class Greeter {
  greeting: string;
  constructor(message:string) {
    this.greeting = message;
  }
  greet(){
    console.log('hello',this.greeting)
  }
}

let greeter = new Greeter('world')



let button = document.createElement('button')
button.textContent = "Say hello"
button.onclick=function (){
  alert(greeter.greet())
}

document.body.appendChild(button)