var success = function(message) {
    return {
      status: 200,
      body: {
        response: {
          message
        }
      }
    }
  }

var failure = function(message) {
  return {
    status: 400,
    body: {
      error: {
        message
      }
    }
  }
}

exports.responses = {
  success,
  failure
}