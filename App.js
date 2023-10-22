import MainApp from "./screens/MainApp";
import { View } from 'react-native'
import { ThemeProvider } from "./utils/ThemeProvider";

function App() {

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <MainApp />
      </View>
    </ThemeProvider>
  )
}

export default App;
