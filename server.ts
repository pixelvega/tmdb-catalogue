import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"
import { createServer as createViteServer } from "vite"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

import {
  getMovieById,
  getMovieListsByCategory,
} from "./src/backend/apiRequests.js"
import { movieListsArray } from "./src/backend/moviesType.js"
import { initialState } from "./src/store/app/initialState.js"
import { InitialState } from "./src/store/app/appTypes.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  })

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares). The following is valid even after restarts.
  app.use(vite.middlewares)

  app.get("/api/movies", async (req, res, next) => {
    try {
      const data = await getMovieListsByCategory([...movieListsArray])
      res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  })

  app.get("/api/movie/:movieId", async (req, res, next) => {
    try {
      const movieId = req.params.movieId
      const movie = await getMovieById(Number(movieId))
      res.status(200).json(movie)
    } catch (e) {
      next(e)
    }
  })

  app.use("*all", async (req, res, next) => {
    let url = req.originalUrl

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      )

      let data: InitialState = initialState

      const matchDetail = url.match(
        /\/movie\/(popular|top_rated|upcoming)\/(.+)/
      )

      if (matchDetail) {
        const movieId = matchDetail[2]
        const response = await getMovieById(Number(movieId))

        if (response.success === false) {
          res
            .status(404)
            .set({ "Content-Type": "text/html" })
            .end(fs.readFileSync("./404.html", "utf-8"))
          return
        }
        // TODO add state to the app context
        data = { ...data, views: { ...data.views, detail: response } }
      } else {
        // . handle static routes
        switch (url) {
          // TODO: add favourites route
          // case "/favourites":
          //   data = await getFavourites()
          //   break

          case "/":
            const homeData = await getMovieListsByCategory([...movieListsArray])
            data = { ...data, views: { ...data.views, home: homeData } }
            break
          default:
            res
              .status(404)
              .set({ "Content-Type": "text/html" })
              .end(fs.readFileSync("./404.html", "utf-8"))
            return
        }
      }

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template)

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx")

      // 4. render the app HTML. This assumes entry-server.js's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render({ path: url, data })

      // 5. Inject the app-rendered HTML into the template.
      let html = template.replace(`<!--ssr-outlet-->`, () => appHtml.html)
      html = html.replace(
        `<!--ssr-initial-data-->`,
        () => `
       <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(data)};
      </script>
      `
      )

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html)
    } catch (e: any) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e)
      res.status(500).end(e.stack)
    }
  })

  app.listen(5173)
  console.log("Server started at http://localhost:5173")
}

createServer()
