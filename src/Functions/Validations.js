

export function validateEpicId(location){
    if (location.state && location.state.id){
      return location.state.id;
    }
    return null
}

export function validateStringIsText(input){
  if (typeof input === 'string' || input instanceof String){
    return true;
  }
  return false;
}

export function validateStringIsLikeText(input){
  try{
    return JSON.stringify(JSON.parse(input)) === input;
  } catch (e){
    return false;
  }
}