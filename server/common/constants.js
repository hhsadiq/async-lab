module.exports = {
  params: {
    titles: {
      retrieve: {
        query: {
          required: 'address',
          errors: {
            required: {
              code: 400,
              msg: 'Missing query param address'
            },
            invalid: {
              code: 400,
              msg: 'Invalid query param(s) found'
            }
          }
        }
      }
    }
  },
  response: {
    html: `
    <html>
      <head></head>
      <body>  
          <h1> Following are the titles of given websites: </h1>      
          <ul>
          </ul>
      </body>
    </html>
    `
  }
};
