import Reactotron, {networking} from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import {QueryClientManager, reactotronReactQuery} from 'reactotron-react-query';
import {storage} from '../react-native-mmkv/mmkv';
import {queryClient} from '../../libs/react-query/queryClient';

const queryClientManager = new QueryClientManager({
  queryClient,
});

Reactotron.configure({name: 'Melodiscover'}) // controls connection & communication settings
  .use(networking())
  .use(mmkvPlugin({storage}))
  .use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

const yeOldeConsoleLog = console.log;
const consoleError = console.error;

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

console.error = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  consoleError(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.ERROR',
    preview: JSON.stringify(args),
    value: args.length === 1 ? args[0] : args,
  });
};
