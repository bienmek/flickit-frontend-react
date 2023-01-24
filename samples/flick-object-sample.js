
//  Rarity
// 1 -> common (lowest)
// 2 -> rare
// 3 -> super rare
// 4 -> epic
// 5 -> legendary (highest)


export const objects = [
    {
        name: "chair",
        rarity: 1,
        reward: 10,
        image: "🪑"
    },
    {
        name: "dog",
        rarity: 2,
        reward: 60,
        image: "🐕"
    },
    {
        name: "wheel",
        rarity: 3,
        reward: 260,
        image: "🛞"
    },
    {
        name: "horse",
        rarity: 4,
        reward: 3400,
        image: "🐎"
    },
    {
        name: "rocket",
        rarity: 5,
        reward: 10550,
        image: "🚀"
    },
    {
        name: "Fire truck",
        rarity: 4,
        reward: 5560,
        image: "🚒"
    }
]
export const users = [
    {
        username: "TitouXTv",
        email: "thibault.velly@isen.yncrea.fr",
        profile_picture: "../assets/images/titoux.jpeg",
        points: 5000,
        numberofflicks: 30,
        averagetime: [
            {
                minutes: 23,
                secondes: 10,
            }
        ],
        points: 5050,
        flicks: [
            {
                object: "Fire truck",
                time_to_take: 1231231932,
                minutes: 10,
                secondes: 5,
                points: 5,
                datepic: '16/01/2023',
                heurespic: 10,
                minutespic: 15
            },
            {
                object: "red car",
                time_to_take: 12193,
                minutes: 25,
                secondes: 11,
                points: 3,
                datepic: '11/01/2023',
                heurespic: 17,
                minutespic: 33
            },
            {
                object: "Elephant",
                time_to_take: 1231231,
                minutes: 32,
                secondes: 44,
                points: 3,
                datepic: '20/02/2023',
                heurespic: "08",
                minutespic: "04"
            },
            {
                object: "Bike",
                time_to_take: 1231231932,
                minutes: 2,
                secondes: 1,
                points: 10,
                datepic: '23/01/2023',
                heurespic: 20,
                minutespic: 45
            },
        ],
        rank: 1
    },
    {
        username: "bienmec",
        email: "bienmec@gmail.com",
        profile_picture: "http://fireXXXXXXX",
        points: 1500,
        flicks: [
            {
                object: "bike",
                time_to_take: 123123132,
                points: 1700
            },
            {
                object: "cat",
                time_to_take: 1231212,
                points: 1200
            },            {
                object: "white smartphone",
                time_to_take: 123122,
                points: 250
            },
        ],
        rank: 2
    },
    {
        username: "Phillipe",
        email: "phillipe@gmail.com",
        profile_picture: "http://fireXXXXXXX",
        points: 500,
        flicks: [
            {
                object: "rabbit",
                time_to_take: 123132,
                points: 0
            },
            {
                object: "laptop",
                time_to_take: 12312121213,
                points: 1700
            },            {
                object: "humburger",
                time_to_take: 12312,
                points: 2500
            },
        ],
        rank: 3
    }
]