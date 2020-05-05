import React from 'react'
import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Container, Header, Content, Body, Title, Left, Right, View, Spinner } from 'native-base'
import * as Keys from '../preferences/Constant.js'
import * as Style from '../theme/Theme.js'
import MapView, { AnimatedRegion } from 'react-native-maps';
import GetLocation from 'react-native-get-location'



export class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            region: {
                latitude: 10,
                longitude: 10,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }
        };
    }

    componentDidMount() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            console.log(location);

            let region = {
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
                latitudeDelta: 5,
                longitudeDelta: 5
            }
            this.setState({ region: region, loading: false });
        }).catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }

    onMapReady = () => {
        // do something
    }

    onRegionChange = () => { }



    goToInitialLocation() {
        let initialRegion = Object.assign({}, this.state.initialRegion);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        this.mapView.animateToRegion(initialRegion, 2000);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Map</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this.state.loading ? (
                        <Spinner color="red" />

                    ) : (
                            <View style={Style.styles.container}>
                                <MapView style={Style.styles.mapcontainer}
                                    showsUserLocation={true}
                                    showsMyLocationButton={false}
                                    zoomEnabled={true}
                                    initialRegion={this.state.region}
                                    showsUserLocation={true}
                                    onMapReady={this.onMapReady}
                                    onRegionChangeComplete={this.onRegionChange}>

                                    <MapView.Marker
                                        coordinate={{
                                            "latitude": this.state.region.latitude,
                                            "longitude": this.state.region.longitude
                                        }}
                                        title={"My Location"}
                                        draggable />
                                </MapView>
                            </View>
                        )}
                </Content>
            </Container >
        )
    }
}