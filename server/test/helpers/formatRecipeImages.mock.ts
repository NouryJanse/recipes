import { Prisma } from '@prisma/client'

type RecipeWithImages = Prisma.RecipeGetPayload<{
  include: { Image: true }
}>

const recipes: RecipeWithImages[] = [
  {
    id: 110,
    name: 'Salmon in the oven',
    description: 'With ricotta, and spinach',
    createdAt: new Date('2022-05-12T20:46:32.011Z'),
    updatedAt: new Date('2022-05-20T09:41:03.422Z'),
    published: false,
    authorId: null,
    course: 'lunch',
    Image: [
      {
        id: 169,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985192/recipes/ci7sx8yqtfykkvmfa4wc.webp',
        width: 720,
        height: 720,
        position: null,
        recipeId: 110,
        cloudinaryId: 'ed693f518def7a6076320088fac05f46',
      },
    ],
  },
  {
    id: 47,
    name: 'Erwtensoep',
    description: 'Met rookworst',
    createdAt: new Date('2022-01-07T14:30:11.982Z'),
    updatedAt: new Date('2022-05-19T18:32:31.078Z'),
    published: false,
    authorId: null,
    course: 'lunch',
    Image: [
      {
        id: 168,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985161/recipes/iql9qszqi0gvdz3oerrv.jpg',
        width: 1224,
        height: 900,
        position: null,
        recipeId: 47,
        cloudinaryId: '94dfa2d7abfb9f2c417ef6d85095dedf',
      },
    ],
  },
  {
    id: 111,
    name: 'Pizza margherita',
    description: 'lekkere pizza',
    createdAt: new Date('2022-05-13T17:00:21.323Z'),
    updatedAt: new Date('2022-05-19T18:28:49.982Z'),
    published: false,
    authorId: null,
    course: 'lunch',
    Image: [
      {
        id: 167,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652984944/recipes/eaohjdc6qenxmkpc1inm.jpg',
        width: 3000,
        height: 2001,
        position: null,
        recipeId: 111,
        cloudinaryId: 'a89690d04c9a21c6428749c16c7af9df',
      },
    ],
  },
  {
    id: 39,
    name: 'Aardappelgratin',
    description: 'lekker!',
    createdAt: new Date('2022-01-07T00:10:15.043Z'),
    updatedAt: new Date('2022-05-13T12:35:46.187Z'),
    published: false,
    authorId: null,
    course: 'lunch',
    Image: [
      {
        id: 170,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985217/recipes/yxdeqkefdfwbrxxvivgx.jpg',
        width: 1423,
        height: 1067,
        position: null,
        recipeId: 6,
        cloudinaryId: 'eedf0029dd3955d6b088b9be3fab3bad',
      },
    ],
  },
  {
    id: 6,
    name: 'Grilled pumpkin',
    description:
      'Curries are an essential part of Thai cuisine. Colorful, fragrant, and powered with an army of fresh flavors, curries have many versions, but they all follow some basics and they all rely on some vital ingredients to achieve the classic depth of flavor. Green curry is thick, creamy, filling, and bright. Between red, yellow, or green, the latter is one of the most famous and sought-after dishes—beautifully vibrant thanks to the addition of Thai basil, cilantro, and makrut lime leaf and peel.',
    createdAt: new Date('2022-01-05T18:03:04.946Z'),
    updatedAt: new Date('2022-05-11T15:33:10.376Z'),
    published: false,
    authorId: null,
    course: 'snack',
    Image: [
      {
        id: 170,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985217/recipes/yxdeqkefdfwbrxxvivgx.jpg',
        width: 1423,
        height: 1067,
        position: null,
        recipeId: 6,
        cloudinaryId: 'eedf0029dd3955d6b088b9be3fab3bad',
      },
    ],
  },
  {
    id: 89,
    name: 'Avocado cracker',
    description: 'Just a snack with a cracker stuffed with avocado',
    createdAt: new Date('2022-02-04T11:55:17.915Z'),
    updatedAt: new Date('2022-05-11T13:46:40.361Z'),
    published: false,
    authorId: null,
    course: 'snack',
    Image: [
      {
        id: 170,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985217/recipes/yxdeqkefdfwbrxxvivgx.jpg',
        width: 1423,
        height: 1067,
        position: null,
        recipeId: 6,
        cloudinaryId: 'eedf0029dd3955d6b088b9be3fab3bad',
      },
    ],
  },
  {
    id: 90,
    name: 'Cheese board',
    description: 'With sausages and grapes',
    createdAt: new Date('2022-02-04T13:07:43.040Z'),
    updatedAt: new Date('2022-05-11T13:38:01.833Z'),
    published: false,
    authorId: null,
    course: 'dinner',
    Image: [
      {
        id: 170,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985217/recipes/yxdeqkefdfwbrxxvivgx.jpg',
        width: 1423,
        height: 1067,
        position: null,
        recipeId: 6,
        cloudinaryId: 'eedf0029dd3955d6b088b9be3fab3bad',
      },
    ],
  },
  {
    id: 16,
    name: 'Green Curry',
    description:
      'Curries are an essential part of Thai cuisine. Colorful, fragrant, and powered with an army of fresh flavors, curries have many versions, but they all follow some basics and they all rely on some vital ingredients to achieve the classic depth of flavor. Green curry is thick, creamy, filling, and bright. Between red, yellow, or green, the latter is one of the most famous and sought-after dishes—beautifully vibrant thanks to the addition of Thai basil, cilantro, and makrut lime leaf and peel.',
    createdAt: new Date('2022-01-06T23:46:25.084Z'),
    updatedAt: new Date('2022-05-11T13:36:40.807Z'),
    published: false,
    authorId: null,
    course: 'dinner',
    Image: [
      {
        id: 170,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985217/recipes/yxdeqkefdfwbrxxvivgx.jpg',
        width: 1423,
        height: 1067,
        position: null,
        recipeId: 6,
        cloudinaryId: 'eedf0029dd3955d6b088b9be3fab3bad',
      },
    ],
  },
  {
    id: 52,
    name: 'Tom Kha Kai',
    description: 'Lekker pittig soepje, hallo!',
    createdAt: new Date('2022-01-11T20:40:45.360Z'),
    updatedAt: new Date('2022-03-29T19:02:13.030Z'),
    published: false,
    authorId: null,
    course: 'breakfast',
    Image: [
      {
        id: 170,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985217/recipes/yxdeqkefdfwbrxxvivgx.jpg',
        width: 1423,
        height: 1067,
        position: null,
        recipeId: 6,
        cloudinaryId: 'eedf0029dd3955d6b088b9be3fab3bad',
      },
    ],
  },
  {
    id: 55,
    name: 'Brood',
    description: 'Zelfgemaakt brood uit de gietijzeren pan.',
    createdAt: new Date('2022-01-13T14:21:51.772Z'),
    updatedAt: new Date('2022-01-13T14:25:12.688Z'),
    published: false,
    authorId: null,
    course: 'breakfast',
    Image: [
      {
        id: 170,
        url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1652985217/recipes/yxdeqkefdfwbrxxvivgx.jpg',
        width: 1423,
        height: 1067,
        position: null,
        recipeId: 6,
        cloudinaryId: 'eedf0029dd3955d6b088b9be3fab3bad',
      },
    ],
  },
]

export default recipes
