import React, { useEffect, useState } from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import {
    requestPermissionsAsync,
    getCurrentPositionAsync
} from 'expo-location'
//import { connect } from 'react-redux'
import {
    View,
    Text,
    //TextInput,
    StyleSheet,
    //TouchableOpacity,
    Image
} from 'react-native'
import axios from 'axios'
import { TITLE_ERROR, TEXT_DEFAULT_ERROR } from '../constants/message'
import Header from '../components/Header'
//import { getHelpRequests } from '../store/actions/requestForHelp'
import pin from '../assets/images/pin.png'
//import { MaterialIcons } from '@expo/vector-icons'


function Radar({ navigation }) {
    const [people, setPeople] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)
    const [searchInput, setSearchInput] = useState('')

    async function loadPeople() {
        const { latitude, longitude } = currentRegion

        axios.get(`/helpRequests.json?person`)
            .catch(err => {
                dispatch(setMessage({
                    title: TITLE_ERROR,
                    text: TEXT_DEFAULT_ERROR + err
                }))
            })
            .then(res => {
                const rawhelpRequests = res.data
                const helpRequests = []
                for (let key in rawhelpRequests) {
                    helpRequests.push({
                        ...rawhelpRequests[key],
                        id: key
                    })
                }
                setPeople(helpRequests)
            })
    }

    function handleRegionChange(region) {
        setCurrentRegion(region)
        loadPeople()
    }

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition()
        loadPeople()
    }, [])


    if (!currentRegion) {
        return null
    }


    return (
        <View style={styles.container}>
            <Header />
            <MapView
                onRegionChangeComplete={handleRegionChange}
                initialRegion={currentRegion}
                style={styles.map}>
                {people.map(person => (
                    <Marker
                        key={person.id}
                        coordinate={{
                            latitude: person.latitude,
                            longitude: person.longitude
                        }}>
                        <Image source={pin} style={styles.pin} />
                        <Callout onPress={() => {
                            //navigation.navigate('Add', { id: '64684654' })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.textSuccor}>{person.person}</Text>
                                <Text style={styles.textHelp}>necessita de sua ajuda, leve alimento a quem sente fome.</Text>
                                <Text style={styles.textAuth}>{`Pedido de auxilio postado por ${person.nickname}.`}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {/* <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar pessoa..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={searchInput => setSearchInput(searchInput)}
                />
                <TouchableOpacity onPress={loadPeople} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View> */}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: {
        flex: 1
    },
    pin: {
        width: 54,
        height: 54
    },
    callout: {
        width: 260,
    },
    textSuccor: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    textHelp: {
        fontSize: 16,
        textAlign: 'justify'
    },
    textAuth: {
        color: '#666',
        marginTop: 5,
        textAlign: 'justify'
    },
    searchForm: {
        position: 'absolute',
        top: 80,
        left: 20,
        zIndex: 5,
        flexDirection: 'row',
        marginRight: 40
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#3578f6',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})


/* const mapStateToProps = ({ requestForHelp }) => {
    return {
        helpRequests: requestForHelp.helpRequests
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetHelpRequests: () => dispatch(getHelpRequests())
    }
} */

export default Radar
//export default connect(mapStateToProps, mapDispatchToProps)(Radar)