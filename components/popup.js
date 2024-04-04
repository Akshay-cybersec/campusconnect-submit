import {Modal,Text} from 'react-native-paper'

const Dialog=()=>{
    const [visible, setVisible] = useState(false);
    return(
        <Modal visible={visible} onDismiss={setVisible(false)} style={{backgroundColor:'white',padding:20}}>
            <Text>Hello this is dialog</Text>
        </Modal>
    );
}

export default Dialog;