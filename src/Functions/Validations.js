

export function validateEpicId(location){
    if (location.state && location.state.id){
      return location.state.id;
    }
    return null
}