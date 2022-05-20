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
]

export default recipes
