import AsyncStorage from "@react-native-async-storage/async-storage";

function getNotificationInterval(notificationsPerDay) {
    let interval = 24 / notificationsPerDay;
    let hours = [];
    for (let i = 0; i < notificationsPerDay; i++) {
        hours.push(interval * (i+1));
    }
    return hours;
}

export async function setAuthedUserStorage (uid, notificationsFrequency, lastFlicks) {
    /**
     *  azeazETEPMLZeaz -> notificationsFrequency: 3 (3/j),
     *                      lastFlicks: [
     *                          {
     *                              flickImage: "gs://uri",
     *                              timeTaken: "32:23",
     *                              object: {
     *                                  image: "🚗",
     *                                  name: "car",
     *                                  reward: 500,
     *                                  rarity: 1
     *                              },
     *                              date: 1669856864,
     *                          }
     *                      ]
     */
    try {
        const storageData = {
            notificationHoursList: getNotificationInterval(notificationsFrequency),
            lastFlicks: lastFlicks
        }
        await AsyncStorage.setItem(uid, JSON.stringify(storageData))
    } catch (e) {
        console.error(e)
    }
}

export async function getAuthedUserStorage (uid) {
    try {
        const storedData = await AsyncStorage.getItem(uid)

        return storedData ? JSON.parse(storedData) : null
    } catch (e) {
        console.error(e)
    }
}