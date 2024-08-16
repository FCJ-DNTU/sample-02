import express from "express";
import http from "http";

// Import utils
import { Utils } from "./utils/index.mjs";

// Import data
import Data from "../_data/db.json" with { type: "json" };

const settings = {
  host: process.env.HOST_NAME || "0.0.0.0",
  port: process.env.PORT || 3000
};

const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log("URL:", fullUrl);
  next();
});

app.get("/", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    o.data = "Welcome to my app";
    return o;
  });
});

// Get users
app.get("/users", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { name, username, email, company } = req.query;

    const nameRegExp = new RegExp(name, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(name || username || email || company);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (name && nameRegExp.test(Data.users[i].name)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (username && Data.users[i].username === username) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (email && Data.users[i].email === email) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (company && Data.users[i].company.name === company) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.users.length) {
          N += 1;
        }
      } else
        Data.users[i] && result.push(Data.users[i]);
    }

    o.data = result;
    o.success.message = "Query users successfully";

    return o;
  });
});

// Get user
app.get("/users/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.params;

    o.data = Data.users.find(user => user.id == id);
    o.success.message = "Query user successfully";

    return o;
  });
});

// Get albums
app.get("/albums", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { title } = req.query;

    const titleRegExp = new RegExp(title, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(title);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (title && titleRegExp.test(Data.albums[i].title)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.albums.length) {
          N += 1;
        }
      } else
        Data.users[i] && result.push(Data.users[i]);
    }

    o.data = result;
    o.success.message = "Query albums successfully";

    return o;
  });
});

// Get album
app.get("/albums/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.query;

    o.data = Data.albums.find(album => album.id == id);
    o.success.message = "Query album successfully";

    return o;
  });
});

server.listen(settings.port, settings.host, () => {
  console.log(`You server is served at http://${settings.host}:${settings.port}`);
});