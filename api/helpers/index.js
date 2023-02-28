 const cars = {
    audi:'audi',
    benz:'benz',
    toyota:'toyata',
    honda:'honda'
  }
  const agents = {
    john:'john',
    ram:'ram',
    shaik:'shaik',
    smith:'smith',
    mat:'mat'

  }
  const colors = {
    red:'red',
    black:'black',
    blue:'blue',
    white:'white',
    gray:'gray'

  }
  function validation({color,car,agent}){

    if(!agents[agent]){
      return `please select any one of the available agents eg:${Object.keys(agents).toString()}`
    }
    else if(!cars[car]){
      return `please select any one of the available cars eg:${Object.keys(cars).toString()}`
    }else if(!colors[color]){
      return `please select any one of the available colors eg:${Object.keys(colors).toString()}`
    }
    else{
      return 'pass'
    }
  }
  module.exports = {
    validation: validation,
  }