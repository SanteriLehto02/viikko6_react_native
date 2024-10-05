import { StatusBar, View } from 'react-native';
import Dogs from './Dogs';
export default function App() {
  return (
    <View >
      <Dogs></Dogs>
      <StatusBar style="auto" />
    </View>
  );
}
