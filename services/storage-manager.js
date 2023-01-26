import AsyncStorage from "@react-native-async-storage/async-storage";

function getNotificationInterval(notificationsPerDay = 1) {
    let interval = Math.ceil(24 / notificationsPerDay)
    let hours = [];
    for (let i = 0; i < notificationsPerDay; i++) {
        hours.push((interval * (i+1))%24);
    }
    return hours;
}

export async function setAuthedUserStorage (uid, notificationsFrequency, lastFlicks, profilePicture) {
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
        let storageData
        const userStorage = await getAuthedUserStorage(uid)
        if (lastFlicks && !notificationsFrequency && !profilePicture) {
            storageData = {
                notificationHoursList: userStorage.notificationHoursList,
                lastFlicks: lastFlicks,
                profilePicture: userStorage.profilePicture
            }
            console.log("DEBUG 1")
        } else if (profilePicture && !lastFlicks && !notificationsFrequency) {
            storageData = {
                notificationHoursList: userStorage.notificationHoursList,
                lastFlicks: userStorage.lastFlicks,
                profilePicture: profilePicture || "https://firebasestorage.googleapis.com/v0/b/worldtask-test.appspot.com/o/profile_picture%2Fblank_pp.png?alt=media&token=0c6a438a-6dcf-4491-94d5-c1ee187e6c08"
            }
            console.log("DEBUG2")
        } else {
            storageData = {
                notificationHoursList: getNotificationInterval(notificationsFrequency),
                lastFlicks: [],
                profilePicture: profilePicture
            }
            console.log("DEBUG3")
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