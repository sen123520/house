import dva from "dva";
import "babel-polyfill";
import "./index.css";
import createLoading from "dva-loading";
import { browserHistory } from "dva/router";
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true
  }),
  history: browserHistory
  // onError(error) {
  //   console.error('app onError -- ', error)
  // }
});

// 2. Plugins
app.use({});

app.model(require("./models/app"));

// app.model(require("./models/publishContent/list"));

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require("./router"));

// 5. Start
app.start("#root");
