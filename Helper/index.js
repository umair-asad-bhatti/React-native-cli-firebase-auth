import firestore from '@react-native-firebase/firestore'
const helpers = {
    isValidEmail: (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    },
    convertToValidDate: (firebaseDate) => {
        return new Date(firebaseDate.seconds * 1000 + firebaseDate.nanoseconds / 1000000)
    },
    getData: async (currentUser) => {
        let temp_data = []
        const userDocSnapshot = firestore().collection('Users').doc(currentUser.uid);
        const userDataDetails = await userDocSnapshot.collection('Data').get()
        userDataDetails.forEach((userData) => {
            let parsedRawUserData = userData.data()
            temp_data.push({
                doc_id: userData.id,
                date: helpers.convertToValidDate(parsedRawUserData.date),
                amount: parsedRawUserData.amount,
                category: parsedRawUserData.category,
                type: parsedRawUserData.type
            })
        })
        return temp_data
    }
}
export default helpers