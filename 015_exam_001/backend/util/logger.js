import chalk from 'chalk'

const timeOptions = {
  timeZone: 'Europe/Copenhagen',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}

export function cl (...text) {
  let a, b, rest;
  [a, b, rest] = text
  console.log(chalk.hex('#ffdd33')(new Date().toLocaleString('da-DK', timeOptions)), a ?? chalk.hidden(null), chalk.yellow(b) ?? chalk.hidden(null), rest ?? chalk.hidden(null))
}

export function cle (error, ...text) {
  let a, b, rest;
  [a, b, rest] = text
  console.error(chalk.hex('#ffdd33')(new Date().toLocaleString('da-DK', timeOptions)), a ?? chalk.hidden(null), chalk.red('Error!'), error, chalk.yellow(b) ?? chalk.hidden(null), rest ?? chalk.hidden(null))
}

const dl = () => {
  console.log(chalk.hex('#ffdd33')(new Date().toLocaleString('da-DK', timeOptions)))
}
const cll = console.log

export const myLogger = {
  cll,
  dl
}
