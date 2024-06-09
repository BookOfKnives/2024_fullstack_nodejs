import chalk from 'chalk'

const timeOptions = {
  timeZone: 'Europe/Copenhagen',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}

const dl = () => {
  console.log(chalk.hex('#ffdd33')(new Date().toLocaleString('da-DK', timeOptions)))
}
const cl = console.log

export const myLogger = {
  cl,
  dl
}
