function CoveraError(status, message, json) {
  if (!(this instanceof CoveraError))
    return new CoveraError(status, message, json);
  Error.captureStackTrace(this, CoveraError);
  this.status = status;
  this.toJSON = () => Object.assign({message}, json);
}

function unexpectedErr(err) {
  err.status = 500;
  err.unexpected = true;
  err.toJSON = () => ({message: 'Unexpected Error'});
  return err;
}

function missingQueryParams(required, message) {
  if (!message) {
    message =
        'Missing query paramter' + (required && required.length > 1 && 's');
  }
  return CoveraError(422, message, {required});
}

function parseConstraintViolation(err) {
  switch (err.constraint) {
    case 'uinique_commit':
      return CoveraError(409, 'A report with that commit already exists');
  }
}

function postgresError(err) {
  switch (err.code) {
    case '23505':
      return parseConstraintViolation(err);
  }
}

function notFound() {
  return CoveraError(404, 'Not found');
}

function parseError(err) {
  let parsedErr;
  switch (true) {
    case err instanceof CoveraError:
      return err;
    case err.code && err.table && err.schema:
      parsedErr = postgresError(err);
      break;
  }

  if (!parsedErr) parsedErr = unexpectedErr(err);
  return parsedErr;
}

module.exports = {
  missingQueryParams,
  postgresError,
  parseError,
  notFound
}
