import Reactotron, {networking} from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import {storage} from '../react-native-mmkv/mmkv';

Reactotron.configure({name: 'Melodiscover'}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(networking())
  .use(mmkvPlugin({storage}))
  .connect(); // let's connect!

const yeOldeConsoleLog = console.log;

// make a new one
console.log = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    preview: JSON.stringify(args),
    value: args.length === 1 ? args[0] : args,
  });
};
