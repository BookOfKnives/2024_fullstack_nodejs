import { fakerDA as faker } from "@faker-js/faker";
import { Router } from "express";
const router = Router();

// let config = {};

// function configObj(configs){
//   config = configs;
// }

function createRandomUser() {
    return {
      username: faker.internet.userName(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  };

router.get("/faker", (req, res) => {
  const users = {1: createRandomUser(),
    2: createRandomUser(),
    3: createRandomUser(), };
  res.send({ data: users });
});

// router.get("/fakerConf", (req, res) => {
//   res.send({ data: config })
// })

// export { router as fakerRouter, configObj as fakerConfig };
export { router as fakerRouter, };

//kan skrive learning om at jeg ikke kunne tilgå moduler i faker.js, men kun i toplevel modules (via imports fra app.js)
//men jeg forstår ikke hvorfor jeg var nødt til at sige export const router og ikke export default router i bunden?
//det er fordi jeg forsøger at bruge destructuring { router } og ikke bare "ren" import...