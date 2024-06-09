import { Router } from 'express'
const router = Router()

const startUpMessage = 'Sessions API Router online.'

router.get('/api/sessions', (req, res) => {
  const sess = req.session
  res.send({ data: sess })
})

router.get('/api/sessions/getname', (req, res) => {
  const username = req.session.userName ?? false
  res.send({ data: username })
})

router.get('/api/sessions/destroy', (req, res) => {
  req.session.destroy()
  res.send({ data: 'session destroyed' })
})
// 2805 er der grund til at have hele den her API?
// router post

// router put

// patch

// delete

// jeg skal have session endpoints her for at kunne sætte den .-.

router.post('/api/sessions/')

console.log(startUpMessage)

export default router
