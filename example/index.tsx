import 'react-app-polyfill/ie11';

// @ts-ignore
import * as ReactDOM from 'react-dom';
import { fromAirtable } from '../src/providers/airtable';

const apiKey = process.env.AIRTABLE_KEY ?? "";
const base = process.env.AIRTABLE_BASE ?? "";

const tokens = await fromAirtable({
  apiKey,
  base,
  table: "Icons",
  tokenField: "iconXIDd",
  propFields: ["icon", "vector"],
});

const App = () => {
  return (
    <div>
      {
        JSON.stringify(tokens, null, 2)
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
