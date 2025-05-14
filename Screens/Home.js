import {View, Text,StyleSheet} from 'react-native';
import Title from '../Components/Title';
export default function Home ()
{
    return(
        <View style={styles.maincontainer} >
           <Title/>
        </View>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
    }
});