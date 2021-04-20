import { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const express = require('express');
  const app: Express = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get('/filteredimage', async (req: Request, res: Response) => {
    //    1. validate the image_url query
    try {
      const imageURL = req.query.image_url
      const validURL = new URL(imageURL);
      //    2. call filterImageFromURL(image_url) to filter the image
      filterImageFromURL(imageURL)
        .then((filteredPath) => {
          //    3. send the resulting file in the response
          res.sendFile(filteredPath, (err) => {
            //    4. deletes any files on the server on finish of the response
            if (!err) deleteLocalFiles([filteredPath]); 
          });
        })
        .catch((error) => {
          //    E2. Return an error message when filtering fails
          res.status(500).send({ message: 'Error applying filter' });
        });
    } catch (TypeError) {
      //    E1. Return an error message when URL is not valid
      res.status(400).send({ message: 'Malformed image url' });
    }
  });
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();