const respond = (request, response, status, object, type) => {
  response.writeHead(status, {
    'Content-Type': type,
  });
  if (type === 'application/json') {
    response.write(JSON.stringify(object));
    response.end();
  } else {
    response.write(object);
    response.end();
  }
};


const notFound = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }
  return respond(request, response, 404, responseJSON, 'application/json');
};


const forbidden = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was forbidden.',
    id: 'forbidden',
  };
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  return respond(request, response, 403, responseJSON, 'application/json');
};

const internal = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'An internal error has occured',
    id: 'internal',
  };
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  return respond(request, response, 500, responseJSON, 'application/json');
};

const notImplemented = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This page has not been implemented',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  return respond(request, response, 501, responseJSON, 'application/json');
};


const success = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, responseJSON, 'application/json');
};


const unauthorized = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request is authorized, you are logged in',
    id: 'unauthorized',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing loggedIn query parameter set to yes';
      responseJSON.id = 'unauthorized';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 401, responseJSON, 'application/json');
  }


  return respond(request, response, 200, responseJSON, 'application/json');
};


const badRequest = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'badRequest',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respond(request, response, 400, responseJSON, 'application/json');
  }

  return respond(request, response, 200, responseJSON, 'application/json');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
