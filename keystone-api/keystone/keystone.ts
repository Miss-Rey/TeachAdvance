// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

export default withAuth(
  config({
    server: {
      cors: {
        origin: [
          'http://localhost:5173', // Replace with your frontend's URL in development
        ],
        credentials: true, // Enable credentials for cookies or session headers
      },
      port: 3000,
     
    },
    graphql: {
      path: '/api/graphql', // Define the GraphQL API path (default is already '/api/graphql')
    },
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
    storage: {
      my_local_images: {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'image',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: path => `http://localhost:3000/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: '/images',
        },
        // Set serverRoute to null if you don't want a route to be created in Keystone
        // serverRoute: null
        storagePath: 'public/images',
      },
      /** more storage */
    },
  })
);
