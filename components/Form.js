import React from 'react';
import { Text, TextInput, ScrollView, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from '../styles';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            fieldEmpty: null,
            name: "",
            professor: "",
            ects: "",
            note: "",
            semester: ""
        };
    }

    componentDidMount(){
        // if Form is rendered from EditScreen, then set initial state from fetched Module
        if(this.props.isEdit){
            this.setState({
                isEdit: true,
                name: this.props.modul.name,
                professor: this.props.modul.professor,
                ects: this.props.modul.ects.toString(),
                note: this.props.modul.note.toString(),
                semester: this.props.modul.semester.toString(),
            });
        }
    }

    onChangeText = name => value => this.setState({
        [name]: value
    });

    validateForm() {
        const { name, professor, ects, note, semester } = this.state;
        //checks if fields are invalid
        if (name.trim() === "" || professor.trim() === "" || ects.trim() === "" || note.trim() === "" || semester.trim() === "") {
            this.setState({
                fieldEmpty: "Alle Felder müssen befüllt sein!"
            });
        } else if (ects == 0 || isNaN(ects) || isNaN(note) || semester == 0 || isNaN(semester)) {
            this.setState({
                fieldEmpty: "Achte auf reelle Zahlen und Punkttrennung!"
            });
        } else {
            this.setState({
                fieldEmpty: null
            });
            this.saveForm();
        }
    }

    openTwoButtonAlert = () => {
        Alert.alert(
            'Modul löschen',
            'Bist du sicher?',
            [
                { text: 'Ja', onPress: () => this.props.deleteModul() },
                { text: 'Nein', onPress: () => console.log('Modul "' + this.state.name + '" wurde nicht gelöscht.'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }

    saveForm() {
        const modul = {
            name: this.state.name,
            professor: this.state.professor,
            ects: Number(this.state.ects),
            note: Number(this.state.note),
            semester: Number(this.state.semester)
        }

        this.state.isEdit ? this.props.firestoreUpdate(modul) : this.props.firestoreSave(modul);

        this.setState({
            name: "",
            professor: "",
            ects: "",
            note: "",
            semester: ""
        });
    }

    renderForm = () => {
        const { fieldEmpty, name, professor, ects, note, semester } = this.state;
        return (
            <ScrollView contentContainerStyle={styles.sectionContainer}>
                <View>
                    <Text style={styles.titleText}>
                        Modulname
                    </Text>
                    <TextInput
                        onChangeText={this.onChangeText("name")}
                        style={styles.textInput}
                        value={name}
                    />
                </View>
                <View>
                    <Text style={styles.titleText}>
                        Professor
                    </Text>
                    <TextInput
                        onChangeText={this.onChangeText("professor")}
                        style={styles.textInput}
                        value={professor}
                    />
                </View>
                <View>
                    <Text style={styles.titleText}>
                        ECTS
                    </Text>
                    <TextInput
                        onChangeText={this.onChangeText("ects")}
                        keyboardType='numeric'
                        style={styles.textInput}
                        placeholder="1-30 "
                        value={ects}
                        maxLength={2}
                    />
                </View>
                <View>
                    <Text style={styles.titleText}>
                        Note
                    </Text>
                    <TextInput
                        onChangeText={this.onChangeText("note")}
                        keyboardType='numeric'
                        style={styles.textInput}
                        placeholder="z.B 1.7 (Punkttrennung)"
                        value={note}
                    />
                </View>
                <View>
                    <Text style={styles.titleText}>
                        Semester
                    </Text>
                    <TextInput
                        onChangeText={this.onChangeText("semester")}
                        keyboardType='numeric'
                        style={styles.textInput}
                        value={semester}
                    />
                    {!!fieldEmpty && (
                        <Text style={{ color: "red" }}>{this.state.fieldEmpty}</Text>
                    )}
                </View>
                {this.state.isEdit ? (
                    <View>
                        <View style={{ marginBottom: 10, marginTop: 10 }}>
                            <Button
                                mode="contained"
                                icon="check"
                                onPress={() => this.validateForm()}
                                color="green"
                            >Speichern</Button>
                        </View>
                        <View>
                            <Button
                                mode="contained"
                                icon="delete"
                                onPress={this.openTwoButtonAlert}
                                color="red"
                            >Löschen</Button>
                        </View>
                    </View>)
                    :
                    <View style={{ marginTop: 35 }}>
                        <Button
                            mode="contained"
                            icon="check"
                            onPress={() => this.validateForm()}
                            color="green"
                        >Modul hinzufügen</Button>
                    </View>}
            </ScrollView>
        );
    }

    render() {
        return this.renderForm();
    }
}
export default Form;
