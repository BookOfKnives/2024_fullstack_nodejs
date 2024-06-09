import chalk from 'chalk'
const PORT = Number(process.env.PORT)
const newDate = new Date().toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' })
export function startUpMessager () {
  // console.log(`App 015 online on port ${chalk.yellow(PORT)} at time ${chalk.greenBright(newDate)}`);
  console.log(`App 015 online on port ${chalk.yellow(PORT)} at time ${chalk.hex('#ffdd33')(newDate)}`)
}
