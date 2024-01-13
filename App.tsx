import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
// form validation
import {object, number} from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const PasswordSchema = object().shape({
  passwordLength: number()
    .min(4, 'Should be a min of 4 charactors long')
    .max(16, 'Should be at most 16 charactors long')
    .required('length is required!'),
});
export default function App(): React.JSX.Element {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXY';
    const digitChars = '0123456789';
    const specialChars = '~`!@#$%^&*()-_+={}[]|/:;"<>,.?';

    let characterList = '';

    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };
  const createPassword = (charactors: string, passwordLength: number) => {
    let results = '';
    for (let i = 0; i < passwordLength; i++) {
      //get random charactor from charactors
      const randomIndex = Math.round(Math.random() * charactors.length); //get random charactor index
      results += charactors.charAt(randomIndex);
    }
    return results;
  };
  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };
  return (
    <SafeAreaView style={[styles.appContainer, {padding: 15}]}>
      <Text style={styles.title}>Password Generator</Text>
      <Formik
        initialValues={{passwordLength: ''}}
        validationSchema={PasswordSchema}
        onSubmit={values => {
          generatePasswordString(Number(values.passwordLength));
        }}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          handleReset,
          /* and other goodies */
        }) => (
          <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.heading}>Password Length:</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.errorText}>{errors.passwordLength}</Text>
                )}
              </View>
              <TextInput
                style={styles.inputStyle}
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                placeholder="Ex. 8"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Lower Case:</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={lowerCase}
                onPress={() => setLowerCase(!lowerCase)}
                fillColor="#28AB87"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Upper Case:</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={upperCase}
                onPress={() => setUpperCase(!upperCase)}
                fillColor="#C9A0DC"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Numbers:</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={numbers}
                onPress={() => setNumbers(!numbers)}
                fillColor="#FED85D"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Symbols:</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={symbols}
                onPress={() => setSymbols(!symbols)}
                fillColor="#FC80A5"
              />
            </View>
            <View style={styles.formActions}>
              <TouchableOpacity
                disabled={!isValid}
                onPress={() => handleSubmit()}
                style={styles.primaryBtn}>
                <Text style={styles.primaryBtnTxt}>Generate Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!isValid}
                onPress={() => {
                  handleReset();
                  resetPasswordState();
                }}
                style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnTxt}>Reset</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      {isPassGenerated && (
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.subTitle}>Results:</Text>
          <Text style={styles.description}>Long press to copy</Text>
          <Text selectable={true} style={styles.generatedPassword}>
            {password}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
