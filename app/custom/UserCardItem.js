import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Text, CardItem, View, ListItem } from 'native-base';

export class UserCardItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem onPress={this.props.onPress} itemDivider>
                <Body>
                    {/* Header  */}
                    <CardItem header>
                        <Text style={styles.cardItemHeaderText}>{this.props.fullname}</Text>
                    </CardItem>
                    {/* Body  */}
                    <CardItem cardBody >
                        <Body>
                            <Text style={styles.cardBodyRowTextEmail}>Email: {this.props.email}</Text>
                            <Text style={styles.cardBodyRowTextGender}>Gender: {this.props.gender}</Text>
                        </Body>
                    </CardItem>
                </Body>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({

    cardItemHeaderText: {
        flex: 1,
        fontSize: 16,
        color: '#454545',
        fontWeight: 'bold',

    },
    cardBodyRowTextEmail: {
        textAlign: "center",
        fontSize: 14,
        color: '#1a1a00',
        marginStart: 16,
        marginEnd: 16,
        marginBottom: 4
    },
    cardBodyRowTextGender: {
        textAlign: "center",
        fontSize: 14,
        color: '#1a1a00',
        marginStart: 16,
        marginEnd: 16,
        marginTop: 4,
        marginBottom: 16
    }
});