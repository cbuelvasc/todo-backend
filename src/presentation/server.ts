import express, { Router } from "express";
import path from "path";

interface Options {
  apiPort: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private app = express();
  private readonly apiPort: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { apiPort, routes, publicPath = "public" } = options;
    this.apiPort = apiPort;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.apiPort, () => {
      console.log(`Server running on port ${this.apiPort}`);
    });
  }
}
