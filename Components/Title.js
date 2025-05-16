import {View, Text, StyleSheet,} from 'react-native';


export default function Title({name, style}) {
   
    return(
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#3498db',
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 50,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        
        letterSpacing: 1,
    }
});